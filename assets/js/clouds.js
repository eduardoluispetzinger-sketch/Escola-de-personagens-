/* Drifting cartoon clouds — fills every [data-clouds] container */
(function () {
  const CLOUD = (shade) => `
    <svg viewBox="0 0 220 112" aria-hidden="true">
      <path class="c-body" d="M34 98C12 98 4 76 20 66 12 44 34 28 56 38 62 14 96 4 114 24 128 8 162 14 166 42 190 36 212 58 200 80 218 86 212 100 194 100Z"/>
      <path class="c-shade" style="fill:${shade}" d="M18 86C30 96 190 98 206 88 210 96 204 100 194 100L34 100C22 100 16 94 18 86Z"/>
      <ellipse class="c-shine" cx="70" cy="44" rx="14" ry="6" transform="rotate(-20 70 44)"/>
    </svg>`;

  const rand = (a, b) => a + Math.random() * (b - a);

  document.querySelectorAll('[data-clouds]').forEach((box) => {
    const few = box.hasAttribute('data-few');
    const count = few ? 5 : (innerWidth < 760 ? 6 : 9);
    for (let i = 0; i < count; i++) {
      const depth = rand(0.2, 1);                 // 0 far → 1 near
      const w = Math.round(110 + depth * 230);
      const top = few ? rand(4, 70) : rand(2, 72);
      const dur = 140 - depth * 80;               // near clouds move faster
      const el = document.createElement('div');
      // outer = parallax (GSAP), .drift = horizontal CSS loop, .bob = idle float
      el.className = 'cloud';
      el.dataset.depth = depth.toFixed(2);
      el.style.cssText = `--w:${w}px;--o:${(0.55 + depth * 0.45).toFixed(2)};top:${top}%;left:0;z-index:${depth > 0.7 ? 1 : 0}`;
      el.innerHTML = `<div class="drift" style="--d:${dur.toFixed(0)}s;--delay:${(-rand(0, dur)).toFixed(1)}s"><div class="bob" style="animation-duration:${rand(5, 9).toFixed(1)}s;animation-delay:-${rand(0, 5).toFixed(1)}s">${CLOUD(depth > 0.6 ? '#d6ecfb' : '#e6f4fd')}</div></div>`;
      box.appendChild(el);
    }
  });
})();
