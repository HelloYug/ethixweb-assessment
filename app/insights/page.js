import Link from 'next/link';
import { Icon } from '@/components/icons';

export const metadata = {
  title: 'Insights',
  description: 'India-focused field notes on websites, AI, local discovery, design, engineering and growth systems.',
};

const notes = [
  ['Growth', 'Why your landing page is not converting', 'The seven friction points we check first when an Indian campaign is getting attention but not enough action.'],
  ['AI', 'Building an AI support agent in 14 days', 'A practical shape for approved knowledge, clear escalation and a human handoff that does not feel like a dead end.'],
  ['Growth', 'Your ad budget is not the problem. Your follow-up is.', 'Five places a high-intent lead can stall between a click, a WhatsApp message and a sales conversation.'],
  ['Local SEO', 'Google Maps is your real local homepage', 'The weekly signals that help a service business stay discoverable across neighbourhood and city intent.'],
  ['Design', 'Brand systems that scale with you', 'How to build a flexible visual and content system for teams moving across products, regions and campaigns.'],
  ['AI', 'An AI receptionist answered while the team was on site', 'What 24/7 missed-call capture can look like when the goal is context and booking, not a robotic wall.'],
  ['SEO', 'SEO is changing. The useful work remains.', 'How search, answer engines, regional language and genuinely helpful pages can work together.'],
  ['Engineering', 'Core Web Vitals for people who sell real things', 'A plain-language route from a slow page to a faster experience without automatically replacing the whole stack.'],
  ['Design', 'Trust signals that make a considered choice feel safer', 'Reviews, proof, credentials, process and the order they should appear on a high-consideration page.'],
  ['SEO', 'What AI search means for local discovery', 'Where the clicks may move, and why being the clearest answer still matters across Indian markets.'],
  ['Engineering', 'WordPress, Astro or headless: an honest decision tree', 'Choose the stack around the team, the content and the operating need, not the trend cycle.'],
  ['Local SEO', 'Review harvesting without begging', 'A respectful follow-up system that turns a good customer experience into useful, permission-based proof.'],
];

export default function InsightsPage() {
  return <main id="main-content">
     <section className="page-hero"><div className="container"><p className="eyebrow">Field notes / India <span className="eyebrow-status"><i /> fresh thinking</span></p><h1 className="display">The work behind the <em>work.</em></h1><p className="lead">Practical notes on building digital systems for Indian businesses, written from the problems teams actually bring to the table.</p><div className="signal-list" aria-label="Insight categories"><span>Growth</span><span>AI</span><span>Design</span><span>SEO</span><span>Local discovery</span><span>Engineering</span></div></div></section>
    <section className="section"><div className="container"><div className="section-heading"><p className="eyebrow">The thinking</p><h2>Useful thinking, before the pitch.</h2><p>Practical notes on growth, design, AI and local discovery, shaped by the questions Indian teams bring to their next stage.</p></div><div className="insight-grid">{notes.map(([category, title, text], index) => <article className="card insight-card" key={title}><div className="insight-meta"><span>0{index + 1}</span><span>{category}</span></div><h3>{title}</h3><p>{text}</p><span className="insight-status">Field note</span></article>)}</div></div></section>
    <section className="section dark-band"><div className="container split"><div className="section-heading" style={{ marginBottom: 0 }}><p className="eyebrow">Do not wait for the essay</p><h2>Everything here starts with work we already do.</h2><p>Skip the reading list when the business needs a clearer next step. Bring the question, the bottleneck or the messy system.</p></div><div className="cta-panel"><p className="eyebrow">Put it to work</p><h2>Talk to the team.</h2><Link className="button button-primary" href="/contact">Start a conversation <Icon name="arrowUpRight" size={17} /></Link></div></div></section>
  </main>;
}
