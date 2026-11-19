/** Seletor de idiomas: botão "IDIOMA · PT" que abre uma lista com a sigla e o nome completo de cada idioma. */
import {h, add} from "./dom.js";
import {LANGS, state} from "./i18n.js";

const abertas = () => [...document.querySelectorAll(".lg-list:not([hidden])")];
const fechar = () => abertas().forEach(l => { l.hidden = true; l.previousElementSibling.setAttribute("aria-expanded", "false"); });

/** Atualiza a sigla e o item marcado em todos os seletores (há um na abertura e outro no cabeçalho). */
export function marcarIdioma() {
  document.querySelectorAll(".lg-cur").forEach(e => (e.textContent = state.lang.toUpperCase()));
  document.querySelectorAll(".lg-op").forEach(o => o.setAttribute("aria-selected", String(o.dataset.code === state.lang)));
}

/** Monta os seletores dentro de cada elemento .lang. `aoEscolher(codigo)` é chamado quando alguém escolhe um idioma. */
export function ligarIdiomas(aoEscolher) {
  document.querySelectorAll(".lang").forEach(box => {
    const btn = add(h("button", null, "lg-btn", {type: "button", "aria-haspopup": "listbox", "aria-expanded": "false"}),
      h("span", null, null, {"data-k": "lang"}), h("b", null, "lg-cur"), h("i", "▾", "lg-seta", {"aria-hidden": "true"}));
    const lista = h("ul", null, "lg-list", {role: "listbox", hidden: ""});
    LANGS.forEach(([codigo, nome]) => {
      const op = add(h("button", null, "lg-op", {type: "button", role: "option", "data-code": codigo}), h("b", codigo.toUpperCase()), h("span", nome));
      op.onclick = () => { fechar(); aoEscolher(codigo); };
      lista.append(add(h("li", null, null, {role: "presentation"}), op));
    });
    btn.onclick = e => {
      e.stopPropagation();
      const abrir = lista.hidden;
      fechar();
      lista.hidden = !abrir;
      btn.setAttribute("aria-expanded", String(abrir));
    };
    box.append(btn, lista);
  });
  document.addEventListener("click", fechar);                       // clicar fora fecha
  addEventListener("keydown", e => { if (e.key === "Escape" && abertas().length) { fechar(); e.preventDefault(); } });
  marcarIdioma();
}
