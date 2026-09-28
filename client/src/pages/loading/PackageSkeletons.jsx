import LoadingRegion from '../../components/loading/LoadingRegion.jsx';
import SkeletonBlock from '../../components/loading/SkeletonBlock.jsx';
import './PackageSkeletons.css';

export function StayPreviewSkeleton() {
  return (
    <LoadingRegion label="Loading stay options" className="stay__blocks public-package-skeleton">
      {[0, 1].map((item) => (
        <article className="stay__block" key={item}>
          <SkeletonBlock width="112px" height="11px" />
          <div className="public-skeleton-stack">
            <SkeletonBlock width={item ? '210px' : '185px'} height="58px" />
            <SkeletonBlock width="96px" height="13px" />
          </div>
          <SkeletonBlock width="88%" height="14px" />
          <SkeletonBlock width="64%" height="14px" />
        </article>
      ))}
    </LoadingRegion>
  );
}

function RateRowSkeleton({ shorter }) {
  return (
    <div className="public-rate-skeleton__row">
      <SkeletonBlock width="105px" height="14px" />
      <div className="public-skeleton-stack">
        <SkeletonBlock width={shorter ? '132px' : '175px'} height="17px" />
        <SkeletonBlock width="190px" height="11px" />
      </div>
      <SkeletonBlock width="86px" height="18px" />
      <SkeletonBlock width="86px" height="18px" />
    </div>
  );
}

export function StayRatesSkeleton() {
  return (
    <LoadingRegion label="Loading current rates" className="rates__main public-rate-skeleton">
      <div className="rate-group">
        <div className="rate-group__header">
          <SkeletonBlock width="180px" height="28px" />
          <SkeletonBlock width="230px" height="12px" />
        </div>
        <div className="public-rate-skeleton__table">
          <div className="public-rate-skeleton__head">
            {[0, 1, 2, 3].map((item) => <SkeletonBlock key={item} width={item < 2 ? '90px' : '72px'} height="9px" />)}
          </div>
          {[0, 1, 2, 3, 4].map((item) => <RateRowSkeleton key={item} shorter={item % 2 === 0} />)}
        </div>
      </div>
      <div className="rate-group public-weekend-skeleton">
        <div className="rate-group__header">
          <SkeletonBlock width="190px" height="28px" />
          <SkeletonBlock width="205px" height="12px" />
        </div>
        <SkeletonBlock width="100%" height="180px" />
      </div>
    </LoadingRegion>
  );
}

export function InquiryOptionsSkeleton() {
  return (
    <LoadingRegion label="Loading stay options" className="step public-inquiry-skeleton">
      <SkeletonBlock width="76%" height="42px" />
      <div className="public-skeleton-stack">
        <SkeletonBlock width="130px" height="14px" />
        <SkeletonBlock width="170px" height="52px" />
      </div>
      <div className="public-skeleton-stack">
        <SkeletonBlock width="190px" height="24px" />
        {[0, 1, 2].map((item) => <SkeletonBlock key={item} width="100%" height="72px" />)}
      </div>
      <div className="public-skeleton-actions">
        <SkeletonBlock width="96px" height="48px" radius="999px" />
        <SkeletonBlock width="118px" height="48px" radius="999px" />
      </div>
    </LoadingRegion>
  );
}
