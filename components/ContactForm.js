'use client';

import { useEffect, useRef, useState } from 'react';
import { leadSchema, SERVICE_OPTIONS } from '@/lib/validation/lead';

const initialState = { name: '', email: '', phone: '', company: '', website: '', service: '', message: '', consent: false, honeypot: '', turnstileToken: '' };

function validate(values, turnstileRequired) {
  const result = leadSchema.safeParse({ ...values, sourcePage: '/contact' });
  const errors = {};
  if (!result.success) {
    Object.entries(result.error.flatten().fieldErrors).forEach(([field, messages]) => {
      if (messages?.[0]) errors[field] = messages[0];
    });
  }
  if (turnstileRequired && !values.turnstileToken) errors.turnstile = 'Please complete the spam check and try again.';
  return errors;
}

export default function ContactForm({ defaultService = '', defaultContext = '' }) {
  const [values, setValues] = useState({ ...initialState, service: defaultService });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const turnstileRef = useRef(null);
  const widgetRef = useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey || !turnstileRef.current) return undefined;
    const scriptId = 'turnstile-script';
    const render = () => {
      if (window.turnstile && turnstileRef.current && !widgetRef.current) {
        widgetRef.current = window.turnstile.render(turnstileRef.current, { sitekey: siteKey, theme: 'dark', callback: (token) => { setValues((current) => ({ ...current, turnstileToken: token })); setErrors((current) => { const next = { ...current }; delete next.turnstile; return next; }); }, 'expired-callback': () => setValues((current) => ({ ...current, turnstileToken: '' })), 'error-callback': () => setValues((current) => ({ ...current, turnstileToken: '' })) });
      }
    };
    const existing = document.getElementById(scriptId);
    if (existing) { existing.addEventListener('load', render); render(); return () => existing.removeEventListener('load', render); }
    const script = document.createElement('script');
    script.id = scriptId; script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'; script.async = true; script.defer = true; script.onload = render; document.head.appendChild(script);
    return () => { if (widgetRef.current && window.turnstile) window.turnstile.remove(widgetRef.current); widgetRef.current = null; };
  }, [siteKey]);

  function setField(name, value) {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!Object.prototype.hasOwnProperty.call(current, name)) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  async function submit(event) {
    event.preventDefault();
    const nextErrors = validate(values, Boolean(siteKey));
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) { setStatus('idle'); setMessage('Please check the highlighted fields.'); return; }
    setStatus('loading'); setMessage('');
    try {
      const response = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...values, sourcePage: '/contact' }) });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        if (payload.fieldErrors) {
          const fieldErrors = Object.fromEntries(Object.entries(payload.fieldErrors).flatMap(([field, messages]) => messages?.[0] ? [[field, messages[0]]] : []));
          setErrors(fieldErrors);
        }
        throw new Error(payload?.error?.message || 'We could not send that enquiry. Please try again.');
      }
       setStatus('success'); setMessage('Thanks, your enquiry has been securely received. We will review it and follow up with the right next step.'); setValues(initialState);
    } catch (error) { setStatus('error'); setMessage(error.message); }
  }

  return <form className="form-shell" onSubmit={submit} noValidate aria-describedby="form-note">
    {status === 'success' && <div className="form-alert success" role="status">{message}</div>}
    {status === 'error' && <div className="form-alert error" role="alert">{message}</div>}
    {Object.keys(errors).length > 0 && status !== 'success' && <div className="error-summary" role="alert">{message || 'Please check the highlighted fields.'}</div>}
    {defaultContext && <div className="context-note" role="status"><strong>Context selected:</strong> {defaultContext}. We will use this as a starting point, and you can add the detail that matters in your message.</div>}
    <div className="form-grid two">
      <Field label="Full name" name="name" placeholder="Your full name" value={values.name} onChange={setField} error={errors.name} maxLength={120} required />
      <Field label="Work email" name="email" type="email" placeholder="you@company.com" value={values.email} onChange={setField} error={errors.email} maxLength={180} required />
      <Field label="Phone number" name="phone" type="tel" placeholder="+91 98765 43210" value={values.phone} onChange={setField} error={errors.phone} maxLength={30} />
      <Field label="Company name" name="company" placeholder="Your company" value={values.company} onChange={setField} error={errors.company} maxLength={140} />
      <Field label="Website" name="website" type="url" placeholder="yourbusiness.com" value={values.website} onChange={setField} error={errors.website} maxLength={240} />
      <div className={`field${errors.service ? ' has-error' : ''}`}><label htmlFor="service">Service interested in <span aria-hidden="true">*</span></label><select id="service" name="service" required value={values.service} onChange={(event) => setField('service', event.target.value)} aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? 'service-error' : undefined}><option value="">Choose a starting point</option>{SERVICE_OPTIONS.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</select>{errors.service && <span id="service-error" className="error-text">{errors.service}</span>}</div>
    </div>
    <div className={`field${errors.message ? ' has-error' : ''}`}><label htmlFor="message">Project message <span aria-hidden="true">*</span></label><textarea id="message" name="message" required maxLength={3000} value={values.message} onChange={(event) => setField('message', event.target.value)} placeholder="What are you trying to make clearer, faster or more connected?" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} />{errors.message && <span id="message-error" className="error-text">{errors.message}</span>}</div>
    <div className="honeypot" aria-hidden="true"><label htmlFor="contact-nickname">Nickname</label><input id="contact-nickname" tabIndex={-1} autoComplete="off" value={values.honeypot} onChange={(event) => setField('honeypot', event.target.value)} /></div>
    <label className="consent"><input type="checkbox" required checked={values.consent} onChange={(event) => setField('consent', event.target.checked)} aria-invalid={Boolean(errors.consent)} /> <span>I consent to Ethixweb using these details to respond to this enquiry. <a href="/policies/privacy">Privacy policy ↗</a>{errors.consent && <small className="error-text" style={{ display: 'block' }}>{errors.consent}</small>}</span></label>
    {siteKey ? <div ref={turnstileRef} aria-label="Spam protection" aria-describedby={errors.turnstile ? 'turnstile-error' : undefined} /> : <div className="turnstile-placeholder">Spam protection is temporarily unavailable. Add the required verification details before sending your enquiry.</div>}
    {errors.turnstile && <span id="turnstile-error" className="error-text">{errors.turnstile}</span>}
    <p id="form-note" className="form-note">Share the context, goals and constraints that will help us understand your next move.</p>
    <button className="button button-primary" type="submit" disabled={status === 'loading'} aria-disabled={status === 'loading'}>{status === 'loading' ? 'Sending securely…' : 'Send enquiry'} <span aria-hidden="true">↗</span></button>
  </form>;
}

function Field({ label, name, type = 'text', value, onChange, error, placeholder, maxLength, required }) {
  const errorId = `${name}-error`;
  const autoComplete = name === 'email' ? 'email' : name === 'name' ? 'name' : name === 'phone' ? 'tel' : name === 'website' ? 'url' : 'organization';
  return <div className={`field${error ? ' has-error' : ''}`}><label htmlFor={name}>{label} {required && <span aria-hidden="true">*</span>}</label><input id={name} name={name} type={type} value={value} onChange={(event) => onChange(name, event.target.value)} placeholder={placeholder} maxLength={maxLength} required={required} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} autoComplete={autoComplete} />{error && <span id={errorId} className="error-text">{error}</span>}</div>;
}
