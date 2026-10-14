'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getServiceLabel } from '@/lib/validation/lead';

const statuses = ['all', 'new', 'contacted', 'qualified', 'won', 'lost', 'spam'];

export default function AdminDashboard({ configured, userEmail, initialError = '' }) {
  const router = useRouter();
  const [leads, setLeads] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [loading, setLoading] = useState(configured);
  const [error, setError] = useState(initialError || (configured ? '' : 'Supabase is not configured. Add the server environment variables before using the dashboard.'));
  const [saving, setSaving] = useState(false);
  const [notes, setNotes] = useState('');

  async function loadLeads() {
    setLoading(true); setError('');
    try {
      const params = new URLSearchParams(); if (search) params.set('search', search); if (status !== 'all') params.set('status', status);
      const response = await fetch(`/api/admin/leads?${params.toString()}`, { cache: 'no-store' });
      const payload = await response.json().catch(() => ({}));
      if (response.status === 401) { router.replace('/admin/login'); return; }
      if (!response.ok) { setError(payload?.error?.message || 'Unable to load enquiries.'); return; }
      setLeads(Array.isArray(payload.data) ? payload.data : []);
    } catch { setError('Unable to reach the enquiry service. Please try again.'); }
    finally { setLoading(false); }
  }

  useEffect(() => { if (configured) loadLeads(); }, [configured, status]);
  useEffect(() => { if (!selected) return; setNotes(selected.internal_notes || ''); }, [selected]);

  const metrics = useMemo(() => ({ total: leads.length, new: leads.filter((lead) => lead.status === 'new').length, contacted: leads.filter((lead) => lead.status === 'contacted').length, qualified: leads.filter((lead) => lead.status === 'qualified').length }), [leads]);

  async function save() {
    if (!selected) return; setSaving(true); setError('');
    try {
      const response = await fetch(`/api/admin/leads/${selected.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: selected.status, internal_notes: notes }) });
      const payload = await response.json().catch(() => ({}));
      if (response.status === 401) { router.replace('/admin/login'); return; }
      if (!response.ok) setError(payload?.error?.message || 'Unable to save this enquiry.'); else if (payload.data) { setSelected(payload.data); setLeads((current) => current.map((lead) => lead.id === payload.data.id ? { ...lead, ...payload.data } : lead)); }
    } catch { setError('Unable to reach the enquiry service. Please try again.'); }
    finally { setSaving(false); }
  }

  async function logout() {
    try { await fetch('/api/auth/logout', { method: 'POST' }); }
    catch { /* Continue to the login screen even if the session endpoint is unavailable. */ }
    router.replace('/admin/login'); router.refresh();
  }

  return <div className="admin-shell"><div className="admin-top"><div><p className="eyebrow">Private workspace</p><h1>Lead desk.</h1><p className="muted" style={{ margin: '.4rem 0 0', fontSize: '.84rem' }}>{userEmail || 'Configuration required'}</p></div><div className="admin-actions"><button className="button button-secondary" type="button" onClick={logout}>Log out</button></div></div>{error && <div className="admin-error" role="alert">{error}</div>}<div className="metric-grid"><Metric label="Visible leads" value={metrics.total} /><Metric label="New" value={metrics.new} /><Metric label="Contacted" value={metrics.contacted} /><Metric label="Qualified" value={metrics.qualified} /></div><div className="admin-layout"><section className="admin-list" aria-label="Lead list"><div className="admin-toolbar"><input type="search" placeholder="Search leads by name, email or company" value={search} onChange={(event) => setSearch(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && loadLeads()} aria-label="Search leads" /><select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filter by status">{statuses.map((item) => <option key={item} value={item}>{item === 'all' ? 'All statuses' : item}</option>)}</select><button className="button button-secondary" type="button" onClick={loadLeads}>Refresh</button></div>{loading ? <div className="empty">Loading enquiries…</div> : leads.length === 0 ? <div className="empty">No enquiries match this view.</div> : <div className="lead-list">{leads.map((lead) => <button key={lead.id} className={`lead-item${selected?.id === lead.id ? ' selected' : ''}`} type="button" onClick={async () => { try { const response = await fetch(`/api/admin/leads/${lead.id}`); const payload = await response.json().catch(() => ({})); if (response.status === 401) { router.replace('/admin/login'); return; } if (!response.ok) { setError(payload?.error?.message || 'Unable to load this enquiry.'); return; } if (payload.data) setSelected(payload.data); } catch { setError('Unable to reach the enquiry service. Please try again.'); } }}><strong className="lead-name">{lead.name}</strong><span className="lead-contact">{lead.company || lead.email}</span><span className="lead-meta"><span className="status-pill">{lead.status}</span><span className="lead-service">{getServiceLabel(lead.service) || lead.service || 'Unknown service'}</span></span></button>)}</div>}</section><section className="admin-detail" aria-label="Lead details">{selected ? <div className="detail-grid"><div><p className="eyebrow">Enquiry detail</p><h2 style={{ margin: '.45rem 0 0', fontSize: '1.65rem', letterSpacing: '-.04em' }}>{selected.name}</h2><p className="muted" style={{ fontSize: '.78rem' }}>{Number.isNaN(new Date(selected.created_at).getTime()) ? 'Date unavailable' : new Date(selected.created_at).toLocaleString()}</p></div><div className="detail-row"><label>Contact</label><p><a href={`mailto:${selected.email}`}>{selected.email}</a>{selected.phone && <> · <a href={`tel:${selected.phone}`}>{selected.phone}</a></>}</p></div><div className="detail-row"><label>Company / website</label><p>{selected.company || 'No company supplied'}{selected.website && <> · {selected.website}</>}</p></div><div className="detail-row"><label>Service</label><p>{getServiceLabel(selected.service) || selected.service || 'Unknown service'}</p></div><div className="detail-row"><label>Message</label><p>{selected.message}</p></div><div className="field"><label htmlFor="lead-status">Status</label><select id="lead-status" value={selected.status} onChange={(event) => setSelected({ ...selected, status: event.target.value })}>{statuses.filter((item) => item !== 'all').map((item) => <option key={item} value={item}>{item}</option>)}</select></div><div className="field"><label htmlFor="lead-notes">Internal notes</label><textarea id="lead-notes" maxLength={5000} value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Only visible to approved admins." /></div><button className="button button-primary" type="button" onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save changes'} <span aria-hidden="true">↗</span></button></div> : <div className="empty"><p className="eyebrow">Select a lead</p><p>Choose an enquiry to review its message, update status and add internal context.</p></div>}</section></div></div>;
}

function Metric({ label, value }) { return <div className="metric"><strong>{value}</strong><span>{label}</span></div>; }
