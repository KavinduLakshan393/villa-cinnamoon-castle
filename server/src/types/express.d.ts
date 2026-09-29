declare global {
  namespace Express {
    interface Request {
      adminAuth?: {
        adminId: string;
        sessionId: string;
        email: string;
        displayName: string;
      };
    }
  }
}

export {};
