/**
 * Gato de código: uma homenagem à cena do "déjà vu" de Matrix, desenhado do zero.
 *  - Fica sentado perto do "voltar ao topo", formado por caracteres que cintilam.
 *  - Quando o cursor chega perto do link, levanta e anda até a chuva de caracteres da borda direita.
 *  - Ao clicar, entra no código: vira silhueta escura cercada de código, se desfaz e some, e a página sobe.
 *  - Só reaparece quando a última seção volta à tela.
 */
import {h} from "./dom.js";

const COLS = 36, ROWS = 24, CW = 3, CH = 4;   // grade do gato e tamanho de cada "pixel" (px)
const CHARS = "01{}[]<>/=+*#$%&;:ABCDEF";
const VEL = 70;       // velocidade da caminhada (px por segundo)
const PERTO = 170;    // distância (px) do cursor ao link que "acorda" o gato
const FRENTE = 33;    // coluna do focinho: serve para saber quanto do gato já entrou na chuva

/* ---------- 1) A forma: geometria simples, sem imagens ---------- */
const elipse = (x, y, cx, cy, rx, ry) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1;
const distSeg = (x, y, ax, ay, bx, by) => {
  const dx = bx - ax, dy = by - ay, k = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy || 1)));
  return Math.hypot(x - (ax + k * dx), y - (ay + k * dy));
};
const traco = (x, y, pts, r) => pts.some((p, i) => i && distSeg(x, y, pts[i - 1][0], pts[i - 1][1], p[0], p[1]) <= r);
const triangulo = (x, y, [ax, ay], [bx, by], [cx, cy]) => {
  const d = (px, py, qx, qy, rx, ry) => (px - rx) * (qy - ry) - (qx - rx) * (py - ry);
  const d1 = d(x, y, ax, ay, bx, by), d2 = d(x, y, bx, by, cx, cy), d3 = d(x, y, cx, cy, ax, ay);
  return !((d1 < 0 || d2 < 0 || d3 < 0) && (d1 > 0 || d2 > 0 || d3 > 0));
};

/** Gato sentado, de perfil, olhando para a direita, com o rabo enrolado. */
const dentroSentado = (x, y) =>
  elipse(x, y, 27, 6.8, 5, 4.3) || triangulo(x, y, [23.2, 4.8], [23.8, 0.4], [26.6, 2.8]) || triangulo(x, y, [28.6, 2.6], [31.4, 0.4], [31.9, 4.8])
  || elipse(x, y, 26, 13.5, 4.6, 6.6) || elipse(x, y, 19, 16.8, 8.5, 6) || distSeg(x, y, 26.6, 15, 26.9, 22.2) <= 1.5
  || elipse(x, y, 22, 22.4, 5.8, 1.3) || traco(x, y, [[10.8, 19.6], [6, 21.6], [2.6, 19.6], [1.8, 15.6], [3.6, 12.4]], 1.25);

/** Gato andando (4 quadros: as pernas se alternam em diagonal). */
function dentroAndando(x, y, f) {
  const a = f * Math.PI / 2;
  const perna = (x0, fase) => {
    const s = Math.sin(a + fase), lev = Math.max(0, Math.cos(a + fase)) * 1.6;
    return traco(x, y, [[x0, 15.2], [x0 + s * 1.3, 19], [x0 + s * 3, 22.6 - lev]], 1.25);
  };
  const rabo = Math.sin(a) * 0.8;
  return elipse(x, y, 16.5, 12, 9.5, 4.4) || elipse(x, y, 22.5, 12.5, 4.6, 5) || elipse(x, y, 10.5, 12.2, 4.6, 4.8) || elipse(x, y, 28.5, 8.6, 4.7, 3.9)
    || triangulo(x, y, [25.4, 6.4], [26, 2.6], [28.4, 4.8]) || triangulo(x, y, [29.6, 4.6], [32.2, 2.6], [32.4, 6.6])
    || distSeg(x, y, 24.5, 10.5, 27.5, 9) <= 2.8 || traco(x, y, [[6.2, 10.5], [3.2 + rabo, 9], [1.6 + rabo, 5.6], [2.8 + rabo, 2.6]], 1.3)
    || perna(22, 0) || perna(24.5, Math.PI) || perna(9, Math.PI) || perna(11.5, 0);
}

const vizinho = (g, c, r, d) => { for (let j = -d; j <= d; j++) for (let i = -d; i <= d; i++) if (g[r + j]?.[c + i]) return true; return false; };
const cache = new Map();
/** Grade de células do gato (g) e do "contorno de código" ao redor dele (halo). */
export function forma(pose, fase = 0) {
  const f = pose === "sentado" ? 0 : Math.floor(fase) % 4, chave = pose + f;
  if (!cache.has(chave)) {
    const dentro = pose === "sentado" ? dentroSentado : (x, y) => dentroAndando(x, y, f);
    const g = Array.from({length: ROWS}, (_, r) => Array.from({length: COLS}, (_, c) => dentro(c + .5, r + .5)));
    cache.set(chave, {g, halo: g.map((lin, r) => lin.map((v, c) => !v && vizinho(g, c, r, 2)))});
  }
  return cache.get(chave);
}

/* ---------- 2) O desenho: cada célula do gato é um caractere de código ---------- */
const hash = (a, b, c = 0) => { let n = Math.imul(a * 73856093 ^ b * 19349663 ^ c * 83492791, 2654435761); n ^= n >>> 15; return (n >>> 0) / 4294967296; };

/**
 * Desenha um quadro. Fora da chuva o gato é feito de caracteres; dentro da chuva (x >= limite) vira silhueta
 * escura com código em volta; com `dissolve` > 0 as células se soltam e caem como a chuva.
 */
export function desenhar(ctx, s) {
  const {g, halo} = forma(s.pose, s.fase);
  ctx.clearRect(0, 0, s.largura, s.altura);
  ctx.save();
  ctx.globalAlpha = s.alfa;
  ctx.font = `${CH + 2}px monospace`;
  ctx.textBaseline = "top";
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    const dentro = g[r][c];
    if (!dentro && !halo[r][c]) continue;
    const gx = s.x + (s.espelho ? COLS - 1 - c : c) * CW, gy = s.y + r * CH, naChuva = gx >= s.limite;
    if (!dentro && !naChuva) continue;                                   // fora da chuva só existe o corpo
    const solta = Math.max(0, s.dissolve - hash(c, r, 7));                // > 0: a célula já se soltou
    const ch = CHARS[Math.floor(hash(c, r, (s.tick + c * 3 + r) >> 2) * CHARS.length)];
    if (dentro && naChuva && !solta) { ctx.fillStyle = s.fundo; ctx.fillRect(gx, gy, CW, CH); continue; }   // silhueta escura
    ctx.globalAlpha = s.alfa * (solta ? Math.max(0, 1 - solta * 2.5) : .45 + .55 * hash(c, r, 3));
    ctx.fillStyle = s.cor;
    ctx.fillText(ch, gx, gy + solta * 90);
  }
  ctx.restore();
}

/* ---------- 3) O comportamento ---------- */
let ativo = null;
/** Só para testes e depuração: o gato que está ligado agora. */
export const gatoAtual = () => ativo;

/** Liga o gato ao rodapé. Chamado a cada montagem da página; desliga o anterior. */
export function ligarGato(rodape, link) {
  ativo?.destruir();
  ativo = criar(rodape, link);
  return ativo;
}

function criar(rodape, link) {
  const calmo = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cv = h("canvas", null, "gato", {"aria-hidden": "true"});
  const ctx = cv.getContext("2d");
  rodape.append(cv);
  const g = {estado: "oculto", x: 6, fase: 0, tick: 0, dissolve: 0, alfa: 0, espelho: false, mouse: false, foco: false};
  const geo = {largura: 0, altura: ROWS * CH + 10, limite: 0, alvo: 0, fim: 0, sentado: 6};
  let loop = null, ultimo = 0, espera = null, io = null;
  const perto = () => g.mouse || g.foco;
  const frente = () => g.x + FRENTE * CW;
  const pose = () => (g.estado === "sentado" || g.estado === "chegando" ? "sentado" : "andando");

  /** Mede o rodapé: onde o gato senta, onde começa a chuva (borda direita) e até onde ele anda. */
  function medir() {
    const R = rodape.getBoundingClientRect(), K = link.getBoundingClientRect();
    const esq = Math.max(4, K.left - COLS * CW - 26);                      // o gato fica à esquerda do link
    geo.largura = Math.max(COLS * CW + 20, innerWidth - esq);               // a tela do gato vai até a borda direita
    geo.limite = Math.min(innerWidth * 0.93 - esq, geo.largura - 18);       // a chuva ocupa os 7% finais
    geo.alvo = geo.limite + 12;                                             // ponto de espera: o focinho já toca o código
    cv.width = geo.largura; cv.height = geo.altura;
    cv.style.left = esq - R.left + "px";
    cv.style.top = K.top - R.top - geo.altura + 2 + "px";
  }

  function render() {
    const cs = getComputedStyle(document.documentElement);
    desenhar(ctx, {pose: pose(), fase: g.fase, x: g.x, y: geo.altura - ROWS * CH - 2, tick: g.tick, limite: geo.limite, alfa: g.alfa,
      dissolve: g.dissolve, espelho: g.espelho, largura: geo.largura, altura: geo.altura,
      cor: cs.getPropertyValue("--ac").trim() || "#7dff9f", fundo: cs.getPropertyValue("--bg").trim() || "#050a07"});
  }

  const andar = (dt, dir) => { g.x += dir * VEL * dt / 1000; g.fase = (g.fase + dt / 130) % 4; g.espelho = dir < 0; };
  const subir = () => scrollTo({top: 0, behavior: calmo ? "auto" : "smooth"});

  /** Avança a "história" do gato em `dt` milissegundos. */
  function avancar(dt) {
    g.tick++;
    switch (g.estado) {
      case "chegando": g.alfa = Math.min(1, g.alfa + dt / 700); if (g.alfa >= 1) g.estado = "sentado"; break;
      case "sentado": if (perto()) { g.estado = "andando"; g.espelho = false; } break;
      case "andando":
        if (!perto()) { g.estado = "volta"; g.espelho = true; }
        else if (frente() < geo.alvo) andar(dt, 1);
        else { g.estado = "espera"; g.fase = 0; }
        break;
      case "espera": if (!perto()) { g.estado = "volta"; g.espelho = true; } break;
      case "volta":
        if (perto()) { g.estado = "andando"; g.espelho = false; }
        else if (g.x > geo.sentado) andar(dt, -1);
        else { g.x = geo.sentado; g.espelho = false; g.estado = "sentado"; }
        break;
      case "entrando":
        andar(dt, 1);
        g.dissolve = Math.min(1, g.dissolve + dt / 1100);
        if (g.dissolve >= 1) { g.estado = "sumido"; g.alfa = 0; }
        break;
    }
  }

  function ligarLoop() {
    if (loop || calmo) return;
    ultimo = performance.now();
    loop = setInterval(() => {
      const agora = performance.now();
      avancar(Math.min(120, agora - ultimo)); ultimo = agora;
      if (g.estado === "sumido" || g.estado === "oculto") { pararLoop(); ctx.clearRect(0, 0, geo.largura, geo.altura); } else render();
    }, 66);
  }
  function pararLoop() { clearInterval(loop); loop = null; }

  function mostrar() {
    medir();
    g.x = geo.sentado; g.fase = 0; g.dissolve = 0; g.espelho = false;
    if (calmo) { g.alfa = 1; g.estado = "sentado"; render(); } else { g.alfa = 0; g.estado = "chegando"; ligarLoop(); }
  }
  function esconder() {
    clearTimeout(espera); pararLoop();
    g.estado = "oculto"; g.alfa = 0;
    ctx.clearRect(0, 0, geo.largura || 1, geo.altura);
  }

  /** O clique: o gato entra no código e, um instante depois, a página sobe. */
  function clicar() {
    if (calmo || !["sentado", "chegando", "andando", "espera", "volta"].includes(g.estado)) return subir();
    g.estado = "entrando"; g.espelho = false; g.dissolve = 0; g.alfa = 1;
    espera = setTimeout(subir, 800);
  }

  const mover = e => {
    const K = link.getBoundingClientRect();
    const dx = Math.max(K.left - e.clientX, 0, e.clientX - K.right), dy = Math.max(K.top - e.clientY, 0, e.clientY - K.bottom);
    g.mouse = Math.hypot(dx, dy) < PERTO;
  };
  const sair = () => { g.mouse = false; };
  const comFoco = () => { g.foco = true; }, semFoco = () => { g.foco = false; };
  const aoClicar = e => { e.preventDefault(); clicar(); };
  const aoRedimensionar = () => { if (g.estado !== "oculto") { medir(); if (g.estado === "sentado") g.x = geo.sentado; } };
  addEventListener("pointermove", mover, {passive: true});
  addEventListener("resize", aoRedimensionar);
  document.documentElement.addEventListener("pointerleave", sair);
  link.addEventListener("focus", comFoco); link.addEventListener("blur", semFoco); link.addEventListener("click", aoClicar);

  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { if (g.estado === "oculto") mostrar(); } else esconder(); }, {threshold: 0.6});
    io.observe(rodape);
  } else mostrar();

  return {
    get estado() { return g.estado; }, g, geo, avancar, clicar, mostrar, esconder,
    engajar: v => { g.mouse = v; },
    destruir() {
      esconder(); io?.disconnect();
      removeEventListener("pointermove", mover); removeEventListener("resize", aoRedimensionar);
      document.documentElement.removeEventListener("pointerleave", sair);
      link.removeEventListener("focus", comFoco); link.removeEventListener("blur", semFoco); link.removeEventListener("click", aoClicar);
      cv.remove();
    }
  };
}
