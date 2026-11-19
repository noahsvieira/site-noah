/** Helpers de DOM seguros: textContent nunca interpreta HTML (anti-XSS). */
export const $ = id => document.getElementById(id);
export const h = (tag, txt, cls, at = {}) => {const e = document.createElement(tag); if (txt != null) e.textContent = txt; if (cls) e.className = cls; Object.entries(at).forEach(([k, v]) => e.setAttribute(k, v)); return e;};
export const add = (p, ...c) => (p.append(...c), p);
/** Cria um elemento SVG (ícones desenhados no código, sem imagens externas). */
export const svg = (tag, at = {}) => {const e = document.createElementNS("http://www.w3.org/2000/svg", tag); Object.entries(at).forEach(([k, v]) => e.setAttribute(k, v)); return e;};
