import Link from 'next/link';
import { Icon } from '@/components/icons';

export const metadata = {
  title: 'Industries',
  description: 'India-specific digital systems for local services, D2C, healthcare, manufacturing and growth-minded teams.',
};

const industries = [
  {
    number: '01',
    title: 'Local services & field teams',
    intro: 'You are on the job. Your digital system still needs to answer, qualify and guide the next customer.',
    problem: 'Missed calls, weak Maps visibility and forms that ask too much can quietly turn demand into a competitor’s booking.',
    items: ['Local SEO and Google Maps foundations', 'Call, WhatsApp and enquiry handoffs', 'Service-area pages that clarify where you work', 'CRM / field-service workflow connections'],
  },
  {
    number: '02',
    title: 'D2C & consumer brands',
    intro: 'Make discovery, trust and checkout feel as considered as the product itself.',
    problem: 'Indian shoppers move between social, search, marketplaces and direct storefronts before they decide where to buy.',
    items: ['Mobile-first storefronts and landing pages', 'Product storytelling and conversion paths', 'Analytics for campaigns, repeat purchase and retention', 'Content systems for launches and seasonal demand'],
  },
  {
    number: '03',
    title: 'Healthcare, education & professional services',
    intro: 'Turn high-consideration decisions into a clearer, more reassuring first step.',
    problem: 'When trust and context matter, a generic form or unclear service page makes people hesitate before they ever speak to you.',
    items: ['Structured service and location content', 'Accessible, low-friction enquiry journeys', 'Appointment and lead-routing integrations', 'Approved knowledge assistants with human handoff'],
  },
  {
    number: '04',
    title: 'Manufacturing, B2B & startups',
    intro: 'Give complex offers a digital operating layer that helps the right enquiry move forward.',
    problem: 'Long sales cycles need better context, not more disconnected tools and spreadsheets.',
    items: ['Positioning for technical and regional buyers', 'Lead qualification and CRM workflows', 'Partner, distributor and catalogue experiences', 'Dashboards that support the next commercial decision'],
  },
];

const realities = [
  ['Mobile first', 'The first interaction often happens on a phone, between meetings, commutes or field work.'],
  ['Local discovery', 'Search, Maps, neighbourhood intent and service areas need to work together.'],
  ['Human handoff', 'Automation should create a better conversation, not hide the person customers need.'],
  ['Regional context', 'Language, geography, trust cues and payment expectations shape the journey.'],
];

export default function IndustriesPage() {
  return <main id="main-content">
    <section className="page-hero"><div className="container"><p className="eyebrow">Industries / India <span className="eyebrow-status"><i /> context mapped</span></p><h1 className="display">Built for the businesses shaping <em>India’s next chapter.</em></h1><p className="lead">Different sectors have different friction. The useful system is the one that understands the customer, the team and the realities between the two.</p><div className="hero-actions"><Link className="button button-primary" href="/contact">Map my growth system <Icon name="arrowUpRight" size={17} /></Link><Link className="button button-secondary" href="/services">Browse capabilities <Icon name="arrow" size={17} /></Link></div></div></section>
    <section className="section section-tight"><div className="container"><div className="section-heading"><p className="eyebrow">Find your operating context</p><h2>One connected approach, shaped around the work.</h2><p>Start with the pressure point you recognise. We will map the smallest useful intervention before recommending a larger build.</p></div><div className="industry-grid">{industries.map((industry) => <article className="card industry-card" key={industry.number}><p className="card-index">{industry.number} / context</p><h3>{industry.title}</h3><p className="industry-intro">{industry.intro}</p><p className="industry-problem">{industry.problem}</p><ul className="check-list">{industry.items.map((item) => <li key={item}><Icon name="shield" size={15} />{item}</li>)}</ul><Link className="card-link" href={`/contact?industry=${encodeURIComponent(industry.title)}`}>Talk about this context</Link></article>)}</div></div></section>
    <section className="section dark-band"><div className="container"><div className="section-heading"><p className="eyebrow">India operating realities</p><h2>Details that should be designed in, not discovered too late.</h2></div><div className="grid-4">{realities.map(([title, text], index) => <article className="card" key={title}><p className="card-index">0{index + 1}</p><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <section className="section"><div className="container split"><div className="section-heading" style={{ marginBottom: 0 }}><p className="eyebrow">Not a template</p><h2>The right first move depends on where momentum is leaking.</h2><p>It might be a clearer service page, a faster follow-up, a more useful CRM view or a new operating layer. The audit comes before the prescription.</p></div><div className="cta-panel"><p className="eyebrow">Your context</p><h2>Tell us what the business is carrying.</h2><p className="muted" style={{ margin: 0 }}>Share the sector, the friction and the next milestone. We will come back with a focused route into the system.</p><Link className="button button-primary" href="/contact">Start the conversation <Icon name="arrowUpRight" size={17} /></Link></div></div></section>
  </main>;
}
