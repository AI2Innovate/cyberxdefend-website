import 'dotenv/config';
import express from 'express';
import sgMail from '@sendgrid/mail';

const {
  SENDGRID_API_KEY,
  MAIL_TO = 'info@ai2innovate.io',
  MAIL_FROM = 'no-reply@cyberxdefend.com',
  PORT = 5174,
} = process.env;

if (!SENDGRID_API_KEY) {
  console.error('SENDGRID_API_KEY is not set. Add it to .env before starting the server.');
  process.exit(1);
}

sgMail.setApiKey(SENDGRID_API_KEY);

const app = express();
app.use(express.json({ limit: '20kb' }));

const escape = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const isEmail = (value) => typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

app.post('/api/demo', async (req, res) => {
  const { firstName, lastName, email, company, message } = req.body ?? {};

  if (!firstName || !lastName || !company || !isEmail(email)) {
    return res.status(400).json({ error: 'Please provide first name, last name, company, and a valid work email.' });
  }

  const name = `${firstName} ${lastName}`.trim();
  const subject = `New demo request — ${company}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company}`,
    '',
    'Message:',
    message || '(none)',
  ].join('\n');

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#0f172a;">
      <h2 style="margin:0 0 12px;">New CyberXDefend demo request</h2>
      <p><strong>Name:</strong> ${escape(name)}</p>
      <p><strong>Email:</strong> ${escape(email)}</p>
      <p><strong>Company:</strong> ${escape(company)}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space:pre-wrap;">${escape(message || '(none)')}</p>
    </div>
  `;

  try {
    await sgMail.send({
      to: MAIL_TO,
      from: MAIL_FROM,
      replyTo: email,
      subject,
      text,
      html,
    });
    res.json({ ok: true });
  } catch (err) {
    const detail = err?.response?.body ?? err?.message ?? 'unknown error';
    console.error('SendGrid error:', detail);
    res.status(502).json({ error: 'Failed to send email. Please try again later.' });
  }
});

app.listen(PORT, () => {
  console.log(`Demo-form API listening on http://localhost:${PORT}`);
});
