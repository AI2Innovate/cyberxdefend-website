import DemoForm from '../components/DemoForm';
import Reveal from '../components/Reveal';
import StatCounter from '../components/StatCounter';
import { useAttackCanvas } from '../hooks/useAttackCanvas';
import { useLiveTickers } from '../hooks/useLiveTickers';
import { useScrollMode } from '../hooks/useScrollMode';
import '../styles/attack-sim.css';

const PILLAR_ICONS = {
  vault: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  compliance: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 9h10M7 13h6" />
    </svg>
  ),
  breach: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  ),
  ai: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    </svg>
  ),
};

const PILLARS = [
  {
    icon: 'vault',
    title: 'Forensic Evidence Vault',
    description:
      'Every artefact hashed, timestamped and chained the moment it is captured. Tamper-evidence that survives cross-examination.',
    tags: ['BLAKE3', 'RFC 3161', 'MERKLE PROOFS'],
  },
  {
    icon: 'compliance',
    title: 'Compliance Engine',
    description:
      'Continuous mapping of your controls to NIS2 and Belgium’s CyberFundamentals — gap analysis, not guesswork.',
    tags: ['NIS2', 'CYFUN', 'GDPR'],
  },
  {
    icon: 'breach',
    title: 'Breach Response',
    description:
      'Guided incident workflows with the 24h / 72h regulator clocks built in — including CCB notification for Belgium.',
    tags: ['CCB 24H', 'GDPR 72H', 'PLAYBOOKS'],
  },
  {
    icon: 'ai',
    title: 'AI Agent Forensics',
    description:
      'As AI agents act inside your firm, every action is intercepted, logged, and sealed into evidence bundles. Accountability for the agentic era.',
    tags: ['.CAF BUNDLES', 'MCP GATEWAY', 'AUDIT TRAIL'],
  },
];

const KILL_CHAIN_STAGES = [
  {
    mode: 'recon',
    step: 'STAGE 1 / 5 — RECONNAISSANCE',
    title: 'They map you first.',
    body: 'Automated scanners sweep your public footprint: exposed ports, stale subdomains, staff emails scraped from LinkedIn. No alarms ring. It looks like noise.',
    terminal: (
      <>
        <span className="d">02:13:47</span> inbound scan <span className="r">185.220.xx.xx</span> → tcp/443 tcp/3389 tcp/25{'\n'}
        <span className="d">02:13:52</span> dns enum: <span className="w">vpn.</span>yourfirm.be <span className="w">mail.</span>yourfirm.be{'\n'}
        <span className="d">02:14:08</span> harvested: 14 staff addresses (public sources)
      </>
    ),
  },
  {
    mode: 'phish',
    step: 'STAGE 2 / 5 — INITIAL ACCESS',
    title: 'One email. One click.',
    body: 'A convincing invoice, a fake DocuSign, a “missed call” voicemail. One tired click on a Friday afternoon and a credential leaves the building.',
    terminal: (
      <>
        <span className="d">16:42:10</span> mail in: &quot;RE: Factuur 2026-0341&quot; <span className="w">[spoofed]</span>{'\n'}
        <span className="d">16:44:03</span> <span className="r">credential POST</span> → login-yourf1rm.be/owa{'\n'}
        <span className="d">16:45:21</span> session token issued · MFA <span className="r">not enforced</span>
      </>
    ),
  },
  {
    mode: 'lateral',
    step: 'STAGE 3 / 5 — LATERAL MOVEMENT',
    title: 'Quietly, sideways.',
    body: (
      <>
        With one mailbox, they find the file server. With the file server, the domain controller. Average dwell time is measured in{' '}
        <em>weeks</em> — they are patient because you are blind.
      </>
    ),
    terminal: (
      <>
        <span className="d">day 3</span> smb auth <span className="w">FS01</span> ← compromised account{'\n'}
        <span className="d">day 6</span> <span className="r">privilege escalation</span> · new admin &quot;svc_backup2&quot;{'\n'}
        <span className="d">day 11</span> shadow copies <span className="r">deleted</span> · EDR service stopped
      </>
    ),
  },
  {
    mode: 'exfil',
    step: 'STAGE 4 / 5 — EXFILTRATION',
    title: 'Your client files leave first.',
    body: 'Modern ransomware steals before it encrypts. Case files, medical records, contracts — staged, compressed, and pushed out as “normal” HTTPS traffic.',
    terminal: (
      <>
        <span className="d">day 12</span> archive: <span className="w">clients_2024.7z</span> 38.2 GB{'\n'}
        <span className="d">day 12</span> <span className="r">egress</span> → 91.243.xx.xx :443 (rclone){'\n'}
        <span className="d">day 13</span> staging cleared · logs <span className="r">wiped</span>
      </>
    ),
  },
  {
    mode: 'ransom',
    step: 'STAGE 5 / 5 — DETONATION',
    title: 'Then, the note.',
    body: (
      <>
        Encryption takes minutes. Now you have a ransom demand, a regulator deadline, panicking partners — and if you weren’t prepared,{' '}
        <em>no usable evidence</em> of what actually happened.
      </>
    ),
    terminal: (
      <>
        <span className="d">03:58:01</span> <span className="r">ENCRYPTION STARTED</span> · 4 hosts · .cxlocked{'\n'}
        <span className="d">03:58:01</span> README_RESTORE.txt dropped{'\n'}
        <span className="d">04:02:33</span> <span className="w">NIS2 24h early-warning clock: RUNNING</span>
      </>
    ),
  },
];

export default function AttackSimPage() {
  const mode = useScrollMode();
  const canvasRef = useAttackCanvas(mode);
  const { phish, ransom, livePhish, clock } = useLiveTickers();

  return (
    <div className="attack-sim">
      <canvas ref={canvasRef} className="attack-sim__canvas" aria-hidden="true" />
      <div className="attack-sim__vignette" aria-hidden="true" />
      <div className="attack-sim__scanlines" aria-hidden="true" />

      <header>
        <a className="brand" href="#hero">
          CYBER<b>X</b>DEFEND
        </a>
        <div className="ticker" aria-live="off">
          <span>
            <i className="dot" />
            PHISHING EMAILS SINCE YOU OPENED THIS PAGE: <b>{phish}</b>
          </span>
          <span>
            EST. RANSOMWARE ATTACKS: <b>{ransom}</b>
          </span>
        </div>
        <a className="nav-cta" href="#cta">
          REQUEST NIS2 AUDIT
        </a>
      </header>

      <main>
        <section id="hero" data-mode="chaos">
          <div className="wrap">
            <Reveal className="eyebrow">LIVE SIMULATION — THIS IS WHAT THE INTERNET LOOKS LIKE</Reveal>
            <Reveal>
              <h1>
                Right now, someone
                <br />
                is scanning your firm.
              </h1>
            </Reveal>
            <Reveal className="lede">
              Every red trace behind this text is a simulated attack, modelled on how real intrusions unfold: scans, phishing, lateral
              movement, exfiltration. <strong>Keep scrolling to watch one unfold — and what changes when forensic defence is in place.</strong>
            </Reveal>
            <Reveal className="hero-ctas">
              <a className="btn btn-solid" href="#truth">
                See the truth ↓
              </a>
              <a className="btn btn-ghost" href="#platform">
                Explore the platform
              </a>
            </Reveal>
            <Reveal className="tagline">
              <span>
                EU-SOVEREIGN · <em>SELF-HOSTED</em>
              </span>
              <span>
                NIS2 / CYFUN / GDPR · <em>ALIGNED</em>
              </span>
              <span>
                CHAIN OF CUSTODY · <em>COURT-READY</em>
              </span>
            </Reveal>
          </div>
          <div className="scroll-hint">scroll to begin</div>
        </section>

        <section id="truth" data-mode="chaos">
          <div className="wrap">
            <Reveal className="eyebrow">01 — THE TRUTH ABOUT ATTACKS</Reveal>
            <Reveal>
              <h2>
                It is not paranoia.
                <br />
                It is arithmetic.
              </h2>
            </Reveal>
            <Reveal className="lede">
              Law firms, clinics and logistics operators hold exactly what attackers monetise: privileged data, regulated data, and
              operations that cannot afford downtime.
            </Reveal>

            <Reveal className="stat-grid">
              <div className="stat">
                <StatCounter count={4.5} decimals={1} prefix={<small>€</small>} suffix={<small>M</small>} />
                <div className="lbl">Average total cost of a single data breach</div>
                <div className="src">IBM COST OF A DATA BREACH 2024</div>
              </div>
              <div className="stat">
                <StatCounter count={258} suffix={<small> days</small>} />
                <div className="lbl">Average time to identify and contain a breach — while attackers move freely</div>
                <div className="src">IBM 2024</div>
              </div>
              <div className="stat">
                <StatCounter count={68} suffix={<small>%</small>} />
                <div className="lbl">Of breaches involve a human element — a click, a credential, a mistake</div>
                <div className="src">VERIZON DBIR 2024</div>
              </div>
              <div className="stat">
                <StatCounter count={10} prefix={<small>€</small>} suffix={<small>M / 2%</small>} />
                <div className="lbl">Maximum NIS2 fine — €10M or 2% of global turnover, whichever is higher</div>
                <div className="src">DIRECTIVE (EU) 2022/2555</div>
              </div>
            </Reveal>

            <Reveal className="live">
              <div>
                <div className="big">{livePhish}</div>
                <div className="cap">
                  phishing emails sent worldwide since you opened this page — roughly 3.4 billion every day
                </div>
              </div>
              <div>
                <div className="big">{clock}</div>
                <div className="cap">
                  your NIS2 early-warning window after a significant incident. GDPR gives you 72h. The clock does not pause for panic.
                </div>
              </div>
            </Reveal>
            <Reveal className="sources-note">
              Figures are widely-cited industry estimates, named per source. We distinguish what is measured from what is modelled — in
              our marketing and in our forensics.
            </Reveal>
          </div>
        </section>

        <section id="chain" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
          <div className="wrap">
            <Reveal className="eyebrow">02 — ANATOMY OF AN ATTACK</Reveal>
            <Reveal>
              <h2>Watch it happen.</h2>
            </Reveal>
            <Reveal className="lede">
              The background is now following the kill chain. Each stage below drives the simulation — this is the sequence behind almost
              every ransomware case we see.
            </Reveal>
          </div>

          {KILL_CHAIN_STAGES.map((stage) => (
            <div key={stage.mode} className="stage" data-mode={stage.mode}>
              <div className="wrap">
                <Reveal className="stage-card">
                  <div className="step">{stage.step}</div>
                  <h3>{stage.title}</h3>
                  <p>{stage.body}</p>
                  <div className="term">{stage.terminal}</div>
                </Reveal>
              </div>
            </div>
          ))}
        </section>

        <section id="turn" data-mode="shield">
          <div className="wrap">
            <Reveal className="eyebrow" center>
              03 — THE TURN
            </Reveal>
            <Reveal>
              <h2>
                Defence changes
                <br />
                the entire picture.
              </h2>
            </Reveal>
            <Reveal className="lede">
              Watch the simulation. The same attacks are still coming — they always will. The difference is a perimeter that{' '}
              <strong>detects, intercepts, and records every move as court-ready evidence.</strong> Defence is not the absence of attacks.
              It is the presence of proof, readiness, and response.
            </Reveal>
          </div>
        </section>

        <section id="platform" data-mode="defend">
          <div className="wrap">
            <Reveal className="eyebrow">04 — THE PLATFORM</Reveal>
            <Reveal>
              <h2>CyberXDefend: forensics-grade defence, EU-sovereign by design.</h2>
            </Reveal>
            <Reveal className="lede">
              Self-hosted or air-gapped. Built in Rust. Your evidence never leaves your jurisdiction — or your control.
            </Reveal>

            <Reveal className="pillars">
              {PILLARS.map((pillar) => (
                <div key={pillar.title} className="pillar">
                  <div className="ic">{PILLAR_ICONS[pillar.icon]}</div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                  <div className="tags">
                    {pillar.tags.map((tag) => (
                      <i key={tag}>{tag}</i>
                    ))}
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section id="sovereign" data-mode="defend">
          <div className="wrap">
            <Reveal className="eyebrow">05 — WHY SOVEREIGN MATTERS</Reveal>
            <Reveal>
              <h2>Your evidence. Your servers. Your jurisdiction.</h2>
            </Reveal>
            <Reveal className="sov">
              <ul>
                <li>
                  <span>
                    <strong>Self-hosted or fully air-gapped.</strong> No third-country cloud dependency, no foreign subpoena exposure.
                  </span>
                </li>
                <li>
                  <span>
                    <strong>Built for regulated Europe.</strong> Belgian law firms, healthcare and logistics — sectors where
                    confidentiality is the product.
                  </span>
                </li>
                <li>
                  <span>
                    <strong>Chain of custody by default.</strong> Evidence is admissible because its integrity is mathematically provable,
                    not asserted.
                  </span>
                </li>
                <li>
                  <span>
                    <strong>Rust core.</strong> Memory-safe foundations for the software that guards your worst day.
                  </span>
                </li>
              </ul>
              <div className="chain-proof">
                ── CHAIN OF CUSTODY ──────────────────{'\n'}
                artefact mailbox_export_0341.pst{'\n'}
                captured 2026-06-11T09:14:22Z{'\n'}
                blake3 <span className="g">9f86d081...0f00a08</span>
                {'\n'}
                rfc3161 <span className="g">timestamp sealed ✓</span>
                {'\n'}
                merkle <span className="g">root verified ✓</span>
                {'\n'}
                custody unbroken · 0 anomalies{'\n'}
                status <span className="g">COURT-READY</span>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="cta" data-mode="defend">
          <div className="wrap">
            <Reveal className="eyebrow" center>
              06 — START BEFORE THEY DO
            </Reveal>
            <Reveal>
              <h2>
                Find out where you stand —
                <br />
                before an attacker does.
              </h2>
            </Reveal>
            <Reveal className="path">
              <span>
                <b>1</b> FREE NIS2 READINESS AUDIT
              </span>
              <span>
                <b>2</b> FIXED-PRICE REMEDIATION
              </span>
              <span>
                <b>3</b> MONTHLY DEFENCE RETAINER
              </span>
            </Reveal>
            <Reveal className="lede" style={{ margin: '0 auto' }}>
              A free, structured readiness audit against NIS2 and CyberFundamentals. No obligation. You keep the report either way.
            </Reveal>
            <Reveal>
              <DemoForm submitLabel="Request a Demo" />
            </Reveal>
          </div>
        </section>
      </main>

      <footer>
        <span>© 2026 CyberXDefend · AI2Innovate SRL · Belgium 🇧🇪 · EU-sovereign by design</span>
        <span>
          <a href="https://vaultship.cyberxdefend.com">VaultShip OSS</a> · <a href="https://github.com/cyberxdefend">GitHub</a> ·{' '}
          <a href="mailto:contact@cyberxdefend.com">contact@cyberxdefend.com</a>
        </span>
      </footer>
    </div>
  );
}
