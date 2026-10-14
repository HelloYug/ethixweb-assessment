import { ContactPageClient } from './page-client';

export const metadata = { title: 'Start a project', description: 'Tell Ethixweb what you are trying to make clearer, faster or more connected.' };

export default async function ContactPage({ searchParams }) {
  const params = await searchParams;
  return <ContactPageClient service={typeof params?.service === 'string' ? params.service : ''} industry={typeof params?.industry === 'string' ? params.industry : ''} />;
}
