import { PolicyPage } from '@/components/policy-page';

export const metadata = { title: 'Privacy Policy', description: 'How Ethixweb India handles enquiry, project and technical information.' };

const sections = [
  ['1. Who we are', 'Ethixweb India Private Limited supports digital design, development, marketing and related services. The applicable privacy notice and signed engagement identify the relevant controller, processor and service providers.'],
  ['2. Information we collect', 'Information may include your name, email address, phone number, company name, project details and materials you choose to share. Basic technical data such as pages visited, browser type and IP address may also be collected where configured.'],
  ['3. How we use information', 'Information is used to respond to enquiries, scope and deliver services, send project updates, improve the website and comply with legal obligations. We do not use the public form to create a marketing list without an appropriate basis or consent.'],
  ['4. Sharing information', 'We do not sell personal data. Information may be shared with approved service providers such as hosting, email, analytics, payment and database providers only as needed to operate the business, or when required by law.'],
  ['5. Data storage and security', 'The app is designed to use encrypted transport, server-side validation, protected Supabase access, row-level security and least-privilege administration. No internet transmission is completely risk-free.'],
  ['6. Cookies and third-party services', 'The final deployment may use essential storage and carefully reviewed analytics or advertising services. Review the active vendor list and consent experience before enabling optional tracking.'],
  ['7. Your rights', 'Depending on applicable law, you may request access, correction, deletion or withdrawal of consent. Contact info@ethixweb.com with a clear request and enough context to locate the record.'],
  ['8. Children and changes', 'The services are not directed at children. This policy may be updated as the product, vendors or legal requirements change; the displayed date identifies the latest revision.'],
];

export default function PrivacyPage() { return <PolicyPage eyebrow="Privacy / data care" title="Privacy Policy" updated="September 2026" intro="A clear explanation of the information this India-focused digital experience may receive and how it is intended to be protected." sections={sections} />; }
