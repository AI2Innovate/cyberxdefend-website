import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';

const {
  SMTP_HOST = 'smtp.office365.com',
  SMTP_PORT = 587,
  SMTP_USER,
  SMTP_PASS,
  MAIL_TO = 'info@ai2innovate.io',
  MAIL_FROM,
  PORT = 5174,
} = process.env;

if (!SMTP_USER || !SMTP_PASS) {
  console.error('SMTP_USER and SMTP_PASS must be set. Add them to .env before starting the server.');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: false,
  requireTLS: true,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

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
    await transporter.sendMail({
      from: `"CyberXDefend Website" <${MAIL_FROM || SMTP_USER}>`,
      to: MAIL_TO,
      replyTo: email,
      subject,
      text,
      html,
    });
    res.json({ ok: true });
  } catch (err) {
    console.error('SMTP error:', err?.message ?? err);
    res.status(502).json({ error: 'Failed to send email. Please try again later.' });
  }
});

app.listen(PORT, () => {
  console.log(`Demo-form API listening on http://localhost:${PORT}`);
});
