(function () {
  const fmt = (n) => n.toLocaleString('en-US');
  const t0 = Date.now();

  function tick() {
    const s = (Date.now() - t0) / 1000;
    const phish = document.getElementById('tick-phish');
    const ransom = document.getElementById('tick-ransom');
    if (phish) phish.textContent = fmt(Math.floor(s * 39352));
    if (ransom) ransom.textContent = fmt(Math.floor(s / 11));
  }

  tick();
  setInterval(tick, 1000);
})();
