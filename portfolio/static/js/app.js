
import {$, h} from "./dom.js";
import {state, t} from "./i18n.js";
import {build} from "./view.js";
import {initRain} from "./chuva.js";
import {ligarIdiomas, marcarIdioma} from "./idiomas.js";
import {ligarSubir, atualizarSubir} from "./subir.js";

const CALM = matchMedia("(prefers-reduced-motion: reduce)").matches;
const aberto = () => document.body.classList.contains("in");

/**  elementos com data-k o texto do idioma atual. */
function traduzir() {
  document.documentElement.lang = ({pt: "pt-BR"})[state.lang] ?? state.lang;
  document.querySelectorAll("[data-k]").forEach(e => (e.textContent = t(e.dataset.k)));
  marcarIdioma();
  atualizarSubir();
}

/** Troca o idioma em todo o site e lembra a escolha deste visitante. */
function trocarIdioma(codigo) {
  state.lang = codigo;
  try { localStorage.setItem("lang", codigo); } catch { /* navegação privada: sem problema */ }
  if (aberto()) build();
  traduzir();
}

let digitando = null, esperando = null;

/** Revela o portfólio. Usado pela cena de acesso e também pelo "pular". */
function entrar() {
  clearInterval(digitando);
  clearTimeout(esperando);
  build();
  document.body.classList.remove("acc");
  document.body.classList.add("in");
  scrollTo(0, 0);
}

/** Cena "ACESSO LIBERADO": chuva total + texto digitando; depois revela o portfólio. */
function acessoLiberado() {
  const msg = t("acc");
  let i = 0;
  document.body.classList.add("acc");
  $("gin").blur();
  digitando = setInterval(() => {
    $("typed").textContent = msg.slice(0, ++i);
    if (i >= msg.length) clearInterval(digitando);
  }, CALM ? 0 : 85);
  esperando = setTimeout(entrar, CALM ? 400 : 3300);
}

/** Botão "pular" (e tecla Esc) */
function ligarPular() {
  const b = h("button", null, "skip", {type: "button", "data-k": "skip"});
  document.body.append(b);
  const pular = () => { if (!aberto()) entrar(); };
  b.onclick = pular;
  addEventListener("keydown", e => { if (e.key === "Escape" && !e.defaultPrevented) pular(); });
}

/** Portão: só o texto "hi" abre o site. */
function ligarPortao() {
  $("gate").addEventListener("submit", e => {
    e.preventDefault();
    if (document.body.classList.contains("acc")) return;
    const campo = $("gin");
    if (campo.value.trim().toLowerCase() !== "hi") { campo.value = ""; campo.placeholder = "?"; return; }
    acessoLiberado();
  });
}

initRain();
ligarIdiomas(trocarIdioma);
ligarPular();
ligarSubir();
traduzir();
$("date").textContent = new Date().toDateString();
ligarPortao();

import "./ajustes.js";

