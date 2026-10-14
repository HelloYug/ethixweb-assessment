export function Icon({ name, size = 20, strokeWidth = 1.7, className = '' }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round', className, 'aria-hidden': 'true' };
  const paths = {
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
    spark: <><path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z" /><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" /></>,
    arrow: <><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></>,
    arrowUpRight: <><path d="M5 19 19 5" /><path d="M8 5h11v11" /></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5" /><path d="m3 16 9 5 9-5" /></>,
    bot: <><rect x="4" y="7" width="16" height="13" rx="3" /><path d="M12 3v4M8 12h.01M16 12h.01M8 16h8" /></>,
    chart: <><path d="M4 19V5" /><path d="M4 19h16" /><path d="m7 15 3-4 3 2 5-6" /><path d="M18 7h2v2" /></>,
    users: <><path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20" /><circle cx="10" cy="8" r="3" /><path d="M16 11a3 3 0 1 0 0-6M17 15h1a3 3 0 0 1 3 3v2" /></>,
    code: <><path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14" /></>,
    shield: <><path d="M12 3 20 6v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    mouse: <><rect x="7" y="3" width="10" height="18" rx="5" /><path d="M12 3v5" /></>,
    phone: <><path d="M7.5 3.5h2.2l1.3 4.1-1.8 1.8a15.8 15.8 0 0 0 5.4 5.4l1.8-1.8 4.1 1.3v2.2a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 5.5 5.7a2 2 0 0 1 2-2.2Z" /></>,
    trend: <><path d="M4 17 10 11l4 4 6-8" /><path d="M15 7h5v5" /></>,
    palette: <><path d="M12 3a9 9 0 0 0 0 18h1.4a1.6 1.6 0 0 0 1.1-2.7l-.8-.8a1.6 1.6 0 0 1 1.1-2.7h2.2A3.9 3.9 0 0 0 21 11C20.5 6.5 16.7 3 12 3Z" /><circle cx="7.5" cy="10" r=".7" fill="currentColor" /><circle cx="10" cy="7" r=".7" fill="currentColor" /><circle cx="14" cy="7" r=".7" fill="currentColor" /><circle cx="17" cy="10" r=".7" fill="currentColor" /></>,
    dollar: <><path d="M12 2v20M16.5 6.5C15.6 5.5 14.1 5 12.5 5 10 5 8 6.3 8 8.3c0 2.3 2.2 3.1 4.5 3.7s4.5 1.4 4.5 3.7c0 2-2 3.3-4.5 3.3-1.7 0-3.3-.6-4.3-1.7" /></>,
  };
  return <svg {...common}>{paths[name] || paths.spark}</svg>;
}

