const STAR_RATINGS = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};

export function normalizeResourceName(value, prefix) {
  const normalizedPrefix = String(prefix).replace(/^\/+|\/+$/g, '');
  const normalizedValue = String(value ?? '').trim().replace(/^\/+|\/+$/g, '');

  if (/^\d+$/.test(normalizedValue)) {
    return `${normalizedPrefix}/${normalizedValue}`;
  }

  if (normalizedValue.startsWith(`${normalizedPrefix}/`) && /^\d+$/.test(normalizedValue.slice(normalizedPrefix.length + 1))) {
    return normalizedValue;
  }

  throw new Error('Invalid Google Business Profile resource identifier.');
}

export function selectLocation(locations, expectedTitle = 'Villa Cinnamoon Castle') {
  const candidates = Array.isArray(locations)
    ? locations.filter((location) => /^locations\/\d+$/.test(String(location?.name ?? '')))
    : [];
  const title = expectedTitle.trim().toLocaleLowerCase('en');
  const exactMatches = candidates.filter(
    (location) => String(location?.title ?? '').trim().toLocaleLowerCase('en') === title,
  );

  if (exactMatches.length === 1) return exactMatches[0].name;
  if (exactMatches.length > 1) throw new Error('Multiple matching Google Business Profile locations were found.');
  if (candidates.length === 1) return candidates[0].name;

  throw new Error('The Google Business Profile location could not be identified safely.');
}

function toRating(value) {
  if (typeof value === 'number' && value >= 1 && value <= 5) return value;
  return STAR_RATINGS[String(value ?? '').toUpperCase()] ?? null;
}

export function normalizeReviews(payload) {
  const rating = Number(payload?.averageRating);
  const total = Number(payload?.totalReviewCount);
  const items = (Array.isArray(payload?.reviews) ? payload.reviews : [])
    .map((review) => ({
      author: String(review?.reviewer?.displayName ?? 'Google guest').trim() || 'Google guest',
      date: String(review?.updateTime ?? review?.createTime ?? ''),
      rating: toRating(review?.starRating),
      text: String(review?.comment ?? '').trim(),
    }))
    .filter((review) => review.text && review.rating && review.date);

  if (!Number.isFinite(rating) || rating < 0 || rating > 5) {
    throw new Error('Google returned an invalid aggregate rating.');
  }
  if (!Number.isInteger(total) || total < 0) {
    throw new Error('Google returned an invalid review count.');
  }

  return { rating, total, items, source: 'Google' };
}
