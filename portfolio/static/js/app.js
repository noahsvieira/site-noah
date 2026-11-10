/** Arranque: menu de idiomas, portão "hi" e cena "ACESSO LIBERADO". */
import { $, h } from "./dom.js";
import { LANGS, state, t } from "./i18n.js";
import { build } from "./view.js";
import { initRain } from "./chuva.js";

const CALM = matchMedia("(prefers-reduced-motion: reduce)").matches;
const aberto = () => document.body.classList.contains("in");

/** Põe nos elementos com data-k o texto do idioma atual. */
function traduzir() {
  document.documentElement.lang = { pt: "pt-BR" }[state.lang] ?? state.lang;
  document
    .querySelectorAll("[data-k]")
    .forEach((e) => (e.textContent = t(e.dataset.k)));
}

/** Troca o idioma em todo o site e lembra a escolha deste visitante. */
function trocarIdioma(codigo) {
  state.lang = codigo;
  try {
    localStorage.setItem("lang", codigo);
  } catch {
    /* navegação privada: sem problema */
  }
  document.querySelectorAll(".lang-sel").forEach((s) => (s.value = codigo));
  if (aberto()) build();
  traduzir();
}

/** Um único menu suspenso com todos os idiomas (nas duas barras do site). */
function ligarIdiomas() {
  document.querySelectorAll(".lang").forEach((box) => {
    const sel = h("select", null, "lang-sel", { "aria-label": "Language" });
    LANGS.forEach(([codigo, nome]) =>
      sel.append(h("option", nome, null, { value: codigo })),
    );
    sel.value = state.lang;
    sel.onchange = () => trocarIdioma(sel.value);
    box.append(sel);
  });
}

/** Cena "ACESSO LIBERADO": chuva total + texto digitando; depois revela o portfólio. */
function acessoLiberado() {
  const msg = t("acc");
  let i = 0;
  document.body.classList.add("acc");
  $("gin").blur();
  const ty = setInterval(
    () => {
      $("typed").textContent = msg.slice(0, ++i);
      if (i >= msg.length) clearInterval(ty);
    },
    CALM ? 0 : 85,
  );
  setTimeout(
    () => {
      build();
      document.body.classList.replace("acc", "in");
      scrollTo(0, 0);
    },
    CALM ? 400 : 3300,
  );
}

/** Portão: só o texto "hi" abre o site. */
function ligarPortao() {
  $("gate").addEventListener("submit", (e) => {
    e.preventDefault();
    if (document.body.classList.contains("acc")) return;
    const campo = $("gin");
    if (campo.value.trim().toLowerCase() !== "hi") {
      campo.value = "";
      campo.placeholder = "?";
      return;
    }
    acessoLiberado();
  });
}

initRain();
ligarIdiomas();
traduzir();
$("date").textContent = new Date().toDateString();
ligarPortao();
