'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/lib/supabase/browser';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  async function submit(event) {
    event.preventDefault(); setStatus('loading'); setError('');
    try {
      const supabase = createBrowserSupabaseClient();
      if (!supabase) { setStatus('error'); setError('Supabase is not configured. Add the environment variables from .env.example before using admin access.'); return; }
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) { setStatus('error'); setError('The email or password could not be verified.'); return; }
      router.replace('/admin'); router.refresh();
    } catch { setStatus('error'); setError('Admin sign-in is temporarily unavailable. Please try again.'); }
  }

  return <main id="main-content" className="admin-body"><div className="container" style={{ maxWidth: '560px' }}><div className="form-shell"><Link className="brand" href="/"><Image src="/brand/ethixweb-logo.webp" alt="Ethixweb" width={214} height={32} /></Link><div><p className="eyebrow">Private workspace</p><h1 style={{ margin: '.6rem 0 0', fontSize: 'clamp(2.2rem,6vw,4rem)', lineHeight: .98, letterSpacing: '-.06em' }}>Welcome back.</h1><p className="muted" style={{ lineHeight: 1.6 }}>Sign in with an approved Supabase Auth account to manage enquiries.</p></div>{error && <div className="form-alert error" role="alert">{error}</div>}<form onSubmit={submit} className="form-grid"><div className="field"><label htmlFor="admin-email">Email</label><input id="admin-email" type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} /></div><div className="field"><label htmlFor="admin-password">Password</label><input id="admin-password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /></div><button className="button button-primary" type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Signing in…' : 'Sign in'} <span aria-hidden="true">↗</span></button></form><p className="form-note">There is no public registration flow. Create an account in Supabase Auth, then approve its UUID in <code>public.admin_users</code>.</p><Link className="card-link" href="/">← Back to the public site</Link></div></div></main>;
}
