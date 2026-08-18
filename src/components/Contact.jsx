'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from 'lucide-react';
import { contactInfo, socialLinks } from '../data/socialLinks';
import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!formState.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formState.email.trim()) newErrors.email = 'Email é obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) newErrors.email = 'Email inválido';
    if (!formState.subject.trim()) newErrors.subject = 'Assunto é obrigatório';
    if (!formState.message.trim()) newErrors.message = 'Mensagem é obrigatória';
    else if (formState.message.trim().length < 10) newErrors.message = 'Mensagem muito curta (mín. 10 caracteres)';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        // Mostra erro detalhado da API
        console.error('API Error:', data);
        throw new Error(data.details ? `${data.error}: ${data.details}` : data.error || 'Erro ao enviar');
      }

      console.log('Email sent:', data);
      setStatus('success');
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Submit error:', error);
      setApiError(error.message);
      setStatus('error');
      setTimeout(() => {
        setStatus('idle');
        setApiError('');
      }, 8000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  return (
    <section
      id="contato"
      className="section"
      aria-labelledby="contact-title"
    >
      <div className="container">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-caption font-medium mb-4">
            Vamos Conversar
          </span>
          <h2 id="contact-title" className="section-title gradient-text">Entre em <span className="text-accent">Contato</span></h2>
          <p className="section-subtitle text-body-lg">
            Estou sempre aberto a novas oportunidades e colaborações.
            Sinta-se à vontade para entrar em contato.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: 'easeOutExpo' }}
          >
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="card p-6 flex items-start gap-4 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-radius-lg bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent group-hover:text-bg-primary group-hover:border-accent transition-all duration-normal">
                    {item.icon === 'mail' && <Mail className="w-6 h-6 text-accent group-hover:text-bg-primary transition-colors" aria-hidden="true" />}
                    {item.icon === 'phone' && <Phone className="w-6 h-6 text-accent group-hover:text-bg-primary transition-colors" aria-hidden="true" />}
                    {item.icon === 'map-pin' && <MapPin className="w-6 h-6 text-accent group-hover:text-bg-primary transition-colors" aria-hidden="true" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-medium text-heading-sm text-text-primary mb-1">{item.name}</h3>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-body text-text-secondary hover:text-accent transition-colors duration-fast"
                        aria-label={item.ariaLabel}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-body text-text-secondary">{item.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}

              <motion.div
                className="card p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="font-display font-semibold text-heading-md text-text-primary mb-4">Redes Sociais</h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-12 h-12 rounded-radius-lg bg-bg-tertiary/50 border border-border text-text-secondary hover:text-accent hover:border-accent/50 hover:bg-accent/10 transition-all duration-fast group"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.ariaLabel}
                    >
                      {social.icon === 'github' && <FaGithub className="w-5 h-5" aria-hidden="true" />}
                      {social.icon === 'linkedin' && <FaLinkedinIn className="w-5 h-5" aria-hidden="true" />}
                      {social.icon === 'instagram' && <FaInstagram className="w-5 h-5" aria-hidden="true" />}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: 'easeOutExpo', delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="card p-6 lg:p-8 space-y-6" noValidate>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-body-sm font-medium text-text-primary mb-2">
                    Nome <span className="text-accent" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-radius-lg bg-bg-tertiary/50 border ${
                      errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-border focus:border-accent'
                    } text-text-primary placeholder:text-text-muted transition-all duration-fast focus:outline-none focus:ring-2 focus:ring-accent/20`}
                    placeholder="Seu nome"
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    disabled={status === 'submitting'}
                  />
                  {errors.name && (
                    <motion.p id="name-error" className="mt-1.5 text-body-sm text-red-400" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-body-sm font-medium text-text-primary mb-2">
                    Email <span className="text-accent" aria-hidden="true">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-radius-lg bg-bg-tertiary/50 border ${
                      errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-border focus:border-accent'
                    } text-text-primary placeholder:text-text-muted transition-all duration-fast focus:outline-none focus:ring-2 focus:ring-accent/20`}
                    placeholder="seu@email.com"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    disabled={status === 'submitting'}
                  />
                  {errors.email && (
                    <motion.p id="email-error" className="mt-1.5 text-body-sm text-red-400" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                      {errors.email}
                    </motion.p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-body-sm font-medium text-text-primary mb-2">
                  Assunto <span className="text-accent" aria-hidden="true">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-radius-lg bg-bg-tertiary/50 border ${
                    errors.subject ? 'border-red-500/50 focus:border-red-500' : 'border-border focus:border-accent'
                  } text-text-primary transition-all duration-fast focus:outline-none focus:ring-2 focus:ring-accent/20 appearance-none`}
                  aria-invalid={errors.subject ? 'true' : 'false'}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                  disabled={status === 'submitting'}
                >
                  <option value="" disabled>Selecione um assunto</option>
                  <option value="oportunidade">Oportunidade de trabalho</option>
                  <option value="freelance">Projeto freelance</option>
                  <option value="colaboracao">Colaboração open source</option>
                  <option value="mentoria">Mentoria / Dúvidas técnicas</option>
                  <option value="outro">Outro</option>
                </select>
                {errors.subject && (
                  <motion.p id="subject-error" className="mt-1.5 text-body-sm text-red-400" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                    {errors.subject}
                  </motion.p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-body-sm font-medium text-text-primary mb-2">
                  Mensagem <span className="text-accent" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-radius-lg bg-bg-tertiary/50 border ${
                    errors.message ? 'border-red-500/50 focus:border-red-500' : 'border-border focus:border-accent'
                  } text-text-primary placeholder:text-text-muted transition-all duration-fast focus:outline-none focus:ring-2 focus:ring-accent/20 resize-y min-h-[120px]`}
                  placeholder="Conte-me sobre seu projeto, oportunidade ou como posso ajudar..."
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'message-error' : 'message-hint'}
                  disabled={status === 'submitting'}
                />
                {errors.message ? (
                  <motion.p id="message-error" className="mt-1.5 text-body-sm text-red-400" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                    {errors.message}
                  </motion.p>
                ) : (
                  <p id="message-hint" className="mt-1.5 text-body-sm text-text-muted">Mínimo 10 caracteres</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary w-full sm:w-auto group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-busy={status === 'submitting'}
              >
                {status === 'submitting' && (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                    <span>Enviando...</span>
                  </>
                )}
                {status !== 'submitting' && (
                  <>
                    <span>Enviar Mensagem</span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-fast" aria-hidden="true" />
                  </>
                )}
              </motion.button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="w-full sm:w-auto p-4 rounded-radius-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-3"
                    role="status"
                    aria-live="polite"
                  >
                    <CheckCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-body-sm font-medium">Mensagem enviada com sucesso! Entrarei em contato em breve.</span>
                  </motion.div>
                )}
{status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="w-full sm:w-auto p-4 rounded-radius-lg bg-red-500/10 border border-red-500/30 text-red-400 flex items-start gap-3"
                    role="alert"
                    aria-live="assertive"
                  >
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div className="text-sm">
                      <p className="font-medium">Erro ao enviar</p>
                      {apiError && <p className="text-text-secondary mt-1 text-xs">{apiError}</p>}
                      <p className="text-text-secondary mt-2 text-xs">Tente novamente ou me chame direto: <a href="mailto:matheussdias.dev@gmail.com" className="underline hover:text-accent">matheussdias.dev@gmail.com</a></p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}