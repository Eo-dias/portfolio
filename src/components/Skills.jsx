'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { Monitor, Server, Wrench, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import { FaHtml5, FaCss3Alt, FaJs, FaPhp, FaLaravel, FaDatabase, FaPython, FaGitAlt } from 'react-icons/fa';
import { skills, skillCategories, levelStyles } from '../data/skills';

const skillIcons = {
  html5: FaHtml5,
  css3: FaCss3Alt,
  javascript: FaJs,
  php: FaPhp,
  laravel: FaLaravel,
  database: FaDatabase,
  python: FaPython,
  git: FaGitAlt,
};

const categoryIcons = {
  frontend: Monitor,
  backend: Server,
  tools: Wrench,
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [expandedSkills, setExpandedSkills] = useState(new Set());

  const filteredSkills = skills.filter((skill) => skill.category === activeCategory);

  const toggleSkill = (skillId) => {
    setExpandedSkills((prev) => {
      const next = new Set(prev);
      if (next.has(skillId)) {
        next.delete(skillId);
      } else {
        next.add(skillId);
      }
      return next;
    });
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Intermediário':
        return 'text-accent bg-accent/20 border-accent/30';
      case 'Iniciante':
        return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'Avançado':
        return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
      default:
        return 'text-text-muted bg-bg-tertiary border-border';
    }
  };

  const getLevelWidth = (level) => {
    switch (level) {
      case 'Intermediário':
        return '66%';
      case 'Iniciante':
        return '33%';
      case 'Avançado':
        return '100%';
      default:
        return '0%';
    }
  };

  return (
    <section
      id="habilidades"
      className="section bg-bg-secondary"
      aria-labelledby="skills-title"
    >
      <div className="container">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-caption font-medium mb-4">
            Tecnologias
          </span>
          <h2 id="skills-title" className="section-title gradient-text">Minhas <span className="text-accent">Habilidades</span></h2>
          <p className="section-subtitle text-body-lg">
            Tecnologias com as quais trabalho, organizadas por área de atuação e nível de proficiência.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          role="tablist"
          aria-label="Filtrar habilidades por categoria"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.1 }}
        >
          {skillCategories.map((category) => {
            const Icon = categoryIcons[category.id];
            return (
              <motion.button
                key={category.id}
                role="tab"
                aria-selected={activeCategory === category.id}
                aria-controls="skills-panel"
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-radius-lg text-body-sm font-medium transition-all duration-fast ${
                  activeCategory === category.id
                    ? 'bg-accent text-bg-primary shadow-shadow-glow'
                    : 'bg-bg-card text-text-secondary hover:text-text-primary hover:bg-bg-cardHover border border-border'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                {category.name}
              </motion.button>
            );
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            id="skills-panel"
            role="tabpanel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOutExpo' }}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSkills.map((skill, index) => (
                <SkillCard
                  key={skill.id}
                  skill={skill}
                  index={index}
                  isExpanded={expandedSkills.has(skill.id)}
                  onToggle={() => toggleSkill(skill.id)}
                  getLevelColor={getLevelColor}
                  getLevelWidth={getLevelWidth}
                />
              ))}
            </div>

            <motion.div
              className="mt-12 p-6 rounded-radius-xl bg-bg-card border border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="font-display font-semibold text-heading-md text-text-primary mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-accent" aria-hidden="true" />
                Em Aprendizado Ativo
              </h3>
              <div className="flex flex-wrap gap-2">
                {['TypeScript', 'React Native', 'Next.js', 'Testes Automatizados', 'Docker', 'CI/CD', 'GraphQL', 'WebSockets'].map((tech) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1.5 rounded-radius bg-accent/10 border border-accent/20 text-body-sm text-accent font-medium"
                    whileHover={{ scale: 1.05, backgroundColor: 'var(--accent)', color: '#0A0F1A' }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function SkillCard({ skill, index, isExpanded, onToggle, getLevelColor, getLevelWidth }) {
  const Icon = skillIcons[skill.icon];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOutExpo', delay: index * 0.08 }}
      className="card group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accent/10 to-transparent rounded-bl-radius-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />

      <div className="relative flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-radius-lg bg-bg-tertiary border border-border flex items-center justify-center group-hover:border-accent/50 group-hover:bg-accent/10 transition-all duration-normal">
          {Icon ? <Icon className="w-6 h-6" style={{ color: skill.color }} aria-hidden="true" /> : <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display font-semibold text-heading-sm text-text-primary">{skill.name}</h3>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-radius text-caption font-medium ${getLevelColor(skill.level)}`}>
                {skill.level}
              </span>
            </div>
            <motion.button
              onClick={onToggle}
              className="p-1.5 rounded-radius text-text-muted hover:text-text-primary hover:bg-bg-tertiary transition-colors duration-fast flex-shrink-0"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-expanded={isExpanded}
              aria-label={isExpanded ? `Recolher detalhes de ${skill.name}` : `Expandir detalhes de ${skill.name}`}
            >
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </motion.button>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: -10 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 0 }}
                exit={{ opacity: 0, height: 0, marginTop: -10 }}
                transition={{ duration: 0.3, ease: 'easeOutExpo' }}
                className="mt-4 pt-4 border-t border-border"
              >
                <p className="text-body-sm text-text-secondary mb-4">{skill.description}</p>
                <div className="h-1.5 bg-bg-tertiary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-accent rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: getLevelWidth(skill.level) }}
                    transition={{ duration: 0.8, ease: 'easeOutExpo', delay: 0.2 }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/30 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOutExpo', delay: 0.3 + index * 0.08 }}
        style={{ transformOrigin: 'left' }}
        aria-hidden="true"
      />
    </motion.article>
  );
}