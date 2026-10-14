import { redirect } from 'next/navigation';
import { getApprovedAdmin } from '@/lib/auth/authorization';
import AdminDashboard from '@/components/AdminDashboard';

export const metadata = { title: 'Admin', robots: { index: false, follow: false } };

export default async function AdminPage() {
  const auth = await getApprovedAdmin();
  if (!auth.ok && auth.reason === 'unauthorized') redirect('/admin/login');
  if (!auth.ok && auth.reason === 'forbidden') redirect('/admin/login?error=not-approved');
  const initialError = auth.reason === 'service_unavailable' ? 'The admin service is temporarily unavailable. Please try again shortly.' : undefined;
  return <main id="main-content" className="admin-body"><div className="container"><AdminDashboard configured={auth.ok} userEmail={auth.user?.email || ''} initialError={initialError} /></div></main>;
}
