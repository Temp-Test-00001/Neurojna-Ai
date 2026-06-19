import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendEnquiryNotification(data: {
  name: string; email: string; company?: string; service: string; message: string;
}) {
  await transporter.sendMail({
    from: `"Neurojna AI" <${process.env.GMAIL_USER}>`,
    to: process.env.NOTIFY_EMAIL,
    subject: `New Enquiry from ${data.name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px">
        <h2 style="color:#2563eb;margin-bottom:4px">New Training Enquiry</h2>
        <p style="color:#6b7280;font-size:13px;margin-top:0">Received via Neurojna AI website</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"/>
        <table style="width:100%;font-size:14px;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#6b7280;width:120px">Name</td><td style="padding:8px 0;font-weight:600">${data.name}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Email</td><td style="padding:8px 0"><a href="mailto:${data.email}" style="color:#2563eb">${data.email}</a></td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Company</td><td style="padding:8px 0">${data.company || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#6b7280">Program</td><td style="padding:8px 0">${data.service}</td></tr>
        </table>
        <div style="margin-top:16px;padding:16px;background:#f9fafb;border-radius:8px;font-size:14px;color:#374151">
          <strong>Message:</strong><br/>${data.message}
        </div>
      </div>
    `,
  });
}

export async function sendEnquiryConfirmation(to: string, name: string) {
  await transporter.sendMail({
    from: `"Neurojna AI" <${process.env.GMAIL_USER}>`,
    to,
    subject: 'We received your enquiry — Neurojna AI',
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px">
        <h2 style="color:#2563eb">Hi ${name}, thanks for reaching out!</h2>
        <p style="color:#374151">We've received your training enquiry and our team will get back to you within <strong>24 hours</strong>.</p>
        <p style="color:#374151">In the meantime, feel free to explore our programs at <a href="${process.env.APP_URL}" style="color:#2563eb">neurojna.com</a>.</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0"/>
        <p style="color:#9ca3af;font-size:12px">Neurojna AI Pvt. Ltd. · Nagpur, India</p>
      </div>
    `,
  });
}
