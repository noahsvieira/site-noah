import {$, h, add} from "./dom.js";

"use strict";
/* ============ 1. DADOS — o ÚNICO lugar que eu edito ============
   Para adicionar projeto/certificado/experiência: copiar uma linha e mudar o texto. */
const DATA = {
  name: "Noah S. Vieira", github: "#", linkedin: "#", mail: "mailto:voce@exemplo.com",
  stack: ["REST API", "APPSEC", "DEV BACK-END", "CIBERSEGURANÇA", "AUTOMATION", "PYTHON", "JAVA", "FASTAPI", "SQL", "LINUX"],
  arsenal: [["Backend", "Python · Java · FastAPI · APIs RESTful"], ["Dados + IA", "SQL · Ciência de Dados · Machine Learning"], ["Segurança", "Pentest · SOC · Active Directory · OWASP"], ["Sistemas", "Linux · Git · Automação · Redes"]],
  projects: [
    {
      t: "Backend / Integrações",
      n: { pt: "API de Recarga e Pagamentos", en: "Top-up & Payments API" },
      d: {
        pt: "API REST em Python e FastAPI a partir de uma demanda real, reproduzindo um cenário de integração para recarga de celular e pagamento de contas.",
        en: "REST API in Python and FastAPI built from a real request, reproducing an integration scenario for mobile top-up and bill payments."
      },
      tags: ["Python", "FastAPI", "REST", "Integrações"],
      url: "#"
    },
    {
      t: "Backend / Cybersecurity",
      n: { pt: "Secure Mail Gateway", en: "Secure Mail Gateway" },
      d: {
        pt: "Gateway de e-mail seguro em Python e FastAPI para mitigar vulnerabilidades em comunicações corporativas.",
        en: "Secure e-mail gateway in Python and FastAPI to mitigate vulnerabilities in corporate communications."
      },
      tags: ["Python", "FastAPI", "AppSec", "E-mail"],
      url: "#"
    },
    {
      t: "Backend / Dados",
      n: "Meu novo projeto",
      d: "Descrição em português.",
      tags: ["Python", "SQL"],
      url: "#"
    }
  ],
  career: [["2024 — Atual", "Desenvolvedor Backend", { pt: "Soluções server-side, APIs RESTful e automação de processos com Python e Java.", en: "Server-side solutions, RESTful APIs and process automation with Python and Java." }],
  ["2023 — Atual", "Segurança ofensiva e defensiva", { pt: "Laboratórios práticos em Hack The Box, TryHackMe, PortSwigger e Blue Team Labs.", en: "Hands-on labs on Hack The Box, TryHackMe, PortSwigger and Blue Team Labs." }],
  ["2022 — 2024", "Desenvolvedor Front-end", { pt: "Interfaces responsivas com foco em usabilidade e integração com serviços back-end.", en: "Responsive interfaces focused on usability and back-end integration." }]],
  edu: [["2025 — 2026", "Segurança Cibernética e Defesa Contra Ameaças", "UNOPAR · Pós-graduação"], ["2025", "Ciência de Dados e Inteligência Artificial", "Anhanguera Educacional · Pós-graduação"]],
  certs: ["Web Fundamentals — TryHackMe"]
};

/* ============ 2. Textos por idioma (FR/NO caem para EN até serem traduzidos) ============ */
const T = {
  pt: {
    n1: "Sobre", n2: "Trabalho", n3: "Contato", ready: "sistema pronto", acc: "ACESSO LIBERADO", hint: "// Digite “hi” para iniciar", exec: "[executar]",
    tag: "Backend · Segurança · Dados + IA", h1: "Backend direto ao ponto.", lead: "Desenvolvo, testo e automatizo com Python, Java, SQL, JavaScript, APIs e Linux. Formação em cibersegurança, ciência de dados e IA — com foco atual em Backend.",
    c1: "Ver o que faço ↓", c2: "Falar comigo", foco: "Foco", base: "Base", abo: "Abordagem", v1: "Backend", v2: "Segurança", v3: "Prático", ok: "perfil carregado com sucesso", ph: "tente: ls, cd projetos, cat sobre.txt ou help",
    s1: "01 / Como eu opero", h2a: "Desenvolvo, testo e automatizo.", p2: "Experiência prática com Python, Java, SQL, JavaScript, APIs e Linux aplicada ao desenvolvimento de sistemas, automação e análise de ambientes. Gosto de entender sistemas de ponta a ponta, encontrar problemas e construir soluções.",
    st: [["Mapear", "Entendo o fluxo completo, as dependências e onde o problema realmente começa."], ["Investigar", "Testo hipóteses com código, logs, dados e uma visão de segurança ofensiva e defensiva."], ["Construir", "Entrego código limpo, curto, documentado e coberto por testes."], ["Proteger", "Autenticação, validação e criptografia desde o primeiro commit."]],
    s2: "02 / Trabalho", h2b: "Projetos selecionados", code: "ver código ↗", s3: "03 / Arsenal", h2c: "Ferramentas são meios. Resolver é o trabalho.",
    s4: "04 / Trajetória", h2d: "Experiência e formação", log: "~/carreira/experiência.log", edu: "cat formação.txt", cert: "ls ./certificações --destaque",
    h2e: "Tem um problema difícil?", p5: "Ótimo. Conte-me o que precisa funcionar.", go: "iniciar conversa ↗", top: "Voltar ao topo ↑",
    help: "comandos: ls · cd <seção> · cat sobre.txt · send <mensagem> · theme · clear", nf: "comando não encontrado: ", usage: "uso: send <mensagem>", enc: "cifrado no seu navegador (RSA-OAEP) — só a chave privada do dono lê:"
  },
  en: {
    n1: "About", n2: "Work", n3: "Contact", ready: "system ready", acc: "ACCESS GRANTED", hint: "// Type “hi” to start", exec: "[run]",
    tag: "Backend · Security · Data + AI", h1: "Backend, straight to the point.", lead: "I build, test and automate with Python, Java, SQL, JavaScript, APIs and Linux. Trained in cybersecurity, data science and AI — currently focused on Backend.",
    c1: "See what I do ↓", c2: "Talk to me", foco: "Focus", base: "Base", abo: "Approach", v1: "Backend", v2: "Security", v3: "Hands-on", ok: "profile loaded successfully", ph: "try: ls, cd projects, cat about.txt or help",
    s1: "01 / How I work", h2a: "I build, test and automate.", p2: "Hands-on experience with Python, Java, SQL, JavaScript, APIs and Linux applied to systems development, automation and environment analysis. I like understanding systems end to end, finding problems and building solutions.",
    st: [["Map", "I understand the full flow, the dependencies and where the problem really starts."], ["Investigate", "I test hypotheses with code, logs, data and an offensive and defensive security view."], ["Build", "I ship clean, short, documented code covered by tests."], ["Protect", "Authentication, validation and encryption from the first commit."]],
    s2: "02 / Work", h2b: "Selected projects", code: "view code ↗", s3: "03 / Arsenal", h2c: "Tools are means. Solving is the job.",
    s4: "04 / Path", h2d: "Experience and education", log: "~/career/experience.log", edu: "cat education.txt", cert: "ls ./certifications --featured",
    h2e: "Got a hard problem?", p5: "Great. Tell me what needs to work.", go: "start a conversation ↗", top: "Back to top ↑",
    help: "commands: ls · cd <section> · cat about.txt · send <message> · theme · clear", nf: "command not found: ", usage: "usage: send <message>", enc: "encrypted in your browser (RSA-OAEP) — only the owner’s private key reads it:"
  },
  fr: {
    n1: "À propos", n2: "Travail", n3: "Contact", ready: "système prêt", acc: "ACCÈS AUTORISÉ", hint: "// Tapez « hi » pour démarrer", exec: "[exécuter]",
    tag: "Backend · Sécurité · Données + IA", h1: "Backend, droit au but.", lead: "Je développe, teste et automatise avec Python, Java, SQL, JavaScript, des API et Linux. Formé en cybersécurité, data science et IA — actuellement orienté Backend.",
    c1: "Voir ce que je fais ↓", c2: "Me contacter", foco: "Focus", base: "Base", abo: "Approche", v1: "Backend", v2: "Sécurité", v3: "Pratique", ok: "profil chargé avec succès", ph: "essayez : ls, cd projects, cat about.txt ou help",
    s1: "01 / Ma méthode", h2a: "Je développe, teste et automatise.", p2: "Expérience pratique de Python, Java, SQL, JavaScript, des API et de Linux, appliquée au développement de systèmes, à l’automatisation et à l’analyse d’environnements. J’aime comprendre les systèmes de bout en bout, trouver les problèmes et construire des solutions.",
    st: [["Cartographier", "Je comprends le flux complet, les dépendances et l’endroit où le problème commence vraiment."], ["Enquêter", "Je teste des hypothèses avec du code, des logs, des données et une vision de sécurité offensive et défensive."], ["Construire", "Je livre du code propre, court, documenté et couvert par des tests."], ["Protéger", "Authentification, validation et chiffrement dès le premier commit."]],
    s2: "02 / Travail", h2b: "Projets sélectionnés", code: "voir le code ↗", s3: "03 / Arsenal", h2c: "Les outils sont des moyens. Résoudre est le travail.",
    s4: "04 / Parcours", h2d: "Expérience et formation", log: "~/carriere/experience.log", edu: "cat formation.txt", cert: "ls ./certifications --en-avant",
    h2e: "Un problème difficile ?", p5: "Parfait. Dites-moi ce qui doit fonctionner.", go: "démarrer la conversation ↗", top: "Retour en haut ↑",
    help: "commandes : ls · cd <section> · cat about.txt · send <message> · theme · clear", nf: "commande introuvable : ", usage: "usage : send <message>", enc: "chiffré dans votre navigateur (RSA-OAEP) — seule la clé privée du propriétaire le lit :"
  },
  no: {
    n1: "Om meg", n2: "Arbeid", n3: "Kontakt", ready: "system klart", acc: "TILGANG GITT", hint: "// Skriv «hi» for å starte", exec: "[kjør]",
    tag: "Backend · Sikkerhet · Data + KI", h1: "Backend, rett på sak.", lead: "Jeg utvikler, tester og automatiserer med Python, Java, SQL, JavaScript, API-er og Linux. Utdannet innen cybersikkerhet, datavitenskap og KI – med fokus på backend.",
    c1: "Se hva jeg gjør ↓", c2: "Snakk med meg", foco: "Fokus", base: "Grunnlag", abo: "Tilnærming", v1: "Backend", v2: "Sikkerhet", v3: "Praktisk", ok: "profil lastet inn", ph: "prøv: ls, cd projects, cat about.txt eller help",
    s1: "01 / Slik jobber jeg", h2a: "Jeg utvikler, tester og automatiserer.", p2: "Praktisk erfaring med Python, Java, SQL, JavaScript, API-er og Linux, brukt i systemutvikling, automatisering og analyse av miljøer. Jeg liker å forstå systemer fra ende til annen, finne problemer og bygge løsninger.",
    st: [["Kartlegge", "Jeg forstår hele flyten, avhengighetene og hvor problemet egentlig begynner."], ["Undersøke", "Jeg tester hypoteser med kode, logger, data og et offensivt og defensivt sikkerhetsblikk."], ["Bygge", "Jeg leverer ren, kort og dokumentert kode som er dekket av tester."], ["Beskytte", "Autentisering, validering og kryptering fra første commit."]],
    s2: "02 / Arbeid", h2b: "Utvalgte prosjekter", code: "se koden ↗", s3: "03 / Arsenal", h2c: "Verktøy er midler. Å løse er jobben.",
    s4: "04 / Veien hit", h2d: "Erfaring og utdanning", log: "~/karriere/erfaring.log", edu: "cat utdanning.txt", cert: "ls ./sertifiseringer --utvalgt",
    h2e: "Har du et vanskelig problem?", p5: "Flott. Fortell meg hva som må fungere.", go: "start en samtale ↗", top: "Tilbake til toppen ↑",
    help: "kommandoer: ls · cd <seksjon> · cat about.txt · send <melding> · theme · clear", nf: "kommando ikke funnet: ", usage: "bruk: send <melding>", enc: "kryptert i nettleseren din (RSA-OAEP) – bare eierens private nøkkel kan lese den:"
  }
};
let lang = "pt";
const t = k => (T[lang] && T[lang][k]) ?? T.en[k];
const loc = o => (typeof o === "string" ? o : (o[lang] ?? o.en ?? o.pt));

/* ============ 3. Helpers seguros: textContent nunca interpreta HTML (anti-XSS) ============ */
const $ = id => document.getElementById(id);
const h = (tag, txt, cls, at = {}) => { const e = document.createElement(tag); if (txt != null) e.textContent = txt; if (cls) e.className = cls; Object.entries(at).forEach(([k, v]) => e.setAttribute(k, v)); return e; };
const add = (p, ...c) => (p.append(...c), p);

/* ============ 4. Monta o site a partir dos dados ============ */
function build() {
  const app = $("app"); app.replaceChildren();
  const W = (id, ...c) => { const s = h("section", null, "w rv", id ? { id } : {}); add(s, ...c); app.append(s); return s; };
  const head = (tg, ti) => [h("div", t(tg), "tag"), h("h2", t(ti))];
  /* hero */
  const side = add(h("div"), add(h("div", "me = Person()\nwhile me.awake():\n    me.CODE()", "code"), h("span", null, "cur")), ...[["foco", "v1", ""], ["base", "v2", ""], ["abo", "v3", "g"]].map(([a, b, c]) => add(h("div", null, "kv"), t(a), h("b", t(b), c))));
  const hero = h("div", null, "hero"); add(hero, add(h("div"), h("div", t("tag"), "tag"), h("h1", t("h1")), h("p", t("lead"), "lead"),
    add(h("div", null, "btns"), h("a", t("c1"), "btn p", { href: "#trabalho" }), h("a", t("c2"), "btn", { href: "#contato" }))), side);
  const top = h("div", null, "w", { id: "top" }); top.append(hero); app.append(top);
  /* terminal inline */
  const tb = h("div", null, "tbar"), box = h("div", null, "w");
  const form = h("form", null, "tbox row", { autocomplete: "off" }); const inp = h("input", null, null, { placeholder: t("ph"), maxlength: 120, "aria-label": "terminal" });
  add(form, h("b", "visitor@noah:~$"), add(h("span", null, "cw"), inp, h("span", null, "cur", { "aria-hidden": "true" })), h("span", "[enter]"));
  add(box, add(h("div", null, "row"), h("span", t("ok"), "pulse tag"), form), h("div", null, null, { id: "log" }),
    add(h("div", null, "qs"), ...[["sobre", "sobre"], ["experiência", "trajetoria"], ["projetos", "trabalho"], ["contato", "contato"]].map(([l, id]) => { const b = h("button", l); b.prepend(h("span", "$ ")); b.onclick = () => $(id).scrollIntoView(); return b; })));
  tb.append(box); app.append(tb); form.onsubmit = e => { e.preventDefault(); run(inp.value); inp.value = ""; };
  const tick = h("div", null, "tick"), tr = h("div", DATA.stack.concat(DATA.stack, DATA.stack, DATA.stack).map(s => s + " / ").join(" ")); tick.append(tr); app.append(tick);
  /* 01 como eu opero */
  const st = add(h("div"), h("p", t("p2"), "lead", { style: "font-size:22px;max-width:none" }), ...t("st").map(([a, b], i) => add(h("div", null, "step"), h("span", "0" + (i + 1)), h("h4", a), h("p", b))));
  W("sobre", add(h("div", null, "two"), add(h("div"), h("div", t("s1"), "tag"), h("h2", t("h2a"))), st));
  /* 02 trabalho */
  W("trabalho", ...head("s2", "h2b"), ...DATA.projects.map((p, i) => {
    const c = h("article", null, "proj"), body = h("div"), top2 = add(h("div", null, "top"), h("span", p.t, "tag"), h("a", t("code"), null, { href: p.url, rel: "noopener noreferrer" }));
    add(body, top2, h("h3", loc(p.n)), h("p", loc(p.d)), ...p.tags.map(x => h("span", x, "chip")));
    return add(c, h("span", "0" + (i + 1), null, { style: "color:var(--dim)" }), body);
  }));
  /* 03 arsenal */
  W("arsenal", ...head("s3", "h2c"), ...DATA.arsenal.map(([a, b], i) => add(h("div", null, "ars"), h("b", "0" + (i + 1)), h("b", a), h("span", b))));
  /* 04 trajetória */
  const l1 = add(h("div", null, "panel"), h("span", t("log"), "tag"), ...DATA.career.map(([d, ti, ds]) => add(h("div", null, "ev"), h("span", d), add(h("div"), h("h4", ti), h("p", loc(ds))))));
  const l2 = add(h("div"), add(h("div", null, "panel"), h("span", t("edu"), "tag"), ...DATA.edu.map(([d, ti, s]) => add(h("div", null, "ev"), h("span", d), add(h("div"), h("h4", ti), h("p", s))))),
    add(h("div", null, "panel"), h("span", t("cert"), "tag"), ...DATA.certs.map(c => h("div", "✓ " + c))));
  W("trajetoria", ...head("s4", "h2d"), add(h("div", null, "two", { style: "margin-top:32px" }), l1, l2));
  /* contato */
  const go = h("button", t("go"), "cta"); go.onclick = () => { inp.value = "send "; inp.focus(); top.scrollIntoView(); };
  const link = (x, u) => h("a", x + " ↗", null, { href: u, rel: "noopener noreferrer", style: "margin-right:24px;font-size:12px;letter-spacing:.1em" });
  W("contato", h("h2", t("h2e")), h("p", t("p5"), "lead"), go, add(h("div"), link("GITHUB", DATA.github), link("LINKEDIN", DATA.linkedin), link("E-MAIL", DATA.mail)),
    add(h("footer"), h("span", "© 2026 · " + DATA.name), (() => { const a = h("a", t("top"), null, { href: "#top" }); return a; })()));
  document.querySelectorAll("[data-k]").forEach(e => e.textContent = t(e.dataset.k));
  document.documentElement.lang = { pt: "pt-BR", en: "en" }[lang] || lang;
  reveal();
}

/* ============ 5. Terminal: dicionário de comandos (allowlist — nunca eval) ============ */
const log = () => $("log"), say = s => { const l = log(); if (!l) return; l.append(h("div", s)); l.scrollTop = l.scrollHeight; };
const ROUTES = { sobre: "sobre", projetos: "trabalho", projects: "trabalho", contato: "contato", contact: "contato", arsenal: "arsenal", experiencia: "trajetoria", "experiência": "trajetoria" };
async function lock(msg) { /* E2E demo: cifra no navegador com RSA-OAEP; no backend real a chave pública vem do servidor */
  const k = await crypto.subtle.generateKey({ name: "RSA-OAEP", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" }, false, ["encrypt"]);
  const c = await crypto.subtle.encrypt({ name: "RSA-OAEP" }, k.publicKey, new TextEncoder().encode(msg.slice(0, 100)));
  return btoa(String.fromCharCode(...new Uint8Array(c))).slice(0, 56) + "…";
}
const CMD = {
  help: () => t("help"),
  ls: () => Object.keys(ROUTES).filter(k => !/[ê]|projects|contact$/.test(k)).join("  "),
  cd: a => ROUTES[(a || "").toLowerCase()] ? ($(ROUTES[a.toLowerCase()]).scrollIntoView(), "→ " + a) : "cd: " + (a || "?"),
  cat: a => /^(sobre|about)\.txt$/i.test(a) ? t("lead") : "cat: " + (a || "?"),
  clear: () => (log().replaceChildren(), ""),
  theme: () => { const r = document.documentElement; r.dataset.theme = r.dataset.theme === "light" ? "dark" : "light"; return "theme: " + r.dataset.theme; },
  send: async a => a ? t("enc") + " " + await lock(a) : t("usage")
};
async function run(line) {
  const [c, ...r] = line.trim().split(/\s+/); if (!c) return;
  say("$ " + line.slice(0, 120));
  const f = Object.hasOwn(CMD, c.toLowerCase()) ? CMD[c.toLowerCase()] : null;
  const out = f ? await f(r.join(" ")) : t("nf") + c.slice(0, 30); if (out) say(out);
}

/* ============ 6. Chuva de código (canvas) ============ */
const cv = $("rain"), cx = cv.getContext("2d"), chars = "01{}[]<>/=+*#$%&;:ABCDEF";
let drops = [];
const size = () => { cv.width = innerWidth; cv.height = innerHeight; drops = Array.from({ length: Math.ceil(innerWidth / 16) }, () => Math.random() * -50); };
function rain() {
  const cs = getComputedStyle(document.documentElement);
  cx.globalAlpha = .08; cx.fillStyle = cs.getPropertyValue("--bg"); cx.fillRect(0, 0, cv.width, cv.height);
  cx.globalAlpha = 1; cx.fillStyle = cs.getPropertyValue("--ac"); cx.font = "14px monospace";
  drops.forEach((y, i) => { cx.fillText(chars[Math.random() * chars.length | 0], i * 16, y * 16); drops[i] = y * 16 > cv.height && Math.random() > .975 ? 0 : y + 1; });
}
size(); addEventListener("resize", size);
if (matchMedia("(prefers-reduced-motion: reduce)").matches) for (let i = 0; i < 40; i++) rain(); else setInterval(rain, 50);

/* ============ 7. Animação de entrada ao rolar (reveal) ============ */
function reveal() {
  const els = document.querySelectorAll("#app .rv");
  if (!("IntersectionObserver" in window)) return els.forEach(e => e.classList.add("vis"));
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("vis"); io.unobserve(e.target); } }), { threshold: .1 });
  els.forEach(e => io.observe(e));
}

/* ============ 8. Idiomas, portão "hi" e arranque ============ */
document.querySelectorAll(".lang").forEach(box => ["PT", "EN", "FR", "NO"].forEach(c => {
  const b = h("button", c, null, { "aria-pressed": c === "PT" }); b.onclick = () => { lang = c.toLowerCase(); document.querySelectorAll(".lang button").forEach(x => x.setAttribute("aria-pressed", x.textContent === c)); if (document.body.classList.contains("in")) build(); document.querySelectorAll("[data-k]").forEach(e => e.textContent = t(e.dataset.k)); };
  box.append(b);
}));
$("date").textContent = new Date().toDateString();
document.querySelectorAll("[data-k]").forEach(e => e.textContent = t(e.dataset.k));
$("gate").addEventListener("submit", e => {
  e.preventDefault();
  if ($("gin").value.trim().toLowerCase() !== "hi") { $("gin").value = ""; $("gin").placeholder = "?"; return; }
  if (document.body.classList.contains("acc")) return;
  /* Cena "ACESSO LIBERADO": chuva total + texto digitando, depois revela o portfólio */
  const msg = t("acc"), calm = matchMedia("(prefers-reduced-motion: reduce)").matches; let i = 0;
  document.body.classList.add("acc"); $("gin").blur();
  const ty = setInterval(() => { $("typed").textContent = msg.slice(0, ++i); if (i >= msg.length) clearInterval(ty); }, calm ? 0 : 85);
  setTimeout(() => { build(); document.body.classList.replace("acc", "in"); scrollTo(0, 0); }, calm ? 400 : 3300);
});