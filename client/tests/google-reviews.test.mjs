import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeResourceName,
  normalizeReviews,
  selectLocation,
} from '../netlify/functions/lib/google-reviews.mjs';

test('normalizes numeric and prefixed Google resource identifiers', () => {
  assert.equal(normalizeResourceName('123', 'accounts'), 'accounts/123');
  assert.equal(normalizeResourceName('accounts/123', 'accounts'), 'accounts/123');
  assert.throws(() => normalizeResourceName('accounts/not-an-id', 'accounts'));
});

test('selects the exact location title and safely falls back for one location', () => {
  const locations = [
    { name: 'locations/1', title: 'Another villa' },
    { name: 'locations/2', title: 'Villa Cinnamoon Castle' },
  ];
  assert.equal(selectLocation(locations), 'locations/2');
  assert.equal(selectLocation([{ name: 'locations/3', title: 'Renamed villa' }]), 'locations/3');
  assert.throws(() => selectLocation(locations, 'Missing villa'));
});

test('normalizes Google review data without exposing private API fields', () => {
  const result = normalizeReviews({
    averageRating: 4.9,
    totalReviewCount: 107,
    reviews: [
      {
        reviewer: { displayName: 'Guest' },
        starRating: 'FIVE',
        comment: 'A peaceful stay.',
        updateTime: '2026-11-05T10:00:00Z',
        reviewId: 'private-id',
      },
      { starRating: 'FOUR', updateTime: '2026-11-04T10:00:00Z' },
    ],
  });

  assert.deepEqual(result, {
    rating: 4.9,
    total: 107,
    source: 'Google',
    items: [
      {
        author: 'Guest',
        date: '2026-11-05T10:00:00Z',
        rating: 5,
        text: 'A peaceful stay.',
      },
    ],
  });
  assert.equal(JSON.stringify(result).includes('private-id'), false);
});
