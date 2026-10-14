import { PolicyPage } from '@/components/policy-page';

export const metadata = { title: 'Cancellation & Refunds', description: 'Cancellation and refund information for Ethixweb India engagements.' };

const sections = [
  ['Project cancellations', 'Clients may request cancellation in writing to info@ethixweb.com. Work completed up to the cancellation date may be billable, and any unused prepaid balance should be handled according to the signed proposal and applicable payment terms.'],
  ['Refund eligibility', 'Refunds may apply to projects not started, material undelivered commitments or defects that cannot be reasonably rectified, subject to the signed agreement and its exclusions.'],
  ['Non-refundable items', 'Completed and approved deliverables, rush fees, third-party costs and delays caused by missing client assets or approvals may be excluded where stated in the signed agreement.'],
  ['Monthly retainers', 'Retainer notice periods, current-cycle fees and final service delivery should be defined in the relevant retainer agreement.'],
  ['Processing time', 'Approved refunds should be returned to the original payment method within the timeline stated in the final agreement, subject to payment-provider processing.'],
  ['Contact', 'For a cancellation or refund request, email info@ethixweb.com with the project name, invoice number and a concise description of the request.'],
];

export default function RefundsPage() { return <PolicyPage eyebrow="Refunds / clarity" title="Cancellation & Refunds" updated="January 2025" intro="A plain-language starting point for cancellation, refund and retainer questions. Confirm the final commercial policy before publishing." sections={sections} />; }
