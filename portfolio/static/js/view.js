/** Monta a página a partir dos dados (data.js) e dos textos (i18n.js). */
import { $, h, add } from "./dom.js";
import { DATA } from "./data.js";
import { t, loc } from "./i18n.js";
import { run } from "./terminal.js";
import { seta } from "./subir.js";
import { ligarGato } from "./gato.js";

/** Quantos itens ficam à vista antes do botão + (o resto abre ao clicar). */
const LIMITE = { projetos: 3, certs: 2, seguranca: 2 };

/** Link de verdade? (vazio ou "#" são tratados como "ainda não preenchido" e não aparecem). */
const temLink = (u) => Boolean(u) && u !== "#";

/** Links de contato e currículo: só os que existem de verdade. Aparecem apenas na última seção. */
const contatos = () => {
  const wa = String(DATA.whatsapp || "").replace(/\D/g, "");
  const cv = DATA.cv ? loc(DATA.cv) : "";
  const links = [
    ["GITHUB", DATA.github],
    ["LINKEDIN", DATA.linkedin],
    ["E-MAIL", DATA.mail && "mailto:" + DATA.mail],
    ["WHATSAPP", wa && "https://wa.me/" + wa],
  ]
    .filter(([, u]) => temLink(u))
    .map(([x, u]) =>
      h("a", x + " ↗", "xl", { href: u, rel: "noopener noreferrer" }),
    );
  if (temLink(cv))
    links.push(
      h("a", t("cv").toUpperCase() + " ↓", "xl", { href: cv, download: "" }),
    );
  return links;
};

/** Tira quebras de linha (evita injeção de cabeçalhos em e-mail) e corta o tamanho. */
const limpa = (s, max) =>
  s
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, max);

/** Formulário de contato: monta um e-mail pronto (mailto). Nada é enviado nem guardado por este site. */
function formContato() {
  const F = t("form");
  const f = h("form", null, "cform", { novalidate: "" });
  const campo = (rotulo, el) =>
    add(h("label", null, "fld"), h("span", rotulo), el);
  const nome = h("input", null, null, { maxlength: 80, autocomplete: "name" });
  const email = h("input", null, null, {
    type: "email",
    maxlength: 120,
    autocomplete: "email",
  });
  const tipo = h("select");
  t("opts").forEach((o) => tipo.append(h("option", o, null, { value: o })));
  const msg = h("textarea", null, null, { maxlength: 1000, rows: 5 });
  const aviso = h("p", F.note, "note");
  add(
    f,
    campo(F.n, nome),
    campo(F.e, email),
    campo(F.t, tipo),
    campo(F.m, msg),
    add(
      h("div", null, "btns"),
      h("button", F.send, "btn p", { type: "submit" }),
    ),
    aviso,
  );
  f.onsubmit = (e) => {
    e.preventDefault();
    const n = limpa(nome.value, 80),
      m = msg.value.trim().slice(0, 1000),
      em = limpa(email.value, 120);
    if (!n || !m || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) {
      aviso.textContent = F.err;
      aviso.className = "note err";
      return;
    }
    const assunto = `[Portfólio] ${tipo.value} — ${n}`;
    const corpo = `${m}\n\n— ${n} (${em})`;
    h("a", null, null, {
      href: `mailto:${DATA.mail}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`,
    }).click();
  };
  return f;
}

/**
 * Lista com os primeiros `limite` itens à vista. O resto fica escondido e abre com um botão que mostra só o
 * símbolo, no canto direito da barra de baixo: "+" para abrir e "−" para fechar.
 * `resumo` é o texto da esquerda da barra; `extra` é um item a mais que só aparece ao abrir.
 */
function expansivel(pai, itens, limite, desenhar, resumo = "", extra = null) {
  const oculto = h("div", null, "extra", { hidden: "" });
  itens.forEach((item, n) =>
    (n < limite ? pai : oculto).append(desenhar(item, n)),
  );
  if (extra) oculto.append(extra);
  const barra = h("div", null, "barra");
  if (resumo) barra.append(h("span", resumo, "ok"));
  if (itens.length > limite || extra) {
    const btn = h("button", "+", "tg", {
      type: "button",
      "aria-expanded": "false",
      "aria-label": t("more"),
    });
    btn.onclick = () => {
      const abrir = oculto.hidden;
      oculto.hidden = !abrir;
      btn.textContent = abrir ? "−" : "+";
      btn.setAttribute("aria-expanded", String(abrir));
      btn.setAttribute("aria-label", t(abrir ? "less" : "more"));
    };
    barra.append(btn);
  }
  pai.append(oculto);
  if (barra.childNodes.length) pai.append(barra);
}

/** Uma linha de projeto: número, categoria, nome, descrição, tecnologias e "ver código" à direita. */
function linhaProjeto(p, i) {
  const corpo = h("div");
  const psr = [
    ["pl", p.p],
    ["sl", p.s],
    ["rl", p.r],
  ]
    .filter(([, x]) => x)
    .map(([k, x]) => add(h("p", null, "psr"), h("b", t(k)), " " + loc(x)));
  add(
    corpo,
    h("span", loc(p.t), "tag"),
    h("h3", loc(p.n)),
    h("p", loc(p.d)),
    ...psr,
    add(
      h("div", null, "chips"),
      ...p.tags.map((x) => h("span", loc(x), "chip")),
    ),
  );
  return add(
    h("article", null, "prj"),
    h("span", "0" + (i + 1), "dim"),
    corpo,
    ...(temLink(p.url)
      ? [h("a", t("code"), "vc", { href: p.url, rel: "noopener noreferrer" })]
      : []),
  );
}

/** Um certificado, com link "verificar" quando houver. */
const linhaCert = (c) =>
  add(
    h("div", null, "cert"),
    "✓ " + (c.n ?? c),
    ...(temLink(c.url)
      ? [
          h("a", t("verify"), "ver", {
            href: c.url,
            rel: "noopener noreferrer",
          }),
        ]
      : []),
  );

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
  const lado = (id, tg, ti, ...c) =>
    W(
      id,
      add(
        h("div", null, "two"),
        add(h("div"), ...head(tg, ti)),
        add(h("div"), ...c),
      ),
    ); // título à esquerda, conteúdo à direita
  const resumo = (chave, a, b) => t(chave).replace("{a}", a).replace("{b}", b);

  /* topo */
  const side = add(
    h("div"),
    add(
      h("div", null, "code"),
      h("small", "person.py", "fn"),
      "me = Person()\nwhile me.awake():\n    me.CODE()",
      h("span", null, "cur"),
    ),
    h("div", t("verif"), "ok stat"),
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
      ...(DATA.available ? [h("div", t("avail"), "pulse tag avail")] : []),
      h("div", 'const developer = "' + DATA.name + '"', "dev"),
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

  /* terminal */
  const tb = h("div", null, "tbar"),
    box = h("div", null, "w");
  const form = h("form", null, "tbox row", { autocomplete: "off" });
  const inp = h("input", null, null, {
    placeholder: t("ph"),
    maxlength: 500,
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

  /* como eu opero + arsenal */
  lado(
    "sobre",
    "s1",
    "h2a",
    h("p", t("p2"), "lead big"),
    ...t("st").map(([a, b], i) =>
      add(
        h("div", null, "step"),
        h("span", "0" + (i + 1)),
        h("h4", a),
        h("p", b),
      ),
    ),
  );
  lado(
    "arsenal",
    "s3",
    "h2c",
    ...DATA.arsenal.map(([a, b], i) =>
      add(
        h("div", null, "ars"),
        h("b", "0" + (i + 1)),
        h("b", loc(a)),
        h("span", loc(b)),
      ),
    ),
  );

  /* experiência + formação + certificados */
  const l1 = add(
    h("div", null, "panel"),
    h("span", t("log"), "tag"),
    ...DATA.career.map(([d, ti, ds]) =>
      add(
        h("div", null, "ev"),
        h("span", loc(d)),
        add(h("div"), h("h4", loc(ti)), h("p", loc(ds))),
      ),
    ),
  );
  const certs = add(h("div", null, "panel"), h("span", t("cert"), "tag"));
  const noPerfil = DATA.certsNoPerfil ?? DATA.certs.length,
    mais = noPerfil - DATA.certs.length,
    aviso = t("rest").replace("{n}", mais);
  const extraCert =
    mais > 0
      ? temLink(DATA.linkedin)
        ? h("a", aviso + " ↗", "ver", {
            href: DATA.linkedin,
            rel: "noopener noreferrer",
          })
        : h("p", aviso, "note")
      : null;
  expansivel(
    certs,
    DATA.certs,
    LIMITE.certs,
    linhaCert,
    resumo("bc", Math.min(LIMITE.certs, DATA.certs.length), noPerfil),
    extraCert,
  );
  const l2 = add(
    h("div"),
    add(
      h("div", null, "panel"),
      h("span", t("edu"), "tag"),
      ...DATA.edu.map(([d, ti, s]) =>
        add(
          h("div", null, "ev"),
          h("span", loc(d)),
          add(h("div"), h("h4", loc(ti)), h("p", loc(s))),
        ),
      ),
    ),
    certs,
  );
  W("trajetoria", ...head("s4", "h2d"), add(h("div", null, "two mt"), l1, l2));

  /* projetos */
  const lista = h("div");
  expansivel(
    lista,
    DATA.projects,
    LIMITE.projetos,
    linhaProjeto,
    resumo(
      "bp",
      Math.min(LIMITE.projetos, DATA.projects.length),
      DATA.projects.length,
    ),
  );
  W("trabalho", ...head("s2", "h2b"), lista);

  /* serviços */
  lado(
    "servicos",
    "s5",
    "h2f",
    ...DATA.services.map((s) =>
      add(h("div", null, "li"), h("h4", loc(s.n)), h("p", loc(s.d))),
    ),
  );

  /* depoimentos (só aparece se houver) */
  if (DATA.testimonials.length)
    W(
      "depoimentos",
      ...head("s7", "h2h"),
      ...DATA.testimonials.map((d) =>
        add(
          h("blockquote", null, "quote"),
          h("p", "“" + loc(d.q) + "”"),
          h("cite", d.n + " · " + d.r),
        ),
      ),
    );

  /* como este site é protegido (só itens ativos; abre e fecha com + / −) */
  const seguras = (DATA.security || []).filter((x) => x.ativo);
  if (seguras.length) {
    const ls = h("div");
    expansivel(ls, seguras, LIMITE.seguranca, (x) =>
      add(h("div", null, "li"), h("h4", loc(x.n)), h("p", loc(x.d))),
    );
    lado("seguranca", "s6", "h2g", ls);
  }

  /* contato: tudo de contato fica aqui, na última seção */
  const rodape = h("footer");
  const subir = add(
    h("a", null, "totop-link", { href: "#top" }),
    seta(),
    h("span", t("top").replace(/\s*↑/, "")),
  );
  const formulario = DATA.mail ? formContato() : null;
  if (formulario) formulario.hidden = true;
  const go = h("button", t("go"), "cta", { type: "button" });
  go.onclick = () => {
    // com e-mail configurado: abre/fecha o formulário; sem ele: abre o terminal já com "send "
    if (formulario) {
      formulario.hidden = !formulario.hidden;
      if (!formulario.hidden) formulario.querySelector("input").focus();
    } else {
      inp.value = "send ";
      inp.focus();
      top.scrollIntoView();
    }
  };
  W(
    "contato",
    h("div", t("n3"), "tag"),
    h("h2", t("h2e")),
    h("p", t("p5"), "lead"),
    go,
    ...(formulario ? [formulario] : []),
    add(h("div", null, "cl"), ...contatos()),
    add(rodape, h("span", "© 2026 · " + t("made")), subir),
  );

  document
    .querySelectorAll("[data-k]")
    .forEach((e) => (e.textContent = t(e.dataset.k)));
  reveal();
  ligarGato(rodape, subir);
}

/** Faz cada seção surgir quando entra na tela. */
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
