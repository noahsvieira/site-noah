/** Chuva de código no canvas (fundo da página). */
import { $ } from "./dom.js";

export function initRain() {
  const cv = $("rain"),
    cx = cv.getContext("2d"),
    chars = "01{}[]<>/=+*#$%&;:ABCDEF";
  let drops = [];
  const size = () => {
    cv.width = innerWidth;
    cv.height = innerHeight;
    drops = Array.from(
      { length: Math.ceil(innerWidth / 16) },
      () => Math.random() * -50,
    );
  };
  function rain() {
    const cs = getComputedStyle(document.documentElement);
    cx.globalAlpha = 0.08;
    cx.fillStyle = cs.getPropertyValue("--bg");
    cx.fillRect(0, 0, cv.width, cv.height);
    cx.globalAlpha = 1;
    cx.fillStyle = cs.getPropertyValue("--ac");
    cx.font = "14px monospace";
    drops.forEach((y, i) => {
      cx.fillText(chars[(Math.random() * chars.length) | 0], i * 16, y * 16);
      drops[i] = y * 16 > cv.height && Math.random() > 0.975 ? 0 : y + 1;
    });
  }
  size();
  addEventListener("resize", size);
  if (matchMedia("(prefers-reduced-motion: reduce)").matches)
    for (let i = 0; i < 40; i++) rain();
  else setInterval(rain, 50);
}
