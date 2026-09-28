import LoadingRegion from '../../components/loading/LoadingRegion.jsx';
import SkeletonBlock from '../../components/loading/SkeletonBlock.jsx';
import './AdminLoading.css';

function InquiryCardSkeleton() {
  return (
    <article className="admin-inquiry admin-skeleton-card">
      <div className="admin-inquiry__priority"><SkeletonBlock width="20px" height="12px" /></div>
      <div className="admin-inquiry__body">
        <div className="admin-inquiry__toggle">
          <div className="admin-skeleton-row admin-skeleton-row--between">
            <div className="admin-skeleton-stack">
              <SkeletonBlock width="180px" height="20px" />
              <SkeletonBlock width="250px" height="12px" />
            </div>
            <SkeletonBlock width="74px" height="24px" radius="999px" />
          </div>
          <div className="admin-inquiry__dates admin-skeleton-dates">
            <SkeletonBlock width="104px" height="9px" />
            <div className="admin-inquiry__date-range">
              <div className="admin-skeleton-stack">
                <SkeletonBlock width="52px" height="9px" />
                <SkeletonBlock width="142px" height="15px" />
              </div>
              <SkeletonBlock width="18px" height="14px" />
              <div className="admin-skeleton-stack">
                <SkeletonBlock width="60px" height="9px" />
                <SkeletonBlock width="142px" height="15px" />
              </div>
              <SkeletonBlock width="68px" height="28px" radius="999px" />
            </div>
          </div>
          <div className="admin-inquiry__mobile-summary admin-skeleton-mobile-summary">
            <SkeletonBlock width="210px" height="14px" />
            <SkeletonBlock width="150px" height="11px" />
            <SkeletonBlock width="130px" height="11px" />
          </div>
          <div className="admin-skeleton-row admin-skeleton-row--between">
            <SkeletonBlock width="130px" height="12px" />
            <SkeletonBlock width="92px" height="12px" />
          </div>
        </div>
      </div>
    </article>
  );
}

export default function AdminInquiriesSkeleton() {
  return (
    <LoadingRegion label="Loading inquiries" className="inquiry-groups admin-skeleton">
      <section className="inquiry-group">
        <div className="inquiry-group__header">
          <div>
            <SkeletonBlock width="230px" height="26px" />
            <SkeletonBlock width="72px" height="12px" />
          </div>
        </div>
        <div className="admin-inquiry-list">
          <InquiryCardSkeleton />
          <InquiryCardSkeleton />
        </div>
      </section>
    </LoadingRegion>
  );
}
