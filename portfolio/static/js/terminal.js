/** Terminal interativo. Só executa comandos de uma lista fechada (nunca eval). */
import { $, h } from "./dom.js";
import { DATA } from "./data.js";
import { t, loc } from "./i18n.js";

/** Tira acento, põe minúsculas e remove ".txt" e "/" para aceitar "Experiência", "sobre.txt", "projetos/"... */
const norm = (s) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\.txt$|\/$/g, "");

/** Nome digitado -> id da seção. Aceita vários idiomas. */
const ROTAS = {
  sobre: "sobre",
  about: "sobre",
  projetos: "trabalho",
  projects: "trabalho",
  proyectos: "trabalho",
  projets: "trabalho",
  prosjekter: "trabalho",
  trabalho: "trabalho",
  work: "trabalho",
  arsenal: "arsenal",
  stack: "arsenal",
  experiencia: "trajetoria",
  experience: "trajetoria",
  trajetoria: "trajetoria",
  career: "trajetoria",
  certs: "trajetoria",
  certificacoes: "trajetoria",
  contato: "contato",
  contact: "contato",
  contacto: "contato",
  kontakt: "contato",
};
const SECOES = ["sobre", "projetos", "arsenal", "experiencia", "contato"];

/** Procura a seção só entre as chaves da lista (Object.hasOwn evita pegadinhas como "constructor"). */
const rota = (nome) => {
  const k = norm(nome || "");
  return Object.hasOwn(ROTAS, k) ? ROTAS[k] : null;
};

const say = (s) => {
  const log = $("log");
  if (!log) return;
  log.append(h("div", s));
  log.scrollTop = log.scrollHeight;
};

/** Rola até a seção e confirma. Devolve null se o nome não existir. */
function ir(nome) {
  const id = rota(nome);
  if (!id) return null;
  $(id).scrollIntoView();
  return "→ " + norm(nome);
}

/** Demonstração de criptografia no navegador (RSA-OAEP). */
async function lock(msg) {
  /* E2E demo: cifra no navegador com RSA-OAEP; no backend real a chave pública vem do servidor */
  const k = await crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    false,
    ["encrypt"],
  );
  const c = await crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    k.publicKey,
    new TextEncoder().encode(msg.slice(0, 100)),
  );
  return btoa(String.fromCharCode(...new Uint8Array(c))).slice(0, 56) + "…";
}

const CMD = {
  help: () => t("help"),
  ls: (a) => {
    const k = norm(a || "");
    if (rota(k) === "trabalho")
      return DATA.projects.map((p) => "• " + loc(p.n)).join("\n");
    if (k.startsWith("cert")) return DATA.certs.map((c) => "✓ " + c).join("\n");
    return SECOES.map((s) => s + "/").join("  ");
  },
  cd: (a) =>
    !a || a === "~" || a === ".."
      ? ($("top").scrollIntoView(), "→ ~")
      : (ir(a) ?? "cd: " + a),
  cat: (a) => ir(a) ?? "cat: " + (a || "?"),
  open: (a) => ir(a) ?? "open: " + (a || "?"),
  clear: () => ($("log").replaceChildren(), ""),
  theme: () => {
    const r = document.documentElement;
    r.dataset.theme = r.dataset.theme === "light" ? "dark" : "light";
    return "theme: " + r.dataset.theme;
  },
  send: async (a) => (a ? t("enc") + " " + (await lock(a)) : t("usage")),
};

/** Executa uma linha digitada. Também aceita só o nome da seção (ex.: "projetos"). */
export async function run(line) {
  const [c, ...r] = line.trim().split(/\s+/);
  if (!c) return;
  say("$ " + line.slice(0, 120));
  const nome = c.toLowerCase();
  const f = Object.hasOwn(CMD, nome) ? CMD[nome] : rota(c) ? () => ir(c) : null;
  const out = f ? await f(r.join(" ")) : t("nf") + c.slice(0, 30);
  if (out) say(out);
}
