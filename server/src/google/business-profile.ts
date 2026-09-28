// Read-only client for the Google Business Profile APIs used by the reviews
// sync (DEC-028): find the villa's account and location, then page through
// every review. Reviews come from the v4 My Business API, which Google opens
// to a project only after it approves the Business Profile API access request.

const ACCOUNTS_URL = 'https://mybusinessaccountmanagement.googleapis.com/v1/accounts';
const INFO_BASE = 'https://mybusinessbusinessinformation.googleapis.com/v1';
const REVIEWS_BASE = 'https://mybusiness.googleapis.com/v4';
const PAGE_SIZE = 50;
const MAX_PAGES = 200; // 10,000 reviews: a safety stop, far above the villa's count.

export class GoogleApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly reason: string,
    message: string,
  ) {
    super(message);
    this.name = 'GoogleApiError';
  }

  /** 403/429 with a zero quota: the project is not (yet) approved for the API. */
  get isAccessNotApproved(): boolean {
    return this.status === 403 || this.status === 429;
  }
}

async function getJson<T>(url: string, accessToken: string, fetchImpl: typeof fetch): Promise<T> {
  const response = await fetchImpl(url, {
    headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json' },
  });
  const payload = (await response.json().catch(() => ({}))) as {
    error?: { message?: string; status?: string; details?: Array<{ reason?: string }> };
  };
  if (!response.ok) {
    const reason = payload.error?.details?.find((detail) => detail.reason)?.reason ?? payload.error?.status ?? 'UNKNOWN';
    throw new GoogleApiError(response.status, reason, payload.error?.message ?? `Google API request failed (${response.status}).`);
  }
  return payload as T;
}

export interface GoogleLocation {
  accountName: string;
  locationName: string;
  title: string;
}

/**
 * The location to read reviews from. With several, the one whose title names
 * the villa wins; otherwise the first. Null when the account has none.
 */
export async function findLocation(accessToken: string, fetchImpl: typeof fetch = fetch): Promise<GoogleLocation | null> {
  const { accounts = [] } = await getJson<{ accounts?: Array<{ name: string }> }>(ACCOUNTS_URL, accessToken, fetchImpl);
  const found: GoogleLocation[] = [];
  for (const account of accounts) {
    const url = `${INFO_BASE}/${account.name}/locations?readMask=name,title&pageSize=100`;
    const { locations = [] } = await getJson<{ locations?: Array<{ name: string; title?: string }> }>(url, accessToken, fetchImpl);
    for (const location of locations) {
      found.push({ accountName: account.name, locationName: location.name, title: location.title ?? '' });
    }
  }
  return found.find((location) => /cinnamoon/i.test(location.title)) ?? found[0] ?? null;
}

const STARS: Record<string, number> = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };

interface RawReview {
  reviewId?: string;
  name?: string;
  reviewer?: { displayName?: string; isAnonymous?: boolean };
  starRating?: string;
  comment?: string;
  createTime?: string;
  updateTime?: string;
  reviewReply?: { comment?: string; updateTime?: string };
}

export interface NormalizedReview {
  id: string;
  reviewerName: string;
  isAnonymous: boolean;
  starRating: number;
  comment: string | null;
  createdAt: Date;
  updatedAt: Date;
  replyComment: string | null;
  replyUpdatedAt: Date | null;
}

/** Keeps the review text exactly as Google returns it; null when unusable. */
export function normalizeReview(raw: RawReview): NormalizedReview | null {
  const id = raw.reviewId ?? raw.name?.split('/').pop();
  const starRating = raw.starRating ? STARS[raw.starRating] : undefined;
  if (!id || !starRating || !raw.createTime) return null;
  const anonymous = Boolean(raw.reviewer?.isAnonymous) || !raw.reviewer?.displayName;
  const comment = raw.comment?.trim() ? raw.comment : null;
  const reply = raw.reviewReply?.comment?.trim() ? raw.reviewReply.comment : null;
  return {
    id,
    reviewerName: anonymous ? 'A Google user' : raw.reviewer!.displayName!,
    isAnonymous: anonymous,
    starRating,
    comment,
    createdAt: new Date(raw.createTime),
    updatedAt: new Date(raw.updateTime ?? raw.createTime),
    replyComment: reply,
    replyUpdatedAt: reply && raw.reviewReply?.updateTime ? new Date(raw.reviewReply.updateTime) : null,
  };
}

export interface ReviewsResult {
  reviews: NormalizedReview[];
  averageRating: number | null;
  totalReviewCount: number | null;
}

export async function fetchAllReviews(
  location: Pick<GoogleLocation, 'accountName' | 'locationName'>,
  accessToken: string,
  fetchImpl: typeof fetch = fetch,
): Promise<ReviewsResult> {
  const reviews: NormalizedReview[] = [];
  let averageRating: number | null = null;
  let totalReviewCount: number | null = null;
  let pageToken: string | undefined;
  // The v4 path is accounts/{a}/locations/{l}; the v1 location name is locations/{l}.
  const base = `${REVIEWS_BASE}/${location.accountName}/${location.locationName}/reviews`;

  for (let page = 0; page < MAX_PAGES; page += 1) {
    const params = new URLSearchParams({ pageSize: String(PAGE_SIZE), orderBy: 'updateTime desc' });
    if (pageToken) params.set('pageToken', pageToken);
    const data = await getJson<{
      reviews?: RawReview[];
      averageRating?: number;
      totalReviewCount?: number;
      nextPageToken?: string;
    }>(`${base}?${params.toString()}`, accessToken, fetchImpl);

    averageRating ??= data.averageRating ?? null;
    totalReviewCount ??= data.totalReviewCount ?? null;
    for (const raw of data.reviews ?? []) {
      const review = normalizeReview(raw);
      if (review) reviews.push(review);
    }
    if (!data.nextPageToken) return { reviews, averageRating, totalReviewCount };
    pageToken = data.nextPageToken;
  }
  throw new GoogleApiError(500, 'TOO_MANY_PAGES', 'Stopped reading reviews after the page limit.');
}
