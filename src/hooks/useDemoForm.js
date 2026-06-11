import { useState } from 'react';

const emptyForm = { firstName: '', lastName: '', email: '', company: '', message: '' };

export function useDemoForm() {
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

  return { form, status, update, handleSubmit };
}
