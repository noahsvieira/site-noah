/** Monta a página a partir dos dados (data.js) e dos textos (i18n.js). */
import { $, h, add } from "./dom.js";
import { DATA } from "./data.js";
import { t, loc } from "./i18n.js";
import { run } from "./terminal.js";

/** Quantos itens aparecem antes do botão "+ ver mais". O botão só surge quando há mais itens que isso. */
const LIMITE = { projetos: 2, certs: 3 };

/** Link de verdade? (vazio ou "#" são tratados como "ainda não preenchido" e não aparecem). */
const temLink = (u) => Boolean(u) && u !== "#";

/** Mostra os primeiros `limite` itens; o resto fica escondido atrás de um botão "+ ver mais" / "− ver menos". */
function expansivel(pai, itens, limite, desenhar) {
  const extra = h("div", null, "extra", { hidden: "" });
  itens.forEach((item, n) =>
    (n < limite ? pai : extra).append(desenhar(item, n)),
  );
  const resto = itens.length - limite;
  if (resto <= 0) return;
  const btn = h("button", null, "more", {
    type: "button",
    "aria-expanded": "false",
  });
  const rotulo = (aberto) => {
    btn.textContent = `${aberto ? "−" : "+"} ${t(aberto ? "less" : "more")} (${resto})`;
  };
  rotulo(false);
  btn.onclick = () => {
    const abrir = extra.hidden;
    extra.hidden = !abrir;
    btn.setAttribute("aria-expanded", String(abrir));
    rotulo(abrir);
  };
  pai.append(extra, btn);
}

export function build() {
  const app = $("app");
  app.replaceChildren();
  const W = (id, ...c) => {
    const s = h("section", null, "w rv", id ? { id } : {});
    add(s, ...c);
    app.append(s);
    return s;
  };
  const head = (tg, ti) => [h("div", t(tg), "tag"), h("h2", t(ti))];
  /* hero */
  const side = add(
    h("div"),
    add(
      h("div", "me = Person()\nwhile me.awake():\n    me.CODE()", "code"),
      h("span", null, "cur"),
    ),
    ...[
      ["foco", "v1", ""],
      ["base", "v2", ""],
      ["abo", "v3", "g"],
    ].map(([a, b, c]) => add(h("div", null, "kv"), t(a), h("b", t(b), c))),
  );
  const hero = h("div", null, "hero");
  add(
    hero,
    add(
      h("div"),
      h("div", t("tag"), "tag"),
      h("h1", t("h1")),
      h("p", t("lead"), "lead"),
      add(
        h("div", null, "btns"),
        h("a", t("c1"), "btn p", { href: "#trabalho" }),
        h("a", t("c2"), "btn", { href: "#contato" }),
      ),
    ),
    side,
  );
  const top = h("div", null, "w", { id: "top" });
  top.append(hero);
  app.append(top);
  /* terminal inline */
  const tb = h("div", null, "tbar"),
    box = h("div", null, "w");
  const form = h("form", null, "tbox row", { autocomplete: "off" });
  const inp = h("input", null, null, {
    placeholder: t("ph"),
    maxlength: 120,
    "aria-label": "terminal",
  });
  add(
    form,
    h("b", "visitor@noah:~$"),
    add(
      h("span", null, "cw"),
      inp,
      h("span", null, "cur", { "aria-hidden": "true" }),
    ),
    h("span", "[enter]"),
  );
  add(
    box,
    add(h("div", null, "row"), h("span", t("ok"), "pulse tag"), form),
    h("div", null, null, { id: "log" }),
    add(
      h("div", null, "qs"),
      ...[
        ["sobre", "sobre"],
        ["experiência", "trajetoria"],
        ["projetos", "trabalho"],
        ["contato", "contato"],
      ].map(([l, id]) => {
        const b = h("button", l);
        b.prepend(h("span", "$ "));
        b.onclick = () => $(id).scrollIntoView();
        return b;
      }),
    ),
  );
  tb.append(box);
  app.append(tb);
  form.onsubmit = (e) => {
    e.preventDefault();
    run(inp.value);
    inp.value = "";
  };
  const tick = h("div", null, "tick"),
    tr = h(
      "div",
      DATA.stack
        .concat(DATA.stack, DATA.stack, DATA.stack)
        .map((s) => s + " / ")
        .join(" "),
    );
  tick.append(tr);
  app.append(tick);
  /* como eu opero */
  const st = add(
    h("div"),
    h("p", t("p2"), "lead", { style: "font-size:22px;max-width:none" }),
    ...t("st").map(([a, b], i) =>
      add(
        h("div", null, "step"),
        h("span", "0" + (i + 1)),
        h("h4", a),
        h("p", b),
      ),
    ),
  );
  W(
    "sobre",
    add(
      h("div", null, "two"),
      add(h("div"), h("div", t("s1"), "tag"), h("h2", t("h2a"))),
      st,
    ),
  );
  /* trabalho */
  const lista = h("div");
  expansivel(lista, DATA.projects, LIMITE.projetos, (p, i) => {
    const c = h("article", null, "proj"),
      body = h("div");
    const top2 = add(
      h("div", null, "top"),
      h("span", p.t, "tag"),
      ...(temLink(p.url)
        ? [h("a", t("code"), null, { href: p.url, rel: "noopener noreferrer" })]
        : []),
    );
    add(
      body,
      top2,
      h("h3", loc(p.n)),
      h("p", loc(p.d)),
      ...p.tags.map((x) => h("span", x, "chip")),
    );
    return add(
      c,
      h("span", "0" + (i + 1), null, { style: "color:var(--dim)" }),
      body,
    );
  });
  W("trabalho", ...head("s2", "h2b"), lista);
  /* arsenal */
  W(
    "arsenal",
    ...head("s3", "h2c"),
    ...DATA.arsenal.map(([a, b], i) =>
      add(
        h("div", null, "ars"),
        h("b", "0" + (i + 1)),
        h("b", a),
        h("span", b),
      ),
    ),
  );
  /* trajetória */
  const l1 = add(
    h("div", null, "panel"),
    h("span", t("log"), "tag"),
    ...DATA.career.map(([d, ti, ds]) =>
      add(
        h("div", null, "ev"),
        h("span", d),
        add(h("div"), h("h4", ti), h("p", loc(ds))),
      ),
    ),
  );
  const certs = add(h("div", null, "panel"), h("span", t("cert"), "tag"));
  expansivel(certs, DATA.certs, LIMITE.certs, (c) => h("div", "✓ " + c));
  const l2 = add(
    h("div"),
    add(
      h("div", null, "panel"),
      h("span", t("edu"), "tag"),
      ...DATA.edu.map(([d, ti, s]) =>
        add(
          h("div", null, "ev"),
          h("span", d),
          add(h("div"), h("h4", ti), h("p", s)),
        ),
      ),
    ),
    certs,
  );
  W(
    "trajetoria",
    ...head("s4", "h2d"),
    add(h("div", null, "two", { style: "margin-top:32px" }), l1, l2),
  );
  /* contato */
  const go = h("button", t("go"), "cta");
  go.onclick = () => {
    inp.value = "send ";
    inp.focus();
    top.scrollIntoView();
  };
  const link = (x, u) =>
    h("a", x + " ↗", null, {
      href: u,
      rel: "noopener noreferrer",
      style: "margin-right:24px;font-size:12px;letter-spacing:.1em",
    });
  W(
    "contato",
    h("h2", t("h2e")),
    h("p", t("p5"), "lead"),
    go,
    add(
      h("div"),
      ...[
        ["GITHUB", DATA.github],
        ["LINKEDIN", DATA.linkedin],
        ["E-MAIL", DATA.mail],
      ]
        .filter(([, u]) => temLink(u))
        .map(([x, u]) => link(x, u)),
    ),
    add(
      h("footer"),
      h("span", "© 2026 · " + DATA.name),
      (() => {
        const a = h("a", t("top"), null, { href: "#top" });
        return a;
      })(),
    ),
  );
  document
    .querySelectorAll("[data-k]")
    .forEach((e) => (e.textContent = t(e.dataset.k)));
  reveal();
}

function reveal() {
  const els = document.querySelectorAll("#app .rv");
  if (!("IntersectionObserver" in window))
    return els.forEach((e) => e.classList.add("vis"));
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("vis");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.1 },
  );
  els.forEach((e) => io.observe(e));
}
