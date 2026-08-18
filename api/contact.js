import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Email inválido' });
  }

  try {
    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: 'matheussdias.dev@gmail.com',
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `
Nome: ${name}
Email: ${email}
Assunto: ${subject}

Mensagem:
${message}
      `.trim(),
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #14B8A6; border-bottom: 1px solid #334155; padding-bottom: 12px;">
            Nova mensagem do Portfolio
          </h2>
          <div style="background: #141C2E; border: 1px solid #1E293B; border-radius: 8px; padding: 20px; margin: 16px 0;">
            <p style="margin: 8px 0;"><strong>Nome:</strong> ${name}</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #14B8A6;">${email}</a></p>
            <p style="margin: 8px 0;"><strong>Assunto:</strong> ${subject}</p>
          </div>
          <div style="background: #1A2332; border: 1px solid #1E293B; border-radius: 8px; padding: 20px;">
            <strong>Mensagem:</strong>
            <div style="white-space: pre-wrap; margin-top: 12px; line-height: 1.6;">${message}</div>
          </div>
          <hr style="border-color: #1E293B; margin: 24px 0;">
          <p style="color: #64748B; font-size: 14px;">
            Enviado via formulário do portfolio em ${new Date().toLocaleString('pt-BR')}
          </p>
        </div>
      `.trim(),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return res.status(500).json({ error: 'Falha ao enviar email. Tente novamente.' });
  }
}