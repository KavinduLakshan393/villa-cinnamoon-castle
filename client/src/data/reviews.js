// Google Reviews configuration (DEC-010, DEC-020, DEC-028)
//
// In production, live reviews are fetched from the Netlify function endpoint.
// Set `googleReviews` to null so the public site falls back to the official
// Google profile review link when the API is unconfigured or unavailable.
export const googleReviewsEndpoint = '/api/google-reviews';

export const googleReviews = null;

