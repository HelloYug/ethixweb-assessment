import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/icons';

export const metadata = {
  title: 'Our Work',
  description: 'Selected Ethixweb work references and India-specific experience patterns for websites, growth and digital operations.',
};

const work = [
  ['/work/all-phase-plumbing.webp', 'All Phase Plumbing', 'A clearer service-business experience designed to make the next action obvious.', 'Web design / conversion'],
  ['/work/garys-pipeline.webp', 'Gary’s Pipelining & Drain Cleaning', 'A specialist offer translated into focused enquiry paths for homeowners and trade partners.', 'Web design / enquiry flow'],
  ['/work/preventive-home-solutions.webp', 'Preventive Home Solutions', 'A trust-first site that gives a high-consideration customer a confident route to inspection.', 'Web design / trust'],
  ['/work/catching-chrome.webp', 'Catching Chrome', 'A cleaner, more credible experience for anglers researching and booking on their phones.', 'Web design / mobile journey'],
];

const scenarios = [
  ['D2C / India', 'From social discovery to a storefront that feels ready for the next tap.'],
  ['B2B / India', 'From scattered enquiries to a pipeline with the context to move a deal forward.'],
  ['Local service / India', 'From missed calls and Maps friction to a system that supports the team in the field.'],
];

export default function OurWorkPage() {
  return <main id="main-content">
    <section className="page-hero"><div className="container"><p className="eyebrow">Our work / selected projects</p><h1 className="display">We build things that make the <em>next move clearer.</em></h1><p className="lead">A curated view of digital work and the India-specific patterns behind clear customer journeys, stronger discovery and better follow-up.</p><div className="hero-actions"><Link className="button button-primary" href="/contact">Create the next case study <Icon name="arrowUpRight" size={17} /></Link><Link className="button button-secondary" href="/our-work#published-references">Explore selected work <Icon name="arrowUpRight" size={17} /></Link></div></div></section>
    <section className="section section-tight" id="published-references"><div className="container"><div className="section-heading"><p className="eyebrow">Selected work</p><h2>Concrete work, with the context kept visible.</h2><p>Explore digital experiences built around clearer positioning, useful discovery and confident next steps.</p></div><div className="work-grid">{work.map(([src, title, text, meta], index) => <article className="card work-card spotlight-card" data-cursor="EXPLORE" key={title}><div className="work-index">0{index + 1}</div><Image src={src} alt={`${title} project preview`} width={800} height={560} /><div className="work-copy"><p className="work-meta">{meta} / digital experience</p><h3>{title}</h3><p>{text}</p><Link className="card-link" href="/our-work#published-references">View project notes</Link></div></article>)}</div></div></section>
    <section className="section dark-band"><div className="container"><div className="section-heading"><p className="eyebrow">India / growth contexts</p><h2>Same craft. Different operating reality.</h2><p>Different businesses need different routes into growth. These are the moments where a clearer digital system can create leverage.</p></div><div className="usecase-grid">{scenarios.map(([label, text], index) => <article className="card usecase" key={label}><span className="usecase-tag">0{index + 1} / {label}</span><h3>{text}</h3><Link className="card-link" href="/contact">Discuss a similar challenge</Link></article>)}</div></div></section>
    <section className="section"><div className="container"><div className="cta-panel"><p className="eyebrow">Make it specific</p><h2>Bring the messy version. We will find the useful shape.</h2><p className="muted" style={{ margin: 0, maxWidth: '650px' }}>Tell us what is currently slow, scattered or unclear. The first step is a focused conversation, not a pitch deck.</p><Link className="button button-primary" href="/contact">Start a project <Icon name="arrowUpRight" size={17} /></Link></div></div></section>
  </main>;
}
