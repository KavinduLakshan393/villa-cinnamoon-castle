import { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { apiRequest } from '../lib/api.js';
import Button from '../components/Button.jsx';
import LoadingSpinner from '../components/loading/LoadingSpinner.jsx';
import { useDelayedLoading } from '../components/loading/useDelayedLoading.js';
import AdminInquiriesSkeleton from './loading/AdminInquiriesSkeleton.jsx';

const statusLabels = { PENDING: 'Pending', ACCEPTED: 'Accepted', REJECTED: 'Rejected' };
const dateFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'UTC', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
});
const requestedDateFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'UTC', weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
});
const stayDateFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'UTC', day: 'numeric', month: 'short', year: 'numeric',
});
const mobileStartDateFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'UTC', day: 'numeric', month: 'short',
});
const timeFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Colombo', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
});

const dateFromKey = (key) => new Date(`${key}T00:00:00Z`);
const calendarDate = (key) => dateFormat.format(dateFromKey(key));
const requestedDate = (key) => requestedDateFormat.format(dateFromKey(key));
const stayDate = (key) => stayDateFormat.format(dateFromKey(key));
const compactStayRange = (checkIn, checkOut) => {
  const checkInDate = dateFromKey(checkIn);
  const checkOutDate = dateFromKey(checkOut);
  const firstDate = checkInDate.getUTCFullYear() === checkOutDate.getUTCFullYear()
    ? mobileStartDateFormat.format(checkInDate)
    : stayDateFormat.format(checkInDate);
  return `${firstDate} → ${stayDateFormat.format(checkOutDate)}`;
};
const stayNights = (checkIn, checkOut) => Math.max(
  0,
  Math.round((dateFromKey(checkOut).getTime() - dateFromKey(checkIn).getTime()) / 86_400_000),
);
const money = (value) => `Rs. ${Number(value).toLocaleString('en-LK')}`;
const packageLabel = (line) => `${line.stayName} — ${line.packageTitle}`;
const inquiryPackageLabel = (inquiry) => inquiry.quoteLines
  .map(packageLabel)
  .sort((first, second) => first.localeCompare(second))
  .join(' · ');

export default function AdminInquiries() {
  const [filter, setFilter] = useState('ALL');
  const [result, setResult] = useState({ groups: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [acting, setActing] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [sortMode, setSortMode] = useState('CHECK_IN_ASC');
  const [packageFilter, setPackageFilter] = useState('ALL');
  const showSkeleton = useDelayedLoading(loading);

  const packageOptions = useMemo(() => {
    const options = new Map();
    result.groups.forEach((group) => {
      group.inquiries.forEach((inquiry) => {
        inquiry.quoteLines.forEach((line) => options.set(line.packageVariantId, packageLabel(line)));
      });
    });
    return [...options].sort(([, first], [, second]) => first.localeCompare(second));
  }, [result.groups]);

  useEffect(() => {
    if (packageFilter !== 'ALL' && !packageOptions.some(([id]) => id === packageFilter)) {
      setPackageFilter('ALL');
      setExpandedId(null);
    }
  }, [packageFilter, packageOptions]);

  const displayGroups = useMemo(() => {
    const groups = result.groups
      .map((group) => {
        const priorityById = new Map(group.inquiries.map((inquiry, index) => [inquiry.id, index + 1]));
        const inquiries = group.inquiries
          .filter((inquiry) => (
            packageFilter === 'ALL'
            || inquiry.quoteLines.some((line) => line.packageVariantId === packageFilter)
          ))
          .map((inquiry) => ({ inquiry, priority: priorityById.get(inquiry.id) }));

        inquiries.sort((first, second) => {
          if (sortMode === 'RECEIVED_DESC') {
            return new Date(second.inquiry.createdAt) - new Date(first.inquiry.createdAt);
          }
          if (sortMode === 'PACKAGE_ASC' || sortMode === 'PACKAGE_DESC') {
            const direction = sortMode === 'PACKAGE_DESC' ? -1 : 1;
            return direction * inquiryPackageLabel(first.inquiry).localeCompare(inquiryPackageLabel(second.inquiry));
          }
          return new Date(first.inquiry.createdAt) - new Date(second.inquiry.createdAt);
        });

        return { ...group, inquiries };
      })
      .filter((group) => group.inquiries.length > 0);

    if (sortMode === 'CHECK_IN_DESC') groups.reverse();
    return groups;
  }, [packageFilter, result.groups, sortMode]);

  const visibleTotal = displayGroups.reduce((total, group) => total + group.inquiries.length, 0);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const query = filter === 'ALL' ? '' : `?status=${filter}`;
      setResult(await apiRequest(`/admin/inquiries${query}`));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => { load(); }, [load]);

  const decide = async (inquiry, decision) => {
    const tab = window.open('', '_blank');
    if (tab) tab.opener = null;
    setActing(`${inquiry.id}:${decision}`);
    setError('');
    try {
      const response = await toast.promise(
        apiRequest(`/admin/inquiries/${inquiry.id}/decision`, {
          method: 'PATCH', body: { decision },
        }),
        {
          loading: decision === 'ACCEPTED' ? 'Accepting inquiry…' : 'Rejecting inquiry…',
          success: decision === 'ACCEPTED' ? 'Inquiry accepted. Opening WhatsApp…' : 'Inquiry rejected. Opening WhatsApp…',
          error: (requestError) => requestError.message || 'The inquiry could not be updated.',
        },
      );
      if (tab) tab.location.replace(response.whatsapp.url);
      else window.location.assign(response.whatsapp.url);
      await load();
    } catch (requestError) {
      tab?.close();
      setError(requestError.message);
    } finally {
      setActing(null);
    }
  };

  return (
    <section className="admin-page" aria-labelledby="admin-inquiries-title">
      <header className="admin-page__header">
        <div>
          <p className="eyebrow">Customer requests</p>
          <h1 id="admin-inquiries-title">Inquiries</h1>
          <p className="lead">Grouped by requested check-in date. The earliest inquiry appears first within each date.</p>
        </div>
        <button type="button" className="admin-secondary-button" onClick={load} disabled={loading} aria-busy={loading || undefined}>
          <span className="loading-inline">
            {loading && <LoadingSpinner size="sm" />}
            {loading ? 'Refreshing…' : 'Refresh'}
          </span>
        </button>
      </header>

      <div className="admin-filters" aria-label="Filter inquiries">
        {['ALL', 'PENDING', 'ACCEPTED', 'REJECTED'].map((value) => (
          <button
            type="button"
            key={value}
            className={`admin-filter${filter === value ? ' is-active' : ''}`}
            onClick={() => {
              setExpandedId(null);
              setFilter(value);
            }}
            disabled={loading}
            aria-pressed={filter === value}
          >
            {value === 'ALL' ? 'All' : statusLabels[value]}
          </button>
        ))}
        <span className="admin-filters__count">
          {visibleTotal === result.total ? `${result.total} total` : `${visibleTotal} of ${result.total}`}
        </span>
      </div>

      <div className="admin-inquiry-controls" aria-label="Sort and filter inquiries">
        <label className="admin-inquiry-control">
          <span>Sort by</span>
          <select value={sortMode} onChange={(event) => setSortMode(event.target.value)} disabled={loading}>
            <option value="CHECK_IN_ASC">Check-in: earliest first</option>
            <option value="CHECK_IN_DESC">Check-in: latest first</option>
            <option value="RECEIVED_ASC">Within each date: received first</option>
            <option value="RECEIVED_DESC">Within each date: received latest</option>
            <option value="PACKAGE_ASC">Within each date: package A–Z</option>
            <option value="PACKAGE_DESC">Within each date: package Z–A</option>
          </select>
        </label>
        <label className="admin-inquiry-control">
          <span>Package</span>
          <select
            value={packageFilter}
            onChange={(event) => {
              setExpandedId(null);
              setPackageFilter(event.target.value);
            }}
            disabled={loading}
          >
            <option value="ALL">All packages</option>
            {packageOptions.map(([id, label]) => <option value={id} key={id}>{label}</option>)}
          </select>
        </label>
      </div>

      {error && <p className="admin-alert is-error" role="alert">{error}</p>}
      {loading && showSkeleton ? (
        <AdminInquiriesSkeleton />
      ) : loading && result.groups.length === 0 ? (
        <div className="admin-loading-reserve" role="status" aria-label="Loading inquiries" />
      ) : result.groups.length === 0 ? (
        <div className="admin-empty"><h2>No inquiries here yet.</h2><p>New customer inquiries will appear automatically.</p></div>
      ) : displayGroups.length === 0 ? (
        <div className="admin-empty"><h2>No matching inquiries.</h2><p>Try another package or status filter.</p></div>
      ) : (
        <div className="inquiry-groups">
          {displayGroups.map((group) => (
            <section className="inquiry-group" key={group.checkIn}>
              <header className="inquiry-group__header">
                <div><span className="inquiry-group__date">{calendarDate(group.checkIn)}</span><span>{group.inquiries.length} {group.inquiries.length === 1 ? 'inquiry' : 'inquiries'}</span></div>
              </header>
              <div className="admin-inquiry-list">
                {group.inquiries.map(({ inquiry, priority }) => {
                  const nightCount = stayNights(inquiry.checkIn, inquiry.checkOut);
                  const isExpanded = expandedId === inquiry.id;
                  const detailsId = `inquiry-details-${inquiry.id}`;

                  return (
                    <article className={`admin-inquiry${isExpanded ? ' is-expanded' : ''}`} key={inquiry.id}>
                      <div className="admin-inquiry__priority" aria-label={`Priority ${priority}`}>{String(priority).padStart(2, '0')}</div>
                      <div className="admin-inquiry__body">
                        <button
                          type="button"
                          className="admin-inquiry__toggle"
                          aria-expanded={isExpanded}
                          aria-controls={detailsId}
                          onClick={() => setExpandedId(isExpanded ? null : inquiry.id)}
                        >
                          <span className="admin-inquiry__top">
                            <span>
                              <span className="admin-inquiry__identity">
                                <span className="admin-inquiry__mobile-priority" aria-hidden="true">{String(priority).padStart(2, '0')}</span>
                                <span className="admin-inquiry__name" role="heading" aria-level="2">{inquiry.customerName}</span>
                              </span>
                              <span className="admin-inquiry__meta">{inquiry.reference} · Received {timeFormat.format(new Date(inquiry.createdAt))}</span>
                            </span>
                            <span className={`status-badge is-${inquiry.status.toLowerCase()}`}>{statusLabels[inquiry.status]}</span>
                          </span>
                          <span
                            className="admin-inquiry__dates"
                            aria-label={`Requested stay from ${requestedDate(inquiry.checkIn)} to ${requestedDate(inquiry.checkOut)}`}
                          >
                            <span className="admin-inquiry__dates-label">Requested dates</span>
                            <span className="admin-inquiry__date-range">
                              <span className="admin-inquiry__date-point">
                                <span>Check-in</span>
                                <time dateTime={inquiry.checkIn}>{requestedDate(inquiry.checkIn)}</time>
                              </span>
                              <span className="admin-inquiry__date-arrow" aria-hidden="true">→</span>
                              <span className="admin-inquiry__date-point">
                                <span>Check-out</span>
                                <time dateTime={inquiry.checkOut}>{requestedDate(inquiry.checkOut)}</time>
                              </span>
                              <span className="admin-inquiry__nights">{nightCount} {nightCount === 1 ? 'night' : 'nights'}</span>
                            </span>
                          </span>
                          <span className="admin-inquiry__mobile-summary">
                            <span className="admin-inquiry__mobile-stay">
                              <span>{compactStayRange(inquiry.checkIn, inquiry.checkOut)}</span>
                              <span>{nightCount} {nightCount === 1 ? 'night' : 'nights'}</span>
                            </span>
                            <span>Received {timeFormat.format(new Date(inquiry.createdAt))}</span>
                            <span>{inquiry.guestCount} {inquiry.guestCount === 1 ? 'guest' : 'guests'} · {money(inquiry.estimatedTotal)}</span>
                          </span>
                          <span className="admin-inquiry__toggle-summary">
                            <span>{inquiry.guestCount} {inquiry.guestCount === 1 ? 'guest' : 'guests'} · {money(inquiry.estimatedTotal)}</span>
                            <span className="admin-inquiry__toggle-label">
                              {isExpanded ? 'Hide details' : 'View details'}
                              <span className="admin-inquiry__chevron" aria-hidden="true">⌄</span>
                            </span>
                          </span>
                        </button>
                        <div className="admin-inquiry__collapse" id={detailsId} aria-hidden={!isExpanded}>
                          <div>
                            <dl className="admin-inquiry__facts">
                              <div><dt>Stay</dt><dd>{stayDate(inquiry.checkIn)} → {stayDate(inquiry.checkOut)}</dd></div>
                              <div><dt>Guests</dt><dd>{inquiry.guestCount}</dd></div>
                              <div><dt>WhatsApp</dt><dd>{inquiry.whatsappNumber}</dd></div>
                              <div><dt>Estimate</dt><dd>{money(inquiry.estimatedTotal)}</dd></div>
                            </dl>
                            <div className="admin-inquiry__quote">
                              {inquiry.quoteLines.map((line) => (
                                <p key={line.id}><strong>{line.portion === 'WEEKEND' ? 'Weekend' : 'Weekday'}:</strong> {line.stayName} — {line.packageTitle}, {line.nightCount} × {money(line.nightlyRate)}</p>
                              ))}
                            </div>
                            {inquiry.specialRequests && <p className="admin-inquiry__request"><strong>Special requests:</strong> {inquiry.specialRequests}</p>}
                            <div className="admin-inquiry__actions">
                              <Button
                                size="sm"
                                onClick={() => decide(inquiry, 'ACCEPTED')}
                                disabled={Boolean(acting)}
                                tabIndex={isExpanded ? 0 : -1}
                                loading={acting === `${inquiry.id}:ACCEPTED`}
                                loadingLabel="Accepting…"
                              >
                                Accept in WhatsApp
                              </Button>
                              <button
                                type="button"
                                className="admin-reject-button"
                                onClick={() => decide(inquiry, 'REJECTED')}
                                disabled={Boolean(acting)}
                                tabIndex={isExpanded ? 0 : -1}
                                aria-busy={acting === `${inquiry.id}:REJECTED` || undefined}
                              >
                                <span className="loading-inline">
                                  {acting === `${inquiry.id}:REJECTED` && <LoadingSpinner size="sm" />}
                                  {acting === `${inquiry.id}:REJECTED` ? 'Rejecting…' : 'Reject in WhatsApp'}
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </section>
  );
}
