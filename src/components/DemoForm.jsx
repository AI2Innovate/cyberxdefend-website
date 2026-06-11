import { useDemoForm } from '../hooks/useDemoForm';

export default function DemoForm({ variant = 'attack', submitLabel = 'Request a Demo' }) {
  const { form, status, update, handleSubmit } = useDemoForm();

  if (variant === 'landing') {
    return (
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
          {status.state === 'loading' ? 'Sending…' : submitLabel}
        </button>
        {status.state === 'success' && <p className="mt-4 text-sm text-emerald-300">{status.message}</p>}
        {status.state === 'error' && <p className="mt-4 text-sm text-rose-300">{status.message}</p>}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="demo-form">
      <div className="demo-form__grid">
        <input
          required
          value={form.firstName}
          onChange={update('firstName')}
          className="demo-form__input"
          placeholder="First name"
        />
        <input
          required
          value={form.lastName}
          onChange={update('lastName')}
          className="demo-form__input"
          placeholder="Last name"
        />
        <input
          required
          type="email"
          value={form.email}
          onChange={update('email')}
          className="demo-form__input demo-form__input--wide"
          placeholder="Work email"
        />
        <input
          required
          value={form.company}
          onChange={update('company')}
          className="demo-form__input demo-form__input--wide"
          placeholder="Company"
        />
        <textarea
          value={form.message}
          onChange={update('message')}
          className="demo-form__input demo-form__textarea demo-form__input--wide"
          placeholder="Tell us about your law firm, regulated environment, incident response needs, or NIS2 readiness priorities"
        />
      </div>
      <button type="submit" disabled={status.state === 'loading'} className="demo-form__submit">
        {status.state === 'loading' ? 'Sending…' : submitLabel}
      </button>
      {status.state === 'success' && <p className="demo-form__status demo-form__status--success">{status.message}</p>}
      {status.state === 'error' && <p className="demo-form__status demo-form__status--error">{status.message}</p>}
    </form>
  );
}
