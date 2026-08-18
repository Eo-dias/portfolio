'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Target, Users, Heart, Code2, BookOpen, Award } from 'lucide-react';

const highlights = [
  { icon: Target, label: 'Focado', description: 'Entrega de qualidade com atenção aos detalhes' },
  { icon: Code2, label: 'Curioso', description: 'Sempre aprendendo novas tecnologias e padrões' },
  { icon: Users, label: 'Colaborativo', description: 'Trabalho bem em equipe e valorizo código limpo' },
  { icon: Heart, label: 'Apaixonado', description: 'Transformo problemas em soluções elegantes' },
];

const education = {
  course: 'Análise e Desenvolvimento de Sistemas',
  institution: 'ETEC de Guaianases',
  status: 'Cursando',
  period: '2024 - Presente',
  description: 'Formação técnica superior com foco em desenvolvimento de software, arquitetura, banco de dados, engenharia de software e metodologias ágeis.',
};

const journey = [
  { year: '2024', title: 'Início na ETEC', description: 'Ingresso no curso de Análise e Desenvolvimento de Sistemas', icon: GraduationCap },
  { year: '2024', title: 'Primeiros Projetos', description: 'Desenvolvimento de aplicações web com HTML, CSS, JavaScript e React', icon: Code2 },
  { year: '2025', title: 'Expansão Backend', description: 'Aprendizado de PHP, Laravel, MySQL e Python para full-stack', icon: BookOpen },
  { year: '2025', title: 'Boas Práticas', description: 'Git, testes, Clean Code, acessibilidade e performance', icon: Award },
];

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOutExpo' } },
  };

  return (
    <section
      id="sobre"
      className="section bg-bg-secondary"
      aria-labelledby="about-title"
    >
      <div className="container">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-caption font-medium mb-4" variants={itemVariants}>
            Conheça minha jornada
          </motion.span>
          <motion.h2 id="about-title" className="section-title gradient-text" variants={itemVariants}>Sobre <span className="text-accent">Mim</span></motion.h2>
          <motion.p className="section-subtitle text-body-lg" variants={itemVariants}>
            Desenvolvedor Front-End em formação, apaixonado por criar interfaces que unem estética e funcionalidade.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: 'easeOutExpo' }}
          >
            <motion.div className="card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <h3 className="font-display font-semibold text-heading-md text-text-primary mb-4">Quem sou eu</h3>
              <div className="prose prose-invert max-w-none text-text-secondary">
                <p className="text-body mb-4">
                  Sou <strong className="text-text-primary">Matheus Dias</strong>, tenho 17 anos e sou estudante de
                  <strong className="text-text-primary">Análise e Desenvolvimento de Sistemas</strong> na <strong className="text-text-primary">ETEC de Guaianases</strong>.
                </p>
                <p className="text-body mb-4">
                  Apaixonado por tecnologia, tenho foco no desenvolvimento
                  <strong className="text-text-primary">Front-End</strong>, mas também possuo conhecimentos em Back-End.
                  Busco unir criatividade, lógica e boas práticas para desenvolver soluções
                  web funcionais e eficientes.
                </p>
                <p className="text-body">
                  Estou em constante evolução, sempre aberto a novas oportunidades de
                  aprendizado e colaboração em projetos que agreguem valor.
                </p>
              </div>
            </motion.div>

            <motion.div className="card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <h3 className="font-display font-semibold text-heading-md text-text-primary mb-6">Formação Acadêmica</h3>
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                <div className="flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-radius-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 lg:w-10 lg:h-10 text-accent" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h4 className="font-display font-medium text-heading-sm text-text-primary mb-1">{education.course}</h4>
                  <p className="text-text-secondary mb-2">{education.institution}</p>
                  <div className="flex flex-wrap gap-4 text-body-sm">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 font-medium">
                      {education.status}
                    </span>
                    <span className="flex items-center gap-1.5 text-text-muted">{education.period}</span>
                  </div>
                  <p className="text-body text-text-secondary mt-4">{education.description}</p>
                </div>
              </div>
            </motion.div>

            <motion.div className="card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <h3 className="font-display font-semibold text-heading-md text-text-primary mb-6">Minha Jornada</h3>
              <div className="relative pl-6 border-l border-border">
                {journey.map((item, index) => (
                  <motion.div
                    key={item.year}
                    className="relative pb-8 last:pb-0"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="absolute left-6 top-1 w-3 h-3 rounded-full bg-accent border-4 border-bg-card z-10" aria-hidden="true" />
                    <div className="absolute left-3 top-4 h-full w-0.5 bg-border" aria-hidden="true" />
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-radius-lg bg-bg-tertiary border border-border flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-accent" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-display font-semibold text-heading-sm text-text-primary">{item.year}</span>
                          <span className="text-body-sm font-medium text-accent">{item.title}</span>
                        </div>
                        <p className="text-body text-text-secondary ml-13">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: 'easeOutExpo' }}
          >
            <motion.div className="card p-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <h3 className="font-display font-semibold text-heading-md text-text-primary mb-6">Valores</h3>
              <div className="space-y-4">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="flex items-start gap-4 p-4 rounded-radius-lg bg-bg-tertiary/50 border border-border/50 hover:border-accent/30 hover:bg-accent/5 transition-all duration-normal group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.08 }}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-radius-lg bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent group-hover:text-bg-primary group-hover:border-accent transition-all duration-normal">
                      <item.icon className="w-5 h-5 text-accent group-hover:text-bg-primary transition-colors" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-medium text-text-primary group-hover:text-accent transition-colors">{item.label}</h4>
                      <p className="text-body-sm text-text-secondary mt-0.5">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div className="card p-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <h3 className="font-display font-semibold text-heading-md text-text-primary mb-6">Objetivos Atuais</h3>
              <ul className="space-y-3" role="list">
                {[
                  'Consolidar domínio em React e ecossistema moderno',
                  'Aprofundar conhecimentos em TypeScript e testes',
                  'Contribuir para projetos open source',
                  'Conquistar primeira oportunidade como desenvolvedor júnior',
                  'Construir portfólio com projetos reais e desafiadores',
                ].map((goal, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3 text-body text-text-secondary"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.06 }}
                  >
                    <span className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-accent flex items-center justify-center mt-0.5" aria-hidden="true">
                      <span className="w-2 h-2 rounded-full bg-accent" />
                    </span>
                    <span>{goal}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}