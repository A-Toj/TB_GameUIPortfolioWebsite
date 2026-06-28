// Minimalist line icons (24x24 grid, stroke = currentColor) used inside the
// skill-tree nodes. Each value is raw inner SVG markup so it can be injected
// into an <svg> via dangerouslySetInnerHTML (React) or innerHTML (preview).
export const ICONS: Record<string, string> = {
  shield:
    '<path d="M12 3 19 6v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"/>',
  "shield-check":
    '<path d="M12 3 19 6v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"/><path d="M9 11.5l2 2 4-4"/>',
  search:
    '<circle cx="11" cy="11" r="6"/><line x1="15.5" y1="15.5" x2="20" y2="20"/>',
  lock:
    '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  code:
    '<path d="M9 8 5 12l4 4"/><path d="M15 8l4 4-4 4"/>',
  atom:
    '<circle cx="12" cy="12" r="1.6" fill="currentColor"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/>',
  database:
    '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6"/><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/>',
  fileCode:
    '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M10.5 12 9 14l1.5 2"/><path d="M13.5 12 15 14l-1.5 2"/>',
  hexagon:
    '<path d="M12 3l7.5 4.3v9.4L12 21l-7.5-4.3V7.3z"/>',
  coffee:
    '<path d="M5 8h11v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z"/><path d="M16 9h2.5a2 2 0 0 1 0 4H16"/><line x1="8" y1="3" x2="8" y2="5.5"/><line x1="12" y1="3" x2="12" y2="5.5"/>',
  plug:
    '<path d="M9 3v5"/><path d="M15 3v5"/><path d="M7 8h10v3a5 5 0 0 1-10 0z"/><path d="M12 16v5"/>',
  devices:
    '<rect x="3" y="5" width="13" height="9" rx="1"/><rect x="14" y="10" width="7" height="9" rx="1"/>',
  layers:
    '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
  rocket:
    '<path d="M12 3c3 2 4.5 5 4.5 9L14 14.5h-4L7.5 12c0-4 1.5-7 4.5-9z"/><circle cx="12" cy="9" r="1.5"/><path d="M10 14.5 8 19l2.5-1"/><path d="M14 14.5 16 19l-2.5-1"/>',
  terminal:
    '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3"/><line x1="12" y1="15" x2="16" y2="15"/>',
  containers:
    '<path d="M3 8 6 5h12l3 3"/><rect x="3" y="8" width="18" height="9" rx="1"/><line x1="9" y1="8" x2="9" y2="17"/><line x1="15" y1="8" x2="15" y2="17"/>',
  cube:
    '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5 12 12l8-4.5"/><path d="M12 12v9"/>',
  server:
    '<rect x="4" y="4" width="16" height="7" rx="1"/><rect x="4" y="13" width="16" height="7" rx="1"/><circle cx="7.5" cy="7.5" r="0.8" fill="currentColor"/><circle cx="7.5" cy="16.5" r="0.8" fill="currentColor"/>',
  cloud:
    '<path d="M7.5 18a4 4 0 0 1-.5-8 5 5 0 0 1 9.6-1A3.5 3.5 0 0 1 16.5 18z"/>',
  box:
    '<rect x="4" y="7" width="16" height="13" rx="1"/><path d="M4 11h16"/><path d="M9.5 7V4h5v3"/>',
  headset:
    '<path d="M5 13v-1a7 7 0 0 1 14 0v1"/><rect x="3" y="13" width="4" height="6" rx="1.5"/><rect x="17" y="13" width="4" height="6" rx="1.5"/><path d="M19 19a3 3 0 0 1-3 3h-3"/>',
  cpu:
    '<rect x="7" y="7" width="10" height="10" rx="1"/><rect x="10" y="10" width="4" height="4"/><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4"/>',
  network:
    '<circle cx="12" cy="5" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><path d="M12 7v3M11 11l-5 5M13 11l5 5"/>',
  wrench:
    '<path d="M16 5a3.5 3.5 0 0 0-4.6 4.6L4 17l-1 4 4-1 7.4-7.4A3.5 3.5 0 0 0 19 8l-2.6 2.6-2.9-2.9z"/>',
  award:
    '<circle cx="12" cy="9" r="5"/><path d="M9 13.5 7.5 21 12 18.5 16.5 21 15 13.5"/>',
  // brand-evocative lettermarks / silhouettes
  python:
    '<path d="M7.5 8c0-2.2 1.8-3.6 4-3.6 2.1 0 3.4 1.1 3.4 2.5C14.9 8.2 13.7 9 11.7 9H9a3 3 0 0 0 0 6h3.3a3 3 0 0 1 0 6c-2.2 0-4-1.4-4-3.6"/><circle cx="9.6" cy="6.7" r="0.75" fill="currentColor"/>',
  js:
    '<rect x="3.5" y="3.5" width="17" height="17" rx="3.5"/><path d="M14 8.5v6a2.4 2.4 0 0 1-4.8 0"/>',
  ts:
    '<rect x="3.5" y="3.5" width="17" height="17" rx="3.5"/><path d="M7.5 9h9"/><path d="M12 9v7.5"/>',
  key:
    '<circle cx="8" cy="14" r="3.5"/><path d="M10.5 11.5 19 3"/><path d="M16 6l2.6 2.6"/><path d="M13.8 8.2 16 10.4"/>',
};
