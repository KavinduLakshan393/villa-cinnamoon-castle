import { useEffect, useRef, useState } from 'react';
import Button from '../../components/Button.jsx';
import { RevealHeading, Eyebrow } from '../../components/Reveal.jsx';
import { googleReviews } from '../../data/reviews.js';
import { site } from '../../data/site.js';
import { prefersReducedMotion } from '../../lib/motion.js';
import './GoogleReviews.css';

const TEXT_LIMIT = 260;
const MIN_PER_ROW = 6; // Enough cards for a row to cover wide screens before it loops.
const SECONDS_PER_CARD = 9; // Restrained speed: roughly 40px per second.

const STAR_PATH = 'M10 1.8l2.5 5.2 5.7.8-4.1 4 1 5.7L10 14.8l-5.1 2.7 1-5.7-4.1-4 5.7-.8z';

const StarRow = () =>
  [1, 2, 3, 4, 5].map((n) => (
    <svg key={n} viewBox="0 0 20 20" aria-hidden="true">
      <path d={STAR_PATH} />
    </svg>
  ));

/** Five outline stars with a filled layer clipped to the rating (supports halves). */
function Stars({ rating, className = '' }) {
  return (
    <span className={`stars ${className}`} role="img" aria-label={`${rating} out of 5 stars`}>
      <span className="stars__base">
        <StarRow />
      </span>
      <span className="stars__fill" style={{ width: `${(Math.min(5, Math.max(0, rating)) / 5) * 100}%` }}>
        <StarRow />
      </span>
    </span>
  );
}

function ReviewCard({ review }) {
  const long = review.text.length > TEXT_LIMIT;
  // Cut at a word boundary and drop trailing punctuation before the ellipsis.
  const text = long
    ? `${review.text.slice(0, TEXT_LIMIT).replace(/\s+\S*$/, '').replace(/[\s.,;:!?]+$/, '')}…`
    : review.text;
  const initial = review.author.trim().charAt(0).toUpperCase();
  const readMore = site.googleReviewsUrl ?? site.googleMapsUrl;

  return (
    <li className="review-card">
      <Stars rating={review.rating} />
      <blockquote className="review-card__text">“{text}”</blockquote>
      {long && readMore && (
        <a className="review-card__more" href={readMore} target="_blank" rel="noopener noreferrer">
          Read the full review on Google<span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
      <p className="review-card__author">
        <span className="review-card__avatar" aria-hidden="true">
          {initial}
        </span>
        <span>
          <span className="review-card__name">{review.author}</span>
          <span className="review-card__date">{review.date} · Google review</span>
        </span>
      </p>
    </li>
  );
}

/** Repeats a short list so each row is wide enough to loop without gaps. */
function fill(list) {
  if (!list.length) return list;
  const out = [...list];
  while (out.length < MIN_PER_ROW) out.push(...list);
  return out;
}

function MarqueeRow({ items, direction, label, playing, still }) {
  // Reduced motion: the original reviews only, as a static swipeable row.
  const cards = still ? items : fill(items);
  return (
    <div
      className={`marquee marquee--${direction}${still ? ' is-still' : ''}${playing ? '' : ' is-paused'}`}
      style={{ '--marquee-duration': `${cards.length * SECONDS_PER_CARD}s` }}
    >
      <div className="marquee__track">
        {/* First group is the accessible list; the second only completes the loop. */}
        <ul className="marquee__group" aria-label={label}>
          {cards.map((review, i) => (
            <ReviewCard key={`a-${i}`} review={review} />
          ))}
        </ul>
        {!still && (
          <ul className="marquee__group" aria-hidden="true" inert>
            {cards.map((review, i) => (
              <ReviewCard key={`b-${i}`} review={review} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/**
 * Google Reviews (DEC-010, DEC-020): two continuously moving rows — the upper row
 * drifts right, the lower row drifts left. Motion pauses on hover, on keyboard
 * focus, when off-screen and with the Pause control; reduced motion gets static,
 * swipeable rows. Rendered only when real review data is supplied.
 */
export default function GoogleReviews() {
  const sectionRef = useRef(null);
  const [userPaused, setUserPaused] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!sectionRef.current) return undefined;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '100px' });
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const reviewsUrl = site.googleReviewsUrl ?? site.googleMapsUrl;

  // Until real reviews are added to data/reviews.js, point visitors to the reviews
  // on the official Google profile. Reviews are never invented for this section.
  if (!googleReviews?.items?.length) {
    if (!reviewsUrl) return null;
    return (
      <section className="section google-reviews" ref={sectionRef} aria-labelledby="reviews-title">
        <div className="container google-reviews__head">
          <div className="google-reviews__intro">
            <Eyebrow>Google Reviews</Eyebrow>
            <RevealHeading id="reviews-title">What guests say on Google.</RevealHeading>
          </div>
          <div className="google-reviews__summary" data-reveal="fade">
            <p className="google-reviews__pending">
              Read what previous guests have written about their stay on our Google profile.
            </p>
            <div className="google-reviews__actions">
              <Button to={reviewsUrl}>Read Reviews on Google</Button>
              {site.googleReviewsUrl && (
                <Button to={site.googleReviewsUrl} variant="swipe" tone="dark">
                  Review Us on Google
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const { rating, total, items } = googleReviews;
  const half = Math.ceil(items.length / 2);
  const upper = items.length > 1 ? items.slice(0, half) : items;
  const lower = items.length > 1 ? items.slice(half) : items;
  const still = prefersReducedMotion();
  const playing = visible && !userPaused;

  return (
    <section className="section google-reviews" ref={sectionRef} aria-labelledby="reviews-title">
      <div className="container google-reviews__head">
        <div className="google-reviews__intro">
          <Eyebrow>Google Reviews</Eyebrow>
          <RevealHeading id="reviews-title">What guests say on Google.</RevealHeading>
        </div>
        <div className="google-reviews__summary" data-reveal="fade">
          <p className="google-reviews__score">
            <span className="google-reviews__rating">{rating.toFixed(1)}</span>
            <span>
              <Stars rating={rating} className="stars--large" />
              <span className="google-reviews__count">
                Based on {total} {total === 1 ? 'review' : 'reviews'} on Google
              </span>
            </span>
          </p>
          <div className="google-reviews__actions">
            {reviewsUrl && (
              <Button to={reviewsUrl} variant="swipe" tone="dark">
                View All Reviews
              </Button>
            )}
            {site.googleReviewsUrl && (
              <Button to={site.googleReviewsUrl} variant="swipe" tone="dark">
                Review Us on Google
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="google-reviews__rows">
        <MarqueeRow items={upper} direction="right" label="Google reviews, first row" playing={playing} still={still} />
        <MarqueeRow items={lower} direction="left" label="Google reviews, second row" playing={playing} still={still} />
      </div>

      {!still && (
      <div className="container google-reviews__controls">
        <button
          type="button"
          className="marquee-toggle"
          onClick={() => setUserPaused((paused) => !paused)}
        >
          {userPaused ? (
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M5 3.5v9l7-4.5z" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M5 3.5v9M11 3.5v9" />
            </svg>
          )}
          {userPaused ? 'Play reviews' : 'Pause reviews'}
        </button>
      </div>
      )}
    </section>
  );
}
