import { TransactionalEmailsApi, SendSmtpEmail } from '@getbrevo/brevo';

const apiInstance = new TransactionalEmailsApi();
apiInstance.setApiKey('api-key', process.env.BREVO_API_KEY);

export default async function handler(req, res) {
  const startTime = Date.now();

  console.log('[Contact API] Request received:', {
    method: req.method,
    hasBody: !!req.body,
    timestamp: new Date().toISOString(),
    envKeyExists: !!process.env.BREVO_API_KEY,
    envKeyPrefix: process.env.BREVO_API_KEY?.substring(0, 8) || 'MISSING'
  });

  if (req.method !== 'POST') {
    console.log('[Contact API] Method not allowed:', req.method);
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { name, email, subject, message } = req.body;

  console.log('[Contact API] Form data:', { name, email, subject, messageLength: message?.length });

  if (!name || !email || !subject || !message) {
    console.log('[Contact API] Validation failed: missing fields');
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log('[Contact API] Validation failed: invalid email');
    return res.status(400).json({ error: 'Email inválido' });
  }

  try {
    const sendSmtpEmail = new SendSmtpEmail({
      sender: { name: 'Portfolio', email: 'matheussdias.dev@gmail.com' },
      to: [{ email: 'matheussdias.dev@gmail.com', name: 'Matheus Dias' }],
      replyTo: { email, name },
      subject: `[Portfolio] ${subject}`,
      textContent: `
Nome: ${name}
Email: ${email}
Assunto: ${subject}

Mensagem:
${message}
      `.trim(),
      htmlContent: `
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
    };

    console.log('[Contact API] Sending email via Brevo...', { 
      to: sendSmtpEmail.to[0].email, 
      from: sendSmtpEmail.sender.email 
    });

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log('[Contact API] Email sent successfully:', { 
      messageId: result.body?.messageId,
      duration: Date.now() - startTime 
    });

    return res.status(200).json({ 
      success: true, 
      messageId: result.body?.messageId,
      duration: Date.now() - startTime 
    });
  } catch (error) {
    console.error('[Contact API] Error details:', {
      message: error.message,
      name: error.name,
      response: error.response?.body || error.response?.text,
      status: error.response?.status,
      duration: Date.now() - startTime
    });

    const errorMessage = error.response?.body?.message || error.message;
    
    if (error.response?.status === 401) {
      return res.status(401).json({ 
        error: 'API Key inválida. Verifique BREVO_API_KEY no Vercel.',
        details: errorMessage 
      });
    }
    
    if (error.response?.status === 400 && errorMessage?.includes('sender')) {
      return res.status(400).json({ 
        error: 'Email remetente não verificado no Brevo. Configure em Senders & Domains.',
        details: errorMessage 
      });
    }

    return res.status(500).json({ 
      error: 'Falha ao enviar email. Tente novamente ou me chame direto no email.',
      details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
    });
  }
}