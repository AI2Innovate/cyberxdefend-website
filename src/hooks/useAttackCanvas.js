import { useEffect, useRef } from 'react';

const MODES = {
  chaos: 0,
  recon: 1,
  phish: 2,
  lateral: 3,
  exfil: 4,
  ransom: 5,
  shield: 6,
  defend: 7,
};

export function useAttackCanvas(mode) {
  const canvasRef = useRef(null);
  const modeRef = useRef(mode);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0;
    let H = 0;
    let DPR = 1;
    let cx = 0;
    let cy = 0;
    let nodes = [];
    let currentMode = 'chaos';
    let modeT = 0;
    let shield = 0;
    let packets = [];
    let bursts = [];
    let exfils = [];
    let scanA = 0;
    let last = performance.now();
    let rafId = 0;

    function buildNetwork() {
      nodes = [];
      const base = Math.min(W, H);
      const r1 = base * 0.1;
      const r2 = base * 0.2;
      nodes.push({ x: cx, y: cy, r: 5, core: true, hit: 0 });
      for (let i = 0; i < 6; i += 1) {
        const a = (i / 6) * Math.PI * 2 + 0.4;
        nodes.push({ x: cx + Math.cos(a) * r1, y: cy + Math.sin(a) * r1, r: 3.2, hit: 0 });
      }
      for (let i = 0; i < 10; i += 1) {
        const a = (i / 10) * Math.PI * 2;
        nodes.push({ x: cx + Math.cos(a) * r2, y: cy + Math.sin(a) * r2, r: 2.4, hit: 0 });
      }
    }

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      cx = W * 0.5;
      cy = H * 0.46;
      buildNetwork();
    }

    function setMode(m) {
      if (m !== currentMode) {
        currentMode = m;
        modeT = 0;
      }
    }

    function spawnPacket(speed) {
      const edge = Math.floor(Math.random() * 4);
      let x;
      let y;
      if (edge === 0) {
        x = Math.random() * W;
        y = -20;
      } else if (edge === 1) {
        x = W + 20;
        y = Math.random() * H;
      } else if (edge === 2) {
        x = Math.random() * W;
        y = H + 20;
      } else {
        x = -20;
        y = Math.random() * H;
      }
      const tgt = nodes[Math.floor(Math.random() * nodes.length)];
      packets.push({
        x,
        y,
        tx: tgt.x,
        ty: tgt.y,
        tgt,
        sp: speed * (0.7 + Math.random() * 0.6),
        trail: [],
      });
    }

    function spawnExfil() {
      const src = nodes[Math.floor(Math.random() * nodes.length)];
      const a = Math.random() * Math.PI * 2;
      exfils.push({ x: src.x, y: src.y, vx: Math.cos(a) * 2.4, vy: Math.sin(a) * 2.4, life: 1 });
    }

    function burst(x, y, color, n) {
      for (let i = 0; i < n; i += 1) {
        const a = Math.random() * Math.PI * 2;
        const s = 0.6 + Math.random() * 2.4;
        bursts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, color });
      }
    }

    function frame(now) {
      setMode(modeRef.current);
      const dt = Math.min((now - last) / 16.67, 3);
      last = now;
      modeT += dt / 60;
      const st = MODES[currentMode];
      const m = MODES;

      const wantShield = st >= m.shield ? 1 : 0;
      shield += (wantShield - shield) * 0.025 * dt;

      let rate = 0;
      let speed = 2.2;
      if (st === m.chaos) rate = 0.5;
      if (st === m.recon) {
        rate = 0.12;
        speed = 1.4;
      }
      if (st === m.phish) {
        rate = 0.18;
        speed = 2.0;
      }
      if (st === m.lateral) rate = 0.1;
      if (st === m.exfil) {
        rate = 0.1;
        if (Math.random() < 0.25 * dt) spawnExfil();
      }
      if (st === m.ransom) {
        rate = 0.9;
        speed = 3.2;
      }
      if (st === m.shield || st === m.defend) {
        rate = 0.45;
        speed = 2.4;
      }
      if (!reduced && Math.random() < rate * dt) spawnPacket(speed);

      ctx.clearRect(0, 0, W, H);

      ctx.strokeStyle = 'rgba(141,163,184,0.05)';
      ctx.lineWidth = 1;
      const gs = 64;
      ctx.beginPath();
      for (let x = cx % gs; x < W; x += gs) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
      }
      for (let y = cy % gs; y < H; y += gs) {
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
      }
      ctx.stroke();

      const shieldR = Math.min(W, H) * 0.27;

      if (st === m.recon) {
        scanA += 0.02 * dt;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(scanA);
        const grad = ctx.createLinearGradient(0, 0, shieldR * 1.5, 0);
        grad.addColorStop(0, 'rgba(255,176,32,0.20)');
        grad.addColorStop(1, 'rgba(255,176,32,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, shieldR * 1.5, -0.35, 0.05);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      ctx.strokeStyle = 'rgba(141,163,184,0.16)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 1; i < nodes.length; i += 1) {
        const nearest = i < 7 ? nodes[0] : nodes[1 + ((i - 7) % 6)];
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nearest.x, nearest.y);
      }
      ctx.stroke();

      for (const n of nodes) {
        n.hit = Math.max(0, n.hit - 0.02 * dt);
        const defended = shield > 0.5;
        const baseCol = defended ? '43,232,200' : '141,163,184';
        const hitCol = defended ? '43,232,200' : '255,59,78';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + n.hit * 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.hit > 0.05 ? hitCol : baseCol},${0.55 + n.hit * 0.45})`;
        ctx.fill();
        if (n.core) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + 7 + Math.sin(now / 500) * 1.6, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${baseCol},0.35)`;
          ctx.stroke();
        }
      }

      if (shield > 0.02) {
        const pul = Math.sin(now / 420) * 0.06;
        ctx.beginPath();
        ctx.arc(cx, cy, shieldR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(43,232,200,${(0.45 + pul) * shield})`;
        ctx.lineWidth = 1.6;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx, cy, shieldR + 8, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(43,232,200,${0.12 * shield})`;
        ctx.lineWidth = 5;
        ctx.stroke();
        for (let i = 0; i < 24; i += 1) {
          const a = (i / 24) * Math.PI * 2 + now / 4000;
          const x1 = cx + Math.cos(a) * (shieldR - 4);
          const y1 = cy + Math.sin(a) * (shieldR - 4);
          const x2 = cx + Math.cos(a) * (shieldR + 4);
          const y2 = cy + Math.sin(a) * (shieldR + 4);
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = `rgba(43,232,200,${0.25 * shield})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      for (let i = packets.length - 1; i >= 0; i -= 1) {
        const p = packets[i];
        const dx = p.tx - p.x;
        const dy = p.ty - p.y;
        const d = Math.hypot(dx, dy);
        p.x += (dx / d) * p.sp * dt;
        p.y += (dy / d) * p.sp * dt;
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 14) p.trail.shift();

        const distC = Math.hypot(p.x - cx, p.y - cy);
        if (shield > 0.5 && distC < shieldR) {
          burst(p.x, p.y, '43,232,200', 10);
          packets.splice(i, 1);
          continue;
        }
        if (d < 6) {
          p.tgt.hit = 1;
          burst(p.x, p.y, '255,59,78', 8);
          packets.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        for (let t = 0; t < p.trail.length - 1; t += 1) {
          ctx.moveTo(p.trail[t].x, p.trail[t].y);
          ctx.lineTo(p.trail[t + 1].x, p.trail[t + 1].y);
        }
        ctx.strokeStyle = 'rgba(255,59,78,0.5)';
        ctx.lineWidth = 1.4;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = '#FF3B4E';
        ctx.fill();
      }

      for (let i = exfils.length - 1; i >= 0; i -= 1) {
        const e = exfils[i];
        e.x += e.vx * dt;
        e.y += e.vy * dt;
        e.life -= 0.006 * dt;
        if (e.life <= 0 || e.x < -30 || e.x > W + 30 || e.y < -30 || e.y > H + 30) {
          exfils.splice(i, 1);
          continue;
        }
        ctx.fillStyle = `rgba(255,176,32,${e.life * 0.9})`;
        ctx.fillRect(e.x - 2, e.y - 2, 4, 4);
      }

      for (let i = bursts.length - 1; i >= 0; i -= 1) {
        const b = bursts[i];
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        b.life -= 0.03 * dt;
        if (b.life <= 0) {
          bursts.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(b.x, b.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${b.color},${b.life})`;
        ctx.fill();
      }

      if (st === m.ransom && shield < 0.3) {
        const f = (Math.sin(now / 300) + 1) / 2;
        ctx.fillStyle = `rgba(255,59,78,${0.035 * f})`;
        ctx.fillRect(0, 0, W, H);
      }

      rafId = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener('resize', resize);

    if (!reduced) {
      rafId = requestAnimationFrame(frame);
    } else {
      ctx.clearRect(0, 0, W, H);
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(141,163,184,.6)';
        ctx.fill();
      }
    }

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return canvasRef;
}
