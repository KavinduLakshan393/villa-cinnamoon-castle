import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { apiRequest } from '../lib/api.js';
import Button from '../components/Button.jsx';

const statusLabels = { PENDING: 'Pending', ACCEPTED: 'Accepted', REJECTED: 'Rejected' };
const dateFormat = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
const timeFormat = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Colombo', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
});

const calendarDate = (key) => dateFormat.format(new Date(`${key}T00:00:00`));
const money = (value) => `Rs. ${Number(value).toLocaleString('en-LK')}`;

export default function AdminInquiries() {
  const [filter, setFilter] = useState('ALL');
  const [result, setResult] = useState({ groups: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [acting, setActing] = useState(null);

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
        <button type="button" className="admin-secondary-button" onClick={load}>Refresh</button>
      </header>

      <div className="admin-filters" aria-label="Filter inquiries">
        {['ALL', 'PENDING', 'ACCEPTED', 'REJECTED'].map((value) => (
          <button
            type="button"
            key={value}
            className={`admin-filter${filter === value ? ' is-active' : ''}`}
            onClick={() => setFilter(value)}
            aria-pressed={filter === value}
          >
            {value === 'ALL' ? 'All' : statusLabels[value]}
          </button>
        ))}
        <span className="admin-filters__count">{result.total} total</span>
      </div>

      {error && <p className="admin-alert is-error" role="alert">{error}</p>}
      {loading ? (
        <p className="admin-empty" role="status">Loading inquiries…</p>
      ) : result.groups.length === 0 ? (
        <div className="admin-empty"><h2>No inquiries here yet.</h2><p>New customer inquiries will appear automatically.</p></div>
      ) : (
        <div className="inquiry-groups">
          {result.groups.map((group) => (
            <section className="inquiry-group" key={group.checkIn}>
              <header className="inquiry-group__header">
                <div><span className="inquiry-group__date">{calendarDate(group.checkIn)}</span><span>{group.inquiries.length} {group.inquiries.length === 1 ? 'inquiry' : 'inquiries'}</span></div>
              </header>
              <div className="admin-inquiry-list">
                {group.inquiries.map((inquiry, index) => (
                  <article className="admin-inquiry" key={inquiry.id}>
                    <div className="admin-inquiry__priority" aria-label={`Priority ${index + 1}`}>{String(index + 1).padStart(2, '0')}</div>
                    <div className="admin-inquiry__body">
                      <header className="admin-inquiry__top">
                        <div>
                          <h2>{inquiry.customerName}</h2>
                          <p>{inquiry.reference} · Received {timeFormat.format(new Date(inquiry.createdAt))}</p>
                        </div>
                        <span className={`status-badge is-${inquiry.status.toLowerCase()}`}>{statusLabels[inquiry.status]}</span>
                      </header>
                      <dl className="admin-inquiry__facts">
                        <div><dt>Stay</dt><dd>{inquiry.checkIn} → {inquiry.checkOut}</dd></div>
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
                          className={acting === `${inquiry.id}:ACCEPTED` ? 'is-busy' : ''}
                        >
                          Accept in WhatsApp
                        </Button>
                        <button
                          type="button"
                          className="admin-reject-button"
                          onClick={() => decide(inquiry, 'REJECTED')}
                          disabled={Boolean(acting)}
                        >
                          Reject in WhatsApp
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </section>
  );
}
