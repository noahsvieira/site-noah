/** Botão discreto "voltar ao início" (setas duplas). Aparece ao rolar e some quando o rodapé (com o gato) está à vista. */
import {h, svg} from "./dom.js";
import {t} from "./i18n.js";

/** Ícone de setas duplas para cima, na cor do texto (currentColor), para combinar com o tema. */
export function seta() {
  const s = svg("svg", {viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.8", "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true"});
  s.append(svg("polyline", {points: "5,12 12,5 19,12"}), svg("polyline", {points: "5,19 12,12 19,19"}));
  return s;
}

let botao = null;

/** Mostra ou esconde o botão conforme a rolagem; também atualiza o rótulo no idioma atual. */
export function atualizarSubir() {
  if (!botao) return;
  botao.setAttribute("aria-label", t("top").replace(/\s*↑/, ""));
  const rodape = document.querySelector("#contato footer");
  const noFim = rodape ? rodape.getBoundingClientRect().top < innerHeight : false;     // o rodapé tem o link próprio (e o gato)
  botao.classList.toggle("vis", document.body.classList.contains("in") && scrollY > innerHeight * 0.8 && !noFim);
}

export function ligarSubir() {
  const calmo = matchMedia("(prefers-reduced-motion: reduce)").matches;
  botao = h("button", null, "subir", {type: "button"});
  botao.append(seta());
  botao.onclick = () => scrollTo({top: 0, behavior: calmo ? "auto" : "smooth"});
  document.body.append(botao);
  addEventListener("scroll", atualizarSubir, {passive: true});
  addEventListener("resize", atualizarSubir);
  atualizarSubir();
}
