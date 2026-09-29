import LoadingRegion from '../../components/loading/LoadingRegion.jsx';
import SkeletonBlock from '../../components/loading/SkeletonBlock.jsx';
import './AdminLoading.css';

export default function AdminPackagesSkeleton() {
  return (
    <LoadingRegion label="Loading packages" className="package-editors admin-skeleton">
      {[0, 1, 2, 3].map((item) => (
        <article className="package-editor admin-package-skeleton" key={item}>
          <div className="package-editor__summary">
            <span className="admin-skeleton-stack">
              <SkeletonBlock width={item % 2 ? '210px' : '170px'} height="17px" />
              <SkeletonBlock width="260px" height="12px" />
            </span>
            <SkeletonBlock width="66px" height="24px" radius="999px" />
            <SkeletonBlock width="16px" height="16px" />
          </div>
        </article>
      ))}
    </LoadingRegion>
  );
}
