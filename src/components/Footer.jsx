'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { socialLinks } from '../data/socialLinks';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg-secondary" role="contentinfo">
      <div className="container">
        <motion.div
          className="py-8 lg:py-12 flex flex-col lg:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
            <motion.a
              href="#home"
              className="flex items-center gap-2 text-text-primary hover:text-accent transition-colors duration-fast font-display font-semibold text-heading-md"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Matheus Dias - Home"
            >
              <span className="text-accent">MD</span>
            </motion.a>
            <p className="text-body-sm text-text-secondary">
              © {currentYear} <strong className="text-text-primary">Matheus Dias</strong>. Todos os direitos reservados.
            </p>
          </div>

          <motion.nav
            className="flex items-center gap-3"
            aria-label="Redes sociais"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-radius-lg bg-bg-tertiary/50 border border-border text-text-secondary hover:text-accent hover:border-accent/50 hover:bg-accent/10 transition-all duration-fast group"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.ariaLabel}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                {social.icon === 'github' && <FaGithub className="w-5 h-5 group-hover:text-accent transition-colors" aria-hidden="true" />}
                {social.icon === 'linkedin' && <FaLinkedinIn className="w-5 h-5 group-hover:text-accent transition-colors" aria-hidden="true" />}
                {social.icon === 'instagram' && <FaInstagram className="w-5 h-5 group-hover:text-accent transition-colors" aria-hidden="true" />}
              </motion.a>
            ))}
          </motion.nav>

          <motion.div
            className="flex items-center gap-4 text-body-sm text-text-muted"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span>Desenvolvido com</span>
            <span className="flex items-center gap-1 text-accent" aria-hidden="true">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </span>
            <span>React + Vite + Tailwind</span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}