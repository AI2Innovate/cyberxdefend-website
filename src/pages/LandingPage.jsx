import { useState } from 'react';

const emptyForm = { firstName: '', lastName: '', email: '', company: '', message: '' };

export default function CyberForensicsLandingPage() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const update = (field) => (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status.state === 'loading') return;
    setStatus({ state: 'loading', message: '' });

    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
      setStatus({ state: 'success', message: 'Thanks — our team will be in touch shortly.' });
      setForm(emptyForm);
    } catch (err) {
      setStatus({ state: 'error', message: err.message });
    }
  };

  const pillars = [
    {
      id: '01',
      title: 'Collect',
      description:
        'Capture endpoint, network, cloud, and log evidence in a defensible workflow designed for speed, integrity, and chain-of-custody confidence.',
    },
    {
      id: '02',
      title: 'Analyze',
      description:
        'Correlate signals across incidents, uncover attacker behavior, and surface high-priority findings with investigator-friendly workflows.',
    },
    {
      id: '03',
      title: 'Prevent',
      description:
        'Turn forensic insight into proactive controls with continuous detection coverage, threat prevention, and hardening recommendations.',
    },
  ];

  const services = [
    {
      title: 'Digital Forensics',
      description:
        'Investigate endpoints, identities, cloud workloads, and privileged communications to reconstruct events, preserve evidence, and accelerate incident resolution.',
    },
    {
      title: 'Ransomware Readiness',
      description:
        'Prepare for double-extortion scenarios with air-gapped evidence workflows, breach triage, and response playbooks designed for high-pressure legal and regulated environments.',
    },
    {
      title: 'Incident Response',
      description:
        'Contain active threats fast, minimize operational disruption, and guide recovery with forensic rigor built into every step.',
    },
    {
      title: 'NIS2 & CyberFundamentals Readiness',
      description:
        'Support evidentiary workflows and control maturity for Belgian and EU organizations navigating NIS2 obligations, CyberFundamentals self-assessments, and ISO 27001 alignment.',
    },
    {
      title: 'Threat Intelligence',
      description:
        'Transform fragmented telemetry into actionable context so teams can understand what happened, why it happened, and which actor patterns matter most.',
    },
    {
      title: 'Security Advisory',
      description:
        'Get expert guidance on investigations, reporting, governance, and long-term resilience without building a full in-house forensics bench.',
    },
  ];

  const sectors = [
    {
      title: 'Law Firms & Legal Advisory',
      points: [
        'Protect privileged client data and evidentiary records',
        'Support breach response, litigation, and defensible reporting',
        'Meet client expectations around GDPR, NIS2, and supply-chain assurance',
      ],
    },
    {
      title: 'Healthcare & Regulated Ops',
      points: [
        'Protect sensitive systems and patient or client data',
        'Accelerate ransomware investigation and operational recovery',
        'Improve control maturity in high-risk workflows',
      ],
    },
    {
      title: 'Transport, Logistics & Ports',
      points: [
        'Investigate operational disruption and suspicious access faster',
        'Reduce exposure across distributed, business-critical infrastructure',
        'Strengthen resilience for high-value logistics environments',
      ],
    },
    {
      title: 'Manufacturing & Critical Services',
      points: [
        'Investigate fraud, intrusion, and leak-site exposure faster',
        'Harden critical systems against advanced threats',
        'Support regulatory, insurer, and stakeholder reporting',
      ],
    },
  ];

  const stats = [
    { value: '105', label: 'Ransomware incidents handled nationally' },
    { value: '635', label: 'National cyber incidents handled in 2025' },
    { value: '2,410', label: 'Belgian organizations registered under NIS2' },
    { value: '18 Apr 2026', label: 'CyberFundamentals / ISO deadline' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-sm font-semibold text-cyan-300">
              XF
            </div>
            <div>
              <p className="text-sm font-medium tracking-[0.24em] text-white/55">CYBER FORENSICS PLATFORM</p>
              <p className="text-base font-semibold">XDefend</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <a href="#services" className="transition hover:text-white">Capabilities</a>
            <a href="#workflow" className="transition hover:text-white">Workflow</a>
            <a href="#industries" className="transition hover:text-white">Industries</a>
            <a href="/blog/" className="transition hover:text-white">Insights</a>
            <a href="#contact" className="transition hover:text-white">Contact</a>
          </nav>

          <a
            href="#contact"
            className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-400/20"
          >
            Request Demo
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_left,rgba(59,130,246,0.16),transparent_28%)]" />
          <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
            <div className="relative z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70">
                <span className="h-2 w-2 rounded-full bg-cyan-300" />
                Purpose-built for Belgian and EU forensics, ransomware response, and threat prevention
              </div>
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Forensics-grade cyber defense for law firms and regulated sectors.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/72">
                CyberXDefend helps teams investigate incidents, preserve defensible evidence, and reduce ransomware exposure with an EU-sovereign, local-first platform designed for Belgium’s rising compliance and threat pressure.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]"
                >
                  Book a Consultation
                </a>
                <a
                  href="#services"
                  className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Explore Platform
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-3 text-sm text-white/60">
                {['EU-Sovereign by Design', 'Chain-of-Custody Aware', 'Ransomware Response', 'NIS2-Aligned'].map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10">
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-2xl shadow-cyan-950/20 backdrop-blur">
                <div className="rounded-[24px] border border-white/10 bg-slate-900 p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/55">Belgium Threat Snapshot</p>
                      <h2 className="text-xl font-semibold">Ransomware & Compliance Timeline</h2>
                    </div>
                    <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                      Active Protection
                    </span>
                  </div>

                  <div className="space-y-3">
                    {[
                      ['AZ Monica disruption spotlights healthcare risk', 'Jan 2026', 'Critical'],
                      ['635 national incidents handled across Belgium', '2025', 'Rising'],
                      ['2,410 organizations registered under NIS2', '2026', 'Active'],
                      ['CyberFundamentals / ISO evidence due to CCB', '18 Apr 2026', 'Urgent'],
                    ].map(([label, time, state]) => (
                      <div key={label} className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                        <div>
                          <p className="text-sm font-medium text-white">{label}</p>
                          <p className="text-xs text-white/45">{time}</p>
                        </div>
                        <span className="text-xs font-medium text-cyan-200">{state}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {stats.map((stat) => (
                      <div key={stat.label} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                        <div className="text-2xl font-semibold">{stat.value}</div>
                        <div className="mt-1 text-sm text-white/55">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-300">Capabilities</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Built for the mid-market teams caught between enterprise-grade threats and lean internal resources.
            </h2>
            <p className="mt-4 text-lg text-white/65">
              CyberXDefend is positioned for Belgian and EU organizations that need serious forensic depth, ransomware readiness, and compliance-grade evidence handling without building a massive in-house security operation.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded-[28px] border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.05]"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-200">
                  +
                </div>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/62">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="workflow" className="border-y border-white/10 bg-white/[0.02]">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-300">Workflow</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                A three-step workflow built for ransomware pressure, legal defensibility, and faster decisions.
              </h2>
              <p className="mt-4 text-lg text-white/65">
                From evidence preservation to attacker reconstruction to hardening recommendations, CyberXDefend helps teams move from investigation to prevention without losing integrity or context.
              </p>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {pillars.map((item) => (
                <div key={item.id} className="rounded-[28px] border border-white/10 bg-slate-950/70 p-7">
                  <div className="text-sm font-medium text-cyan-300">{item.id}</div>
                  <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/65">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="industries" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-300">Industries</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                The sectors driving the most urgent forensic and compliance workload in Belgium.
              </h2>
              <p className="mt-4 text-lg text-white/65">
                Law firms advising healthcare, transport, energy, and manufacturing clients are increasingly pulled into breach response, NIS2 readiness, and evidentiary investigation. CyberXDefend is designed for that exact intersection.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {sectors.map((sector) => (
                <div key={sector.title} className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
                  <h3 className="text-xl font-semibold">{sector.title}</h3>
                  <ul className="mt-4 space-y-3 text-sm text-white/65">
                    {sector.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-300" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="grid gap-4 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <div className="text-2xl font-semibold text-cyan-200">{stat.value}</div>
                <div className="mt-1 text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
          <div className="overflow-hidden rounded-[32px] border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(34,211,238,0.14),rgba(15,23,42,0.95),rgba(59,130,246,0.14))] p-8 sm:p-10 lg:p-12">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-200">Why CyberXDefend</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Built for organizations that need forensic certainty and client-facing credibility.
              </h2>
              <p className="mt-4 text-lg text-white/72">
                In Belgium, mid-market organizations and the firms advising them are dealing with sophisticated ransomware pressure, rising reporting obligations, and lean technical teams. CyberXDefend closes that gap with local-first, compliance-aware investigation and prevention workflows.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                'EU-sovereign, air-gapped, local-first positioning',
                'Designed for GDPR, NIS2, and evidentiary workflows',
                'Relevant to law firms advising regulated Belgian clients',
                'Built for the 50 to 400 user mid-market gap',
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/72">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-white/10 bg-slate-900/70">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-300">Get started</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Show clients, regulators, and internal teams that your cyber posture is investigation-ready.
              </h2>
              <p className="mt-4 max-w-xl text-lg text-white/65">
                Book a tailored walkthrough to explore ransomware response, forensic workflows, NIS2 readiness, and preventive controls for Belgian and EU high-trust environments.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  required
                  value={form.firstName}
                  onChange={update('firstName')}
                  className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30"
                  placeholder="First name"
                />
                <input
                  required
                  value={form.lastName}
                  onChange={update('lastName')}
                  className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30"
                  placeholder="Last name"
                />
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 sm:col-span-2"
                  placeholder="Work email"
                />
                <input
                  required
                  value={form.company}
                  onChange={update('company')}
                  className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 sm:col-span-2"
                  placeholder="Company"
                />
                <textarea
                  value={form.message}
                  onChange={update('message')}
                  className="min-h-[140px] rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 sm:col-span-2"
                  placeholder="Tell us about your law firm, regulated environment, incident response needs, or NIS2 readiness priorities"
                />
              </div>
              <button
                type="submit"
                disabled={status.state === 'loading'}
                className="mt-5 w-full rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status.state === 'loading' ? 'Sending…' : 'Request a Demo'}
              </button>
              {status.state === 'success' && (
                <p className="mt-4 text-sm text-emerald-300">{status.message}</p>
              )}
              {status.state === 'error' && (
                <p className="mt-4 text-sm text-rose-300">{status.message}</p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>
            © 2026{' '}
            <a
              href="https://ai2innovate.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 transition hover:text-cyan-300"
            >
              AI2Innovate
            </a>
            . All rights reserved.
          </p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="/privacy-policy.html" className="transition hover:text-cyan-300">Privacy Policy</a>
            <a href="/terms-and-conditions.html" className="transition hover:text-cyan-300">Terms &amp; Conditions</a>
            <a href="/blog/" className="transition hover:text-cyan-300">Insights</a>
            <a href="#contact" className="transition hover:text-cyan-300">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
