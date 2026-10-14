import Image from 'next/image';
import Link from 'next/link';
import { ArrowLink, NetworkVisual, SignalMarquee } from '@/components/site';
import { SignalMatrix } from '@/components/animations';
import { Icon } from '@/components/icons';

export const metadata = { title: 'Global expertise. Built for Indian ambition.', description: 'Websites, growth systems and intelligent automation for Indian businesses ready to scale with clarity.' };

const services = [
  ['01', 'Web experiences', 'Fast, credible websites and ecommerce journeys built around how your customers decide.', 'More qualified attention, fewer dead ends.', 'code'],
  ['02', 'Search & growth', 'SEO, paid acquisition and analytics connected to the actions that matter to your business.', 'A clearer path from discovery to demand.', 'chart'],
  ['03', 'AI & automation', 'Practical agents and workflows that reduce manual follow-up without adding operational noise.', 'More consistency for the team behind the screen.', 'bot'],
  ['04', 'CRM & analytics', 'Lead capture, integrations and useful reporting that keep customer context moving.', 'One operating picture instead of scattered tools.', 'layers'],
];

const friction = [
  ['01', 'Your website gets attention, not enough enquiries.', 'Good traffic cannot compensate for unclear positioning or a next step that feels like work.'],
  ['02', 'Your tools know different versions of the customer.', 'Disconnected forms, inboxes and CRMs make every follow-up slower than it needs to be.'],
  ['03', 'Valuable leads wait for a manual response.', 'The gap between interest and action is where momentum quietly disappears.'],
];

const process = [
  ['01', 'Discover', 'Understand the business, customer and friction before choosing the tools.'],
  ['02', 'Design', 'Turn the strategy into a sharp message, confident interface and clear conversion path.'],
  ['03', 'Build & connect', 'Ship the experience and connect the systems that keep it useful after launch.'],
  ['04', 'Measure & improve', 'Use practical signals to learn what is working and make the next decision better.'],
];

const work = [
  ['/work/all-phase-plumbing.webp', 'All Phase Plumbing', 'A service-business experience built around clear local discovery and action.'],
  ['/work/garys-pipeline.webp', 'Gary’s Pipelining & Drain Cleaning', 'A specialist service journey with focused enquiry paths for customers and trade partners.'],
  ['/work/preventive-home-solutions.webp', 'Preventive Home Solutions', 'A trust-first service experience that gives high-consideration customers a confident next step.'],
  ['/work/catching-chrome.webp', 'Catching Chrome', 'A mobile booking journey shaped for customers researching and choosing on the move.'],
];

export default function HomePage() {
  return <main id="main-content">
    <section className="hero"><div className="hero-scanline" aria-hidden="true" /><div className="container hero-grid"><div className="hero-copy reveal"><p className="eyebrow">Ethixweb / India <span className="eyebrow-status"><i /> accepting new signals</span></p><h1 className="display">Ambition moves fast. Your <em>digital systems</em> should move faster.</h1><p className="lead">Websites, growth systems and intelligent automation for Indian businesses ready to scale with clarity.</p><div className="hero-actions"><Link className="button button-primary" data-cursor="START" data-magnetic href="/contact">Start a project <Icon name="arrowUpRight" size={17} /></Link><Link className="button button-secondary" data-cursor="EXPLORE" href="/services">Explore what we do <Icon name="arrow" size={17} /></Link></div><ul className="signal-list" aria-label="Approach indicators"><li><Icon name="users" size={14} /> Senior-led thinking</li><li><Icon name="mouse" size={14} /> Mobile-first execution</li><li><Icon name="layers" size={14} /> Connected by design</li></ul><div className="hero-readout"><span><b>01</b> / SIGNAL ONLINE</span><span>NEW DELHI · INDIA</span><span className="readout-pulse"><i /> 24/7 SYSTEMS</span></div></div><div className="hero-visual reveal delay-2"><NetworkVisual /></div></div></section>
    <SignalMarquee />

    <section className="section signal-intro"><div className="container split"><div className="section-heading" style={{ marginBottom: 0 }}><p className="eyebrow">The signal</p><h2>Turn scattered digital effort into one clear system.</h2></div><div className="signal-intro-copy"><p>Every touchpoint is a signal: a search, a tap, an enquiry, a follow-up. Ethixweb helps the signals connect, so the customer journey feels clearer and the team behind it moves with more context.</p><Link className="card-link" href="/about">See the thinking behind the system</Link></div></div></section>

    <section className="section section-tight"><div className="container"><div className="section-heading friction-heading"><p className="eyebrow">The friction</p><h2>Growth gets expensive when the pieces do not talk.</h2><p>Indian businesses are moving quickly. The digital experience should make the next action obvious, for the customer and the team.</p></div><div className="grid-3">{friction.map(([n, title, text]) => <article className="card friction-card" key={n}><span className="number">{n}</span><p className="card-index">{n} / signal</p><strong>{title}</strong><p style={{ marginTop: '.75rem' }}>{text}</p></article>)}</div></div></section>

    <section className="section dark-band matrix-section"><div className="container"><div className="section-heading"><p className="eyebrow">The operating system</p><h2>Four layers. One connected signal.</h2><p>Move through the system and see how a thoughtful digital presence becomes a more useful business engine for teams in India.</p></div><SignalMatrix /></div></section>

    <section className="section section-tight"><div className="container"><div className="section-heading"><p className="eyebrow">What we build</p><h2>Capabilities with a job to do.</h2><p>Every capability should earn its place by making the next customer or team action clearer.</p></div><div className="grid-4">{services.map(([n, title, text, outcome, icon]) => <article className="card capability-card spotlight-card reveal-on-scroll" data-cursor="INSPECT" key={n}><p className="card-index">{n}</p><span className="capability-mark" aria-hidden="true"><Icon name={icon} size={24} strokeWidth={1.8} /></span><h3>{title}</h3><p>{text}</p><p className="dim" style={{ marginTop: '1rem', fontSize: '.82rem' }}>Outcome: {outcome}</p><ArrowLink href="/services">Discuss this capability</ArrowLink></article>)}</div></div></section>

    <section id="process" className="section"><div className="container"><div className="section-heading"><p className="eyebrow">A clear rhythm</p><h2>Discover. Design. Connect. Improve.</h2><p>The same senior-led process from first conversation to the next useful iteration.</p></div><div className="process-grid">{process.map(([n, title, text]) => <article className="card process-card" key={n}><span className="step-line" aria-hidden="true" /><p className="card-index">{n}</p><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="section dark-band"><div className="container"><div className="section-heading"><p className="eyebrow">Selected work</p><h2>Proof should be concrete, and honestly labeled.</h2><p>A selection of digital experiences built to make customer journeys clearer, faster and easier to trust.</p></div><div className="work-grid">{work.map(([src, title, text], index) => <article className="card work-card spotlight-card reveal-on-scroll" data-cursor="EXPLORE" key={title}><div className="work-index">0{index + 1}</div><Image src={src} alt={`${title} project preview`} width={800} height={560} /><div className="work-copy"><p className="work-meta">Digital experience</p><h3>{title}</h3><p>{text}</p><ArrowLink href="/our-work#published-references" className="work-link">Explore the work</ArrowLink></div></article>)}</div><div style={{ marginTop: '1.5rem' }}><Link className="button button-secondary" data-cursor="VIEW" href="/our-work#published-references">View selected work <Icon name="arrowUpRight" size={16} /></Link></div></div></section>

    <section className="section"><div className="container split"><div className="section-heading" style={{ marginBottom: 0 }}><p className="eyebrow">Why Ethixweb</p><h2>Senior thinking, connected execution.</h2><p>Keep the strongest part of the original promise: a small, accountable team that understands the system behind the screen.</p><Link className="button button-primary" href="/about" style={{ marginTop: '1.6rem' }}>How we work <span aria-hidden="true">↗</span></Link></div><div className="principle-stack"><article className="card principle-card"><span>01</span><div><h3>Senior-led collaboration</h3><p>Talk to the people shaping the work, with fewer handoffs and clearer decisions.</p></div></article><article className="card principle-card"><span>02</span><div><h3>Conversion-first design</h3><p>Make the next customer action easy to understand, especially on a small screen.</p></div></article><article className="card principle-card"><span>03</span><div><h3>Useful data</h3><p>Measure signals that help the team decide what to improve next, not vanity for its own sake.</p></div></article></div></div></section>

    <section className="section section-tight dark-band"><div className="container"><div className="section-heading"><p className="eyebrow">Connected operations</p><h2>Built for fast-moving teams across India and beyond.</h2><p>Local context, remote collaboration and one clear digital layer for the work that keeps a business moving.</p></div><div className="metric-grid"><article className="metric"><strong>India hub</strong><span>Context close to the businesses we serve.</span></article><article className="metric"><strong>Mobile-first</strong><span>Journeys designed for the device most people start with.</span></article><article className="metric"><strong>Human-led</strong><span>Automation that knows when to hand over.</span></article><article className="metric"><strong>One system</strong><span>Website, growth, data and follow-up connected.</span></article></div></div></section>

    <section className="section dark-band usecase-section"><div className="container"><div className="section-heading"><p className="eyebrow">Where the system creates leverage</p><h2>Built for India’s business reality.</h2><p>Clearer customer journeys and stronger follow-up for the moments where good businesses lose momentum.</p></div><div className="usecase-grid"><article className="card usecase"><span className="usecase-tag">D2C</span><h3>A faster storefront that turns product interest into a confident next step.</h3></article><article className="card usecase"><span className="usecase-tag">Local services</span><h3>A discoverable business with enquiry paths that work on the move.</h3></article><article className="card usecase"><span className="usecase-tag">B2B</span><h3>A cleaner pipeline for a manufacturer managing high-intent enquiries.</h3></article><article className="card usecase"><span className="usecase-tag">Startup</span><h3>A connected lead flow that gives a small team more context, sooner.</h3></article></div></div></section>

    <section className="section"><div className="container"><div className="cta-panel cta-panel-animated"><span className="cta-orbit" aria-hidden="true" /><p className="eyebrow">Your next move</p><h2>Your next stage of growth deserves better systems.</h2><p className="muted" style={{ maxWidth: '600px', margin: 0 }}>Bring the messy stack, the slow site or the missed enquiry. Start with a clear conversation about what should work better.</p><Link className="button button-primary" data-cursor="START" data-magnetic href="/contact">Let’s talk <Icon name="arrowUpRight" size={17} /></Link></div></div></section>
  </main>;
}
