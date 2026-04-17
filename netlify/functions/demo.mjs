import sgMail from '@sendgrid/mail';

const MAIL_TO = process.env.MAIL_TO || 'info@ai2innovate.io';
const MAIL_FROM = process.env.MAIL_FROM || 'no-reply@cyberxdefend.com';

const escape = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const isEmail = (value) =>
  typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

export default async (req) => {
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  if (!process.env.SENDGRID_API_KEY) {
    console.error('SENDGRID_API_KEY is not set in Netlify environment.');
    return json({ error: 'Server misconfigured.' }, 500);
  }
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  let body;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Invalid JSON.' }, 400);
  }

  const { firstName, lastName, email, company, message } = body ?? {};
  if (!firstName || !lastName || !company || !isEmail(email)) {
    return json(
      { error: 'Please provide first name, last name, company, and a valid work email.' },
      400
    );
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
    return json({ ok: true });
  } catch (err) {
    const detail = err?.response?.body ?? err?.message ?? 'unknown error';
    console.error('SendGrid error:', detail);
    return json({ error: 'Failed to send email. Please try again later.' }, 502);
  }
};
