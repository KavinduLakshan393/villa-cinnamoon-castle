import type { Admin, Prisma, PrismaClient } from '@prisma/client';
import type { AppEnv } from '../config/env.js';
import { HttpError } from '../lib/http-error.js';
import { addDays } from '../lib/time.js';
import { verifyPassword } from './password.js';
import {
  accessTokenConfigFromEnv,
  createAccessToken,
  createRefreshToken,
  hashRefreshToken,
  verifyAccessToken,
} from './tokens.js';

// A valid Argon2id hash used only to equalize the missing-user login path.
const DUMMY_PASSWORD_HASH =
  '$argon2id$v=19$m=65536,t=3,p=4$c2FsdHNhbHRzYWx0c2FsdA$rBWULD5jOGpQy32rLvGcmvQMVqIVNAmrCtekWvUA8bw';

class RefreshReuseDetected extends Error {}

export interface PublicAdmin {
  id: string;
  email: string;
  displayName: string;
}

export interface IssuedAuth {
  admin: PublicAdmin;
  accessToken: string;
  accessTokenExpiresAt: Date;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
}

function publicAdmin(admin: Pick<Admin, 'id' | 'email' | 'displayName'>): PublicAdmin {
  return { id: admin.id, email: admin.email, displayName: admin.displayName };
}

export function normalizeAdminEmail(email: string): string {
  return email.trim().toLowerCase();
}

export class AuthService {
  constructor(
    private readonly database: PrismaClient,
    private readonly env: AppEnv,
  ) {}

  async login(emailInput: string, password: string, userAgent?: string): Promise<IssuedAuth> {
    const email = normalizeAdminEmail(emailInput);
    const admin = await this.database.admin.findUnique({ where: { email } });

    if (!admin) {
      await verifyPassword(DUMMY_PASSWORD_HASH, password);
      throw new HttpError(401, 'INVALID_CREDENTIALS', 'Invalid email or password.');
    }

    const passwordMatches = await verifyPassword(admin.passwordHash, password);
    if (!passwordMatches || !admin.isActive) {
      throw new HttpError(401, 'INVALID_CREDENTIALS', 'Invalid email or password.');
    }

    const now = new Date();
    const refreshTokenExpiresAt = addDays(now, this.env.AUTH_REFRESH_TOKEN_TTL_DAYS);
    const refreshToken = createRefreshToken();
    const refreshTokenHash = hashRefreshToken(refreshToken);

    const session = await this.database.$transaction(async (transaction) => {
      const created = await transaction.adminSession.create({
        data: {
          adminId: admin.id,
          userAgent: userAgent?.slice(0, 500),
          expiresAt: refreshTokenExpiresAt,
          refreshTokens: {
            create: {
              tokenHash: refreshTokenHash,
              expiresAt: refreshTokenExpiresAt,
            },
          },
        },
      });
      await transaction.admin.update({ where: { id: admin.id }, data: { lastLoginAt: now } });
      return created;
    });

    const access = await createAccessToken(
      { adminId: admin.id, sessionId: session.id },
      accessTokenConfigFromEnv(this.env),
    );

    return {
      admin: publicAdmin(admin),
      accessToken: access.token,
      accessTokenExpiresAt: access.expiresAt,
      refreshToken,
      refreshTokenExpiresAt,
    };
  }

  async refresh(rawRefreshToken: string): Promise<IssuedAuth> {
    const tokenHash = hashRefreshToken(rawRefreshToken);
    const storedToken = await this.database.refreshToken.findUnique({
      where: { tokenHash },
      include: {
        adminSession: {
          include: { admin: true },
        },
      },
    });

    if (!storedToken) {
      throw new HttpError(401, 'INVALID_REFRESH_TOKEN', 'Your session has expired. Please sign in again.');
    }

    const now = new Date();
    const { adminSession } = storedToken;
    const { admin } = adminSession;

    if (storedToken.usedAt || storedToken.revokedAt) {
      await this.revokeSession(adminSession.id, now);
      throw new HttpError(401, 'REFRESH_TOKEN_REUSED', 'Your session has been revoked. Please sign in again.');
    }

    if (
      storedToken.expiresAt <= now ||
      adminSession.expiresAt <= now ||
      adminSession.revokedAt ||
      !admin.isActive
    ) {
      await this.revokeSession(adminSession.id, now);
      throw new HttpError(401, 'REFRESH_TOKEN_EXPIRED', 'Your session has expired. Please sign in again.');
    }

    const nextRefreshToken = createRefreshToken();
    const nextRefreshTokenHash = hashRefreshToken(nextRefreshToken);
    const access = await createAccessToken(
      { adminId: admin.id, sessionId: adminSession.id },
      accessTokenConfigFromEnv(this.env),
    );

    try {
      await this.database.$transaction(async (transaction) => {
        const consumed = await transaction.refreshToken.updateMany({
          where: { id: storedToken.id, usedAt: null, revokedAt: null },
          data: { usedAt: now },
        });
        if (consumed.count !== 1) throw new RefreshReuseDetected();

        await transaction.refreshToken.create({
          data: {
            adminSessionId: adminSession.id,
            tokenHash: nextRefreshTokenHash,
            expiresAt: adminSession.expiresAt,
          },
        });
        await transaction.adminSession.update({
          where: { id: adminSession.id },
          data: { lastUsedAt: now },
        });
      });
    } catch (error) {
      if (error instanceof RefreshReuseDetected) {
        await this.revokeSession(adminSession.id, now);
        throw new HttpError(401, 'REFRESH_TOKEN_REUSED', 'Your session has been revoked. Please sign in again.');
      }
      throw error;
    }

    return {
      admin: publicAdmin(admin),
      accessToken: access.token,
      accessTokenExpiresAt: access.expiresAt,
      refreshToken: nextRefreshToken,
      refreshTokenExpiresAt: adminSession.expiresAt,
    };
  }

  async authenticate(accessToken: string): Promise<PublicAdmin & { sessionId: string }> {
    let claims: Awaited<ReturnType<typeof verifyAccessToken>>;
    try {
      claims = await verifyAccessToken(accessToken, accessTokenConfigFromEnv(this.env));
    } catch {
      throw new HttpError(401, 'INVALID_ACCESS_TOKEN', 'Authentication is required.');
    }

    const session = await this.database.adminSession.findUnique({
      where: { id: claims.sessionId },
      include: { admin: true },
    });
    const now = new Date();
    if (
      !session ||
      session.adminId !== claims.adminId ||
      session.revokedAt ||
      session.expiresAt <= now ||
      !session.admin.isActive
    ) {
      throw new HttpError(401, 'SESSION_EXPIRED', 'Authentication is required.');
    }

    return { ...publicAdmin(session.admin), sessionId: session.id };
  }

  async logoutByRefreshToken(rawRefreshToken: string | null): Promise<void> {
    if (!rawRefreshToken) return;
    const storedToken = await this.database.refreshToken.findUnique({
      where: { tokenHash: hashRefreshToken(rawRefreshToken) },
      select: { adminSessionId: true },
    });
    if (storedToken) await this.revokeSession(storedToken.adminSessionId, new Date());
  }

  private async revokeSession(sessionId: string, revokedAt: Date): Promise<void> {
    await this.database.$transaction([
      this.database.adminSession.updateMany({
        where: { id: sessionId, revokedAt: null },
        data: { revokedAt },
      }),
      this.database.refreshToken.updateMany({
        where: { adminSessionId: sessionId, revokedAt: null },
        data: { revokedAt },
      }),
    ] as Prisma.PrismaPromise<unknown>[]);
  }
}
