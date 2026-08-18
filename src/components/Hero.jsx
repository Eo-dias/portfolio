'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MousePointerClick } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.19, 1, 0.22, 1],
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, x: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.9,
        ease: [0.19, 1, 0.22, 1],
        delay: 0.4,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 lg:pt-20 overflow-hidden"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent" aria-hidden="true" />

      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center bg-[length:60px_60px] opacity-5" aria-hidden="true" />

      <motion.div
        className="container relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            className="text-center lg:text-left"
            variants={itemVariants}
          >
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-caption font-medium mb-6"
              style={{ animationDelay: '0.1s' }}
            >
              Olá, eu sou
            </motion.span>

            <motion.h1
              id="hero-title"
              className="font-display font-bold text-display-xl text-text-primary mb-4 gradient-text"
              variants={itemVariants}
            >
              Matheus Dias
            </motion.h1>

            <motion.h2
              className="font-display font-medium text-display-md text-text-secondary mb-6"
              variants={itemVariants}
            >
              Desenvolvedor <span className="gradient-accent font-semibold">Front-End</span>
            </motion.h2>

            <motion.p
              className="text-body-lg text-text-secondary max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              Transformando ideias em experiências digitais modernas e funcionais.
              Focado em criar soluções web eficientes com criatividade e dedicação.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              variants={itemVariants}
            >
              <motion.a
                href="#projetos"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#projetos');
                }}
                className="btn-primary group"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Ver Projetos
                <motion.span
                  className="transition-transform duration-fast group-hover:translate-x-1"
                >
                  <ArrowRight size={18} aria-hidden="true" />
                </motion.span>
              </motion.a>

              <motion.a
                href="#contato"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#contato');
                }}
                className="btn-secondary group"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Entrar em Contato
              </motion.a>
            </motion.div>

            <motion.div
              className="flex items-center justify-center lg:justify-start gap-8 mt-12 pt-8 border-t border-border"
              variants={itemVariants}
            >
              <motion.div
                className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors duration-fast cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <MousePointerClick size={18} className="text-accent" aria-hidden="true" />
                <span className="text-body-sm font-medium">Disponível para oportunidades</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2 text-text-secondary"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" aria-hidden="true"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" aria-hidden="true"></span>
                </span>
                <span className="text-body-sm font-medium text-text-muted">Open to work</span>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative"
            variants={imageVariants}
          >
            <div className="relative aspect-square max-w-xs mx-auto lg:max-w-md">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-radius-2xl blur-2xl opacity-50"
                animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true"
              />
              <div className="relative rounded-radius-2xl overflow-hidden border border-border bg-bg-card">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src="/foto.png"
                    alt="Matheus Dias - Desenvolvedor Front-End"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="eager"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-bg-primary/90 to-transparent p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-bg-primary bg-bg-card flex items-center justify-center text-caption font-medium text-text-muted"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.6 + i * 0.1, type: 'spring', stiffness: 300 }}
                        >
                          {i}
                        </motion.div>
                      ))}
                    </div>
                    <div>
                      <p className="text-body-sm font-medium text-text-primary">17 anos</p>
                      <p className="text-caption text-text-muted">Estudante de ADS</p>
                    </div>
                  </div>
                </div>
              </div>

              <motion.div
                className="absolute -bottom-6 -right-6 lg:-bottom-8 lg:-right-8 w-24 h-24 lg:w-32 lg:h-32 rounded-radius-2xl bg-bg-card border border-border flex items-center justify-center shadow-shadow-xl"
                animate={{ rotate: [0, 2, -2, 0], y: [0, -5, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="text-center p-4">
                  <p className="font-display font-bold text-3xl lg:text-4xl text-accent">01</p>
                  <p className="text-caption text-text-muted">Front-End</p>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-4 -left-6 lg:top-8 lg:-left-8 w-16 h-16 lg:w-20 lg:h-20 rounded-radius-xl bg-accent/10 border border-accent/20 flex items-center justify-center"
                animate={{ x: [0, 10, -10, 0], rotate: [0, -3, 3, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <svg className="w-8 h-8 lg:w-10 lg:h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <motion.button
          onClick={() => scrollToSection('#sobre')}
          className="p-3 rounded-full bg-bg-card/50 border border-border hover:border-accent/50 hover:bg-bg-card transition-all duration-normal backdrop-blur-sm"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Rolar para sobre mim"
        >
          <MousePointerClick size={24} className="text-text-secondary" />
        </motion.button>
      </motion.div>
    </section>
  );
}