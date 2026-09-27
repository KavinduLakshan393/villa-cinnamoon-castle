import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { apiRequest } from '../lib/api.js';
import Button from '../components/Button.jsx';

const coolingLabels = { NOT_APPLICABLE: 'Flat rate', NON_AC: 'Without A/C', AC: 'With A/C' };
const emptyVariant = (coolingType = 'NOT_APPLICABLE') => ({
  code: '', title: '', coolingType, nightlyRate: '', displayOrder: 0, isActive: true,
});

function InlineAlert({ message, success }) {
  if (!message) return null;
  return <p className={`admin-alert ${success ? 'is-success' : 'is-error'}`} role={success ? 'status' : 'alert'}>{message}</p>;
}

function DeletePackageDialog({ packageName, busy, onClose, onDelete }) {
  const closeRef = useRef(null);
  const deleteRef = useRef(null);
  const closeTimerRef = useRef(null);
  const [closing, setClosing] = useState(false);

  const requestClose = useCallback(() => {
    if (busy || closing) return;
    setClosing(true);
    closeTimerRef.current = window.setTimeout(onClose, 220);
  }, [busy, closing, onClose]);

  useEffect(() => () => window.clearTimeout(closeTimerRef.current), []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') requestClose();
      if (event.key === 'Tab') {
        const first = closeRef.current;
        const last = deleteRef.current;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [busy, requestClose]);

  return (
    <div
      className={`admin-modal-backdrop${closing ? ' is-closing' : ''}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) requestClose();
      }}
    >
      <section
        className="admin-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-package-title"
        aria-describedby="delete-package-description"
      >
        <span className="admin-modal__mark" aria-hidden="true">!</span>
        <div className="admin-modal__copy">
          <p className="eyebrow">Confirm deletion</p>
          <h2 id="delete-package-title">Delete this package?</h2>
          <p id="delete-package-description">
            <strong>{packageName}</strong> and all of its current price variants will be removed from the customer website.
            Existing inquiry history will remain safely stored.
          </p>
        </div>
        <div className="admin-modal__actions">
          <button ref={closeRef} type="button" className="admin-secondary-button" onClick={requestClose} disabled={busy}>
            Close
          </button>
          <button ref={deleteRef} type="button" className="admin-delete-button" onClick={onDelete} disabled={busy}>
            {busy ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </section>
    </div>
  );
}

function VariantEditor({ variant, onChanged, onDeleted }) {
  const [form, setForm] = useState({ ...variant, nightlyRate: String(variant.nightlyRate) });
  const [busy, setBusy] = useState(false);
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const save = async () => {
    setBusy(true);
    try {
      await toast.promise(
        apiRequest(`/admin/package-variants/${variant.id}`, {
          method: 'PATCH',
          body: {
            code: form.code.trim(), title: form.title.trim(), coolingType: form.coolingType,
            nightlyRate: Number(form.nightlyRate), displayOrder: Number(form.displayOrder), isActive: form.isActive,
          },
        }),
        {
          loading: 'Saving price variant…',
          success: 'Price variant saved.',
          error: (error) => error.message || 'Price variant could not be saved.',
        },
      );
      await onChanged();
    } catch {
      /* toast.promise reports the request error. */
    } finally { setBusy(false); }
  };

  const remove = async () => {
    if (!window.confirm(`Delete “${variant.title}”? Existing inquiry history will be preserved.`)) return;
    setBusy(true);
    try {
      await toast.promise(
        apiRequest(`/admin/package-variants/${variant.id}`, { method: 'DELETE' }),
        {
          loading: 'Deleting price variant…',
          success: 'Price variant deleted.',
          error: (error) => error.message || 'Price variant could not be deleted.',
        },
      );
      await onDeleted();
    } catch {
      /* toast.promise reports the request error. */
    } finally { setBusy(false); }
  };

  return (
    <div className="variant-editor">
      <div className="admin-form-grid admin-form-grid--variant">
        <label className="field"><span className="field__label">Variant code</span><input className="field__input" value={form.code} onChange={(e) => update('code', e.target.value)} /></label>
        <label className="field"><span className="field__label">Public title</span><input className="field__input" value={form.title} onChange={(e) => update('title', e.target.value)} /></label>
        <label className="field"><span className="field__label">Cooling</span><select className="field__input" value={form.coolingType} onChange={(e) => update('coolingType', e.target.value)}><option value="NOT_APPLICABLE">Flat rate</option><option value="NON_AC">Without A/C</option><option value="AC">With A/C</option></select></label>
        <label className="field"><span className="field__label">Nightly rate (LKR)</span><input className="field__input" type="number" min="0" step="0.01" value={form.nightlyRate} onChange={(e) => update('nightlyRate', e.target.value)} /></label>
        <label className="field"><span className="field__label">Display order</span><input className="field__input" type="number" min="0" value={form.displayOrder} onChange={(e) => update('displayOrder', e.target.value)} /></label>
        <label className="admin-check"><input type="checkbox" checked={form.isActive} onChange={(e) => update('isActive', e.target.checked)} /><span>Visible to customers</span></label>
      </div>
      <div className="variant-editor__actions">
        <button type="button" className="admin-secondary-button" onClick={save} disabled={busy}>{busy ? 'Saving…' : 'Save variant'}</button>
        <button type="button" className="admin-danger-link" onClick={remove} disabled={busy}>Delete variant</button>
      </div>
    </div>
  );
}

function AddVariant({ packageItem, onAdded }) {
  const existing = new Set(packageItem.variants.map((variant) => variant.coolingType));
  const choices = existing.size === 0
    ? ['NOT_APPLICABLE', 'NON_AC', 'AC']
    : existing.has('NOT_APPLICABLE')
      ? []
      : ['NON_AC', 'AC'].filter((value) => !existing.has(value));
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyVariant(choices[0]));
  const [busy, setBusy] = useState(false);
  if (choices.length === 0) return null;

  const submit = async (event) => {
    event.preventDefault(); setBusy(true);
    try {
      await toast.promise(
        apiRequest(`/admin/packages/${packageItem.id}/variants`, {
          method: 'POST',
          body: { ...form, code: form.code.trim(), title: form.title.trim(), nightlyRate: Number(form.nightlyRate), displayOrder: Number(form.displayOrder) },
        }),
        {
          loading: 'Adding price variant…',
          success: 'Price variant added.',
          error: (requestError) => requestError.message || 'Price variant could not be added.',
        },
      );
      setOpen(false); setForm(emptyVariant(choices[0])); await onAdded();
    } catch {
      /* toast.promise reports the request error. */
    }
    finally { setBusy(false); }
  };

  if (!open) return <button type="button" className="admin-text-button" onClick={() => setOpen(true)}>+ Add price variant</button>;
  return (
    <form className="variant-editor variant-editor--new" onSubmit={submit}>
      <h4>Add price variant</h4>
      <div className="admin-form-grid admin-form-grid--variant">
        <label className="field"><span className="field__label">Variant code</span><input className="field__input" required value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} /></label>
        <label className="field"><span className="field__label">Public title</span><input className="field__input" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
        <label className="field"><span className="field__label">Cooling</span><select className="field__input" value={form.coolingType} onChange={(e) => setForm({ ...form, coolingType: e.target.value })}>{choices.map((choice) => <option key={choice} value={choice}>{coolingLabels[choice]}</option>)}</select></label>
        <label className="field"><span className="field__label">Nightly rate (LKR)</span><input className="field__input" type="number" min="0" required value={form.nightlyRate} onChange={(e) => setForm({ ...form, nightlyRate: e.target.value })} /></label>
      </div>
      <div className="variant-editor__actions"><button className="admin-secondary-button" type="submit" disabled={busy}>{busy ? 'Adding…' : 'Add variant'}</button><button className="admin-text-button" type="button" onClick={() => setOpen(false)}>Cancel</button></div>
    </form>
  );
}

function PackageEditor({ item, reload }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ ...item });
  const [busy, setBusy] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));
  const save = async () => {
    setBusy(true);
    try {
      await toast.promise(
        apiRequest(`/admin/packages/${item.id}`, {
          method: 'PATCH',
          body: {
            code: form.code.trim(), publicName: form.publicName.trim(), publicDetail: form.publicDetail.trim(),
            stayType: form.stayType, minGuests: Number(form.minGuests), maxGuests: Number(form.maxGuests),
            displayOrder: Number(form.displayOrder), isActive: form.isActive,
          },
        }),
        {
          loading: 'Saving package…',
          success: 'Package saved.',
          error: (error) => error.message || 'Package could not be saved.',
        },
      );
      await reload();
    } catch {
      /* toast.promise reports the request error. */
    }
    finally { setBusy(false); }
  };
  const remove = async () => {
    setBusy(true);
    try {
      await toast.promise(
        apiRequest(`/admin/packages/${item.id}`, { method: 'DELETE' }),
        {
          loading: 'Deleting package…',
          success: 'Package deleted.',
          error: (error) => error.message || 'Package could not be deleted.',
        },
      );
      await reload();
    } catch {
      setDeleteOpen(false);
    } finally {
      setBusy(false);
    }
  };

  return (
    <article className={`package-editor${open ? ' is-open' : ''}`}>
      <button type="button" className="package-editor__summary" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        <span><strong>{item.publicName}</strong><small>{item.stayType === 'WEEKEND' ? 'Weekend' : 'Weekday'} · {item.minGuests}–{item.maxGuests} guests · {item.variants.length} {item.variants.length === 1 ? 'rate' : 'rates'}</small></span>
        <span className={`status-badge ${item.isActive ? 'is-accepted' : 'is-rejected'}`}>{item.isActive ? 'Visible' : 'Hidden'}</span>
        <span className="package-editor__chevron" aria-hidden="true">⌄</span>
      </button>
      <div className="package-editor__collapse" aria-hidden={!open} inert={!open}>
        <div className="package-editor__collapse-inner">
          <div className="package-editor__content">
          <div className="admin-form-grid">
            <label className="field"><span className="field__label">Package code</span><input className="field__input" value={form.code} onChange={(e) => update('code', e.target.value)} /></label>
            <label className="field"><span className="field__label">Public name</span><input className="field__input" value={form.publicName} onChange={(e) => update('publicName', e.target.value)} /></label>
            <label className="field admin-field--wide"><span className="field__label">Public detail</span><input className="field__input" value={form.publicDetail} onChange={(e) => update('publicDetail', e.target.value)} /></label>
            <label className="field"><span className="field__label">Stay type</span><select className="field__input" value={form.stayType} onChange={(e) => update('stayType', e.target.value)}><option value="WEEKDAY">Weekday</option><option value="WEEKEND">Weekend</option></select></label>
            <label className="field"><span className="field__label">Minimum guests</span><input className="field__input" type="number" min="1" max="15" value={form.minGuests} onChange={(e) => update('minGuests', e.target.value)} /></label>
            <label className="field"><span className="field__label">Maximum guests</span><input className="field__input" type="number" min="1" max="15" value={form.maxGuests} onChange={(e) => update('maxGuests', e.target.value)} /></label>
            <label className="field"><span className="field__label">Display order</span><input className="field__input" type="number" min="0" value={form.displayOrder} onChange={(e) => update('displayOrder', e.target.value)} /></label>
            <label className="admin-check"><input type="checkbox" checked={form.isActive} onChange={(e) => update('isActive', e.target.checked)} /><span>Visible to customers</span></label>
          </div>
          <div className="package-editor__actions"><Button size="sm" onClick={save} disabled={busy}>{busy ? 'Saving…' : 'Save package'}</Button><button type="button" className="admin-danger-link" onClick={() => setDeleteOpen(true)} disabled={busy}>Delete package</button></div>
          <section className="package-editor__variants" aria-label={`${item.publicName} price variants`}>
            <header><h3>Price variants</h3><p>Flat rate, or separate Non-A/C and A/C rates.</p></header>
            {item.variants.map((variant) => <VariantEditor key={variant.id} variant={variant} onChanged={reload} onDeleted={reload} />)}
            <AddVariant packageItem={item} onAdded={reload} />
          </section>
          </div>
        </div>
      </div>
      {deleteOpen && (
        <DeletePackageDialog
          packageName={item.publicName}
          busy={busy}
          onClose={() => setDeleteOpen(false)}
          onDelete={remove}
        />
      )}
    </article>
  );
}

function CreatePackage({ onCreated }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('FLAT');
  const [form, setForm] = useState({ code: '', publicName: '', publicDetail: '', stayType: 'WEEKDAY', minGuests: 1, maxGuests: 2, displayOrder: 0, isActive: true });
  const [variants, setVariants] = useState([emptyVariant()]);
  const [busy, setBusy] = useState(false);
  const updateVariant = (index, field, value) => setVariants((current) => current.map((variant, i) => i === index ? { ...variant, [field]: value } : variant));
  const changeMode = (next) => {
    setMode(next);
    setVariants(next === 'FLAT' ? [emptyVariant()] : [emptyVariant('NON_AC'), emptyVariant('AC')]);
  };
  const submit = async (event) => {
    event.preventDefault(); setBusy(true);
    try {
      await toast.promise(
        apiRequest('/admin/packages', {
          method: 'POST',
          body: {
            ...form, code: form.code.trim(), publicName: form.publicName.trim(), publicDetail: form.publicDetail.trim(),
            minGuests: Number(form.minGuests), maxGuests: Number(form.maxGuests), displayOrder: Number(form.displayOrder),
            variants: variants.map((variant) => ({ ...variant, code: variant.code.trim(), title: variant.title.trim(), nightlyRate: Number(variant.nightlyRate), displayOrder: Number(variant.displayOrder) })),
          },
        }),
        {
          loading: 'Creating package…',
          success: 'Package created.',
          error: (requestError) => requestError.message || 'Package could not be created.',
        },
      );
      setOpen(false); await onCreated();
    } catch {
      /* toast.promise reports the request error. */
    }
    finally { setBusy(false); }
  };
  if (!open) return <Button onClick={() => setOpen(true)}>Create package</Button>;
  return (
    <form className="create-package" onSubmit={submit}>
      <header><div><p className="eyebrow">New stay option</p><h2>Create a package</h2></div><button type="button" className="admin-text-button" onClick={() => setOpen(false)}>Cancel</button></header>
      <div className="admin-form-grid">
        <label className="field"><span className="field__label">Package code</span><input className="field__input" required placeholder="garden-suite" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} /><small className="field__hint">Lowercase letters, numbers and hyphens.</small></label>
        <label className="field"><span className="field__label">Public name</span><input className="field__input" required value={form.publicName} onChange={(e) => setForm({ ...form, publicName: e.target.value })} /></label>
        <label className="field admin-field--wide"><span className="field__label">Public detail</span><input className="field__input" required value={form.publicDetail} onChange={(e) => setForm({ ...form, publicDetail: e.target.value })} /></label>
        <label className="field"><span className="field__label">Stay type</span><select className="field__input" value={form.stayType} onChange={(e) => setForm({ ...form, stayType: e.target.value })}><option value="WEEKDAY">Weekday</option><option value="WEEKEND">Weekend</option></select></label>
        <label className="field"><span className="field__label">Minimum guests</span><input className="field__input" type="number" min="1" max="15" value={form.minGuests} onChange={(e) => setForm({ ...form, minGuests: e.target.value })} /></label>
        <label className="field"><span className="field__label">Maximum guests</span><input className="field__input" type="number" min="1" max="15" value={form.maxGuests} onChange={(e) => setForm({ ...form, maxGuests: e.target.value })} /></label>
        <label className="field"><span className="field__label">Display order</span><input className="field__input" type="number" min="0" value={form.displayOrder} onChange={(e) => setForm({ ...form, displayOrder: e.target.value })} /></label>
      </div>
      <fieldset className="create-package__pricing"><legend>Pricing structure</legend><label className={`admin-choice${mode === 'FLAT' ? ' is-selected' : ''}`}><input type="radio" name="pricing-mode" checked={mode === 'FLAT'} onChange={() => changeMode('FLAT')} />One flat rate</label><label className={`admin-choice${mode === 'DUAL' ? ' is-selected' : ''}`}><input type="radio" name="pricing-mode" checked={mode === 'DUAL'} onChange={() => changeMode('DUAL')} />Non-A/C and A/C rates</label></fieldset>
      <div className="create-package__variants">
        {variants.map((variant, index) => (
          <div className="variant-editor" key={variant.coolingType}><h3>{coolingLabels[variant.coolingType]}</h3><div className="admin-form-grid admin-form-grid--variant"><label className="field"><span className="field__label">Variant code</span><input className="field__input" required value={variant.code} onChange={(e) => updateVariant(index, 'code', e.target.value)} /></label><label className="field"><span className="field__label">Public title</span><input className="field__input" required value={variant.title} onChange={(e) => updateVariant(index, 'title', e.target.value)} /></label><label className="field"><span className="field__label">Nightly rate (LKR)</span><input className="field__input" type="number" min="0" required value={variant.nightlyRate} onChange={(e) => updateVariant(index, 'nightlyRate', e.target.value)} /></label></div></div>
        ))}
      </div>
      <div className="create-package__actions"><Button type="submit" disabled={busy}>{busy ? 'Creating…' : 'Create package'}</Button></div>
    </form>
  );
}

export default function AdminPackages() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const load = useCallback(async () => {
    setLoading(true); setError('');
    try { const result = await apiRequest('/admin/packages'); setItems(result.packages); }
    catch (requestError) { setError(requestError.message); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { load(); }, [load]);

  return (
    <section className="admin-page" aria-labelledby="admin-packages-title">
      <header className="admin-page__header"><div><p className="eyebrow">Stay catalogue</p><h1 id="admin-packages-title">Packages</h1><p className="lead">Create and maintain the stay options and rates shown to customers.</p></div><CreatePackage onCreated={load} /></header>
      {error && <InlineAlert message={error} />}
      {loading ? <p className="admin-empty" role="status">Loading packages…</p> : <div className="package-editors">{items.map((item) => <PackageEditor key={item.id} item={item} reload={load} />)}</div>}
    </section>
  );
}
