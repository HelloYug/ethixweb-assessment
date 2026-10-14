import { PolicyPage } from '@/components/policy-page';

export const metadata = { title: 'Terms & Conditions', description: 'Terms for Ethixweb India digital services and engagements.' };

const sections = [
  ['1. Agreement', 'By engaging the business for services, you agree to the final Terms & Conditions and the specific proposal or service agreement that describes your scope.'],
  ['2. Services', 'Services may include web design, development, AI automation, digital marketing, SEO, CRM integrations, content and related support. Deliverables, timelines and fees are defined in the agreed scope.'],
  ['3. Payment terms', 'Deposits, milestones, retainers, taxes, payment dates and any late-payment consequences must be stated in the signed proposal or invoice. Work may pause on overdue accounts where permitted by the agreement.'],
  ['4. Client responsibilities', 'Clients provide accurate information, content and brand assets on time, maintain the rights to supplied materials and respond to review or approval requests within the agreed working rhythm.'],
  ['5. Intellectual property', 'Ownership of custom work, third-party assets, fonts, plugins, open-source components and portfolio display rights should be defined in the signed agreement and the applicable third-party licences.'],
  ['6. Confidentiality', 'Both parties should protect proprietary or sensitive information shared during the engagement. The final agreement should specify the duration and exceptions.'],
  ['7. Limitation of liability', 'The final agreement should set reasonable limits for claims, indirect loss, third-party services, data and business interruption, subject to applicable law.'],
  ['8. Governing law and changes', 'The applicable agreement identifies the governing law, dispute forum and change-notice process for the contracting entities.'],
];

export default function TermsPage() { return <PolicyPage eyebrow="Terms / working relationship" title="Terms & Conditions" updated="January 2025" intro="The working principles behind a clear, accountable digital engagement. Final contractual language belongs in the signed agreement." sections={sections} />; }
