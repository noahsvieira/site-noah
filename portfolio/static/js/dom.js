export const $ = id => document.getElementById(id);
export const h = (tag, txt, cls, at = {}) => { const e = document.createElement(tag); if (txt != null) e.textContent = txt; if (cls) e.className = cls; Object.entries(at).forEach(([k, v]) => e.setAttribute(k, v)); return e; };
export const add = (p, ...c) => (p.append(...c), p);