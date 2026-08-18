'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { ExternalLink, Star, Tag, Code2, Database, Server, Globe, Zap, Shield, Layers, GitBranch } from 'lucide-react';
import { projects, categories } from '../data/projects';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaPhp, FaLaravel, FaDatabase, FaPython, FaGitAlt, FaGithub } from 'react-icons/fa';
import { SiTailwindcss, SiVite, SiTypescript, SiExpress, SiPostgresql, SiStripe, SiVitest, SiStorybook, SiNextdotjs, SiMdx, SiContentful, SiVercel } from 'react-icons/si';

const techIcons = {
  React: FaReact,
  TypeScript: SiTypescript,
  'Tailwind CSS': SiTailwindcss,
  'React Query': Code2,
  Zustand: Zap,
  Recharts: Database,
  'React Table': Layers,
  'Framer Motion': Zap,
  'CSS Modules': FaCss3Alt,
  'Node.js': FaNodeJs,
  Express: SiExpress,
  PostgreSQL: SiPostgresql,
  Stripe: SiStripe,
  JWT: Shield,
  Vitest: SiVitest,
  Storybook: SiStorybook,
  Vite: SiVite,
  'CSS Variables': FaCss3Alt,
  'Socket.io': Server,
  IndexedDB: Database,
  Workbox: Globe,
  'Next.js': SiNextdotjs,
  MDX: SiMdx,
  Contentful: SiContentful,
  Vercel: SiVercel,
  HTML5: FaHtml5,
  CSS3: FaCss3Alt,
  JavaScript: FaJs,
  PHP: FaPhp,
  Laravel: FaLaravel,
  MySQL: FaDatabase,
  Python: FaPython,
  Git: FaGitAlt,
};

const categoryColors = {
  'Full Stack': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Frontend: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Library: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'Real-time': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  Content: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [expandedProject, setExpandedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'Todos') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const featuredProjects = useMemo(() => filteredProjects.filter((p) => p.featured), [filteredProjects]);
  const otherProjects = useMemo(() => filteredProjects.filter((p) => !p.featured), [filteredProjects]);

  const handleTechIcon = (tech) => {
    const Icon = techIcons[tech];
    return Icon ? <Icon className="w-5 h-5" aria-hidden="true" /> : <Code2 className="w-5 h-5" aria-hidden="true" />;
  };

  return (
    <section
      id="projetos"
      className="section"
      aria-labelledby="projects-title"
    >
      <div className="container">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-caption font-medium mb-4">
            Meus Trabalhos
          </span>
          <h2 id="projects-title" className="section-title gradient-text">Projetos <span className="text-accent">Destacados</span></h2>
          <p className="section-subtitle text-body-lg">
            Uma seleção de projetos que demonstram minha evolução e versatilidade como desenvolvedor.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          role="tablist"
          aria-label="Filtrar projetos por categoria"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.1 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              role="tab"
              aria-selected={activeCategory === category}
              aria-controls="projects-panel"
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-radius-lg text-body-sm font-medium transition-all duration-fast ${
                activeCategory === category
                  ? 'bg-accent text-bg-primary shadow-shadow-glow'
                  : 'bg-bg-card text-text-secondary hover:text-text-primary hover:bg-bg-cardHover border border-border'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            id="projects-panel"
            role="tabpanel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOutExpo' }}
            className="space-y-12"
          >
            {featuredProjects.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                <h3 className="font-display font-semibold text-heading-md text-text-primary flex items-center gap-3">
                  <Star className="w-6 h-6 text-accent" aria-hidden="true" />
                  Destaques
                </h3>
                <div className="grid lg:grid-cols-2 gap-6">
                  {featuredProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      isFeatured
                      handleTechIcon={handleTechIcon}
                      categoryColors={categoryColors}
                      onExpand={() => setExpandedProject(project.id)}
                      expanded={expandedProject === project.id}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {otherProjects.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h3 className="font-display font-semibold text-heading-md text-text-primary mb-8">Outros Projetos</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      index={index}
                      handleTechIcon={handleTechIcon}
                      categoryColors={categoryColors}
                      onExpand={() => setExpandedProject(project.id)}
                      expanded={expandedProject === project.id}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {filteredProjects.length === 0 && (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Code2 className="w-8 h-8 text-accent" aria-hidden="true" />
                </div>
                <h3 className="font-display font-medium text-heading-md text-text-primary mb-2">
                  Nenhum projeto encontrado
                </h3>
                <p className="text-text-secondary">
                  Tente selecionar outra categoria ou volte mais tarde.
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {expandedProject && (
          <ProjectModal
            project={projects.find((p) => p.id === expandedProject)}
            onClose={() => setExpandedProject(null)}
            handleTechIcon={handleTechIcon}
          />
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, index, isFeatured = false, handleTechIcon, categoryColors, onExpand, expanded }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOutExpo', delay: index * 0.1 } },
  };

  const displayImage = project.images?.[0] || project.image;

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={`relative card overflow-hidden group ${isFeatured ? 'lg:col-span-2' : ''}`}
      style={{ minHeight: isFeatured ? '480px' : 'auto' }}
    >
      <div className="aspect-video relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-bg-card to-bg-card" aria-hidden="true" />
        {displayImage && (
          <img
            src={displayImage}
            alt={`${project.name} - preview`}
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
            aria-hidden="true"
            loading="lazy"
          />
        )}
        {!displayImage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Code2 className="w-16 h-16 text-accent/30" aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="relative p-6 h-full flex flex-col">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2.5 py-1 rounded-radius text-caption font-medium border ${categoryColors[project.category] || categoryColors['Frontend']}`}>
                {project.category}
              </span>
              {project.featured && (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-radius text-caption font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Star className="w-3 h-3" aria-hidden="true" />
                  Destaque
                </span>
              )}
            </div>
            <h3 className="font-display font-semibold text-heading-md text-text-primary group-hover:text-accent transition-colors duration-fast line-clamp-1">
              {project.name}
            </h3>
          </div>
          <motion.button
            onClick={onExpand}
            className="p-2 rounded-radius-lg bg-bg-tertiary/50 border border-border hover:border-accent/50 hover:bg-bg-tertiary text-text-secondary hover:text-accent transition-all duration-fast flex-shrink-0"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Ver detalhes de ${project.name}`}
          >
            <Code2 className="w-5 h-5" aria-hidden="true" />
          </motion.button>
        </div>

        <p className="text-body text-text-secondary mb-6 flex-1 line-clamp-3">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-6" role="list" aria-label="Tecnologias utilizadas">
          {project.technologies.slice(0, isFeatured ? 8 : 5).map((tech) => (
            <motion.span
              key={tech}
              className="px-3 py-1.5 rounded-radius bg-bg-tertiary/50 border border-border text-body-sm text-text-secondary font-medium"
              whileHover={{ scale: 1.05, borderColor: 'var(--accent)', color: 'var(--accent)' }}
              role="listitem"
            >
              {handleTechIcon(tech)}
              <span className="ml-1.5">{tech}</span>
            </motion.span>
          ))}
          {project.technologies.length > (isFeatured ? 8 : 5) && (
            <motion.span
              className="px-3 py-1.5 rounded-radius bg-accent/10 border border-accent/20 text-body-sm text-accent font-medium"
              whileHover={{ scale: 1.05 }}
            >
              +{project.technologies.length - (isFeatured ? 8 : 5)}
            </motion.span>
          )}
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-border">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-radius-lg bg-bg-tertiary/50 border border-border text-body-sm text-text-secondary hover:border-accent/50 hover:text-accent hover:bg-accent/10 transition-all duration-fast group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label={`Ver código no GitHub - ${project.name}`}
            >
              <FaGithub className="w-4 h-4 group-hover:text-accent transition-colors" aria-hidden="true" />
              <span>Código</span>
            </motion.a>
          )}
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-radius-lg bg-accent/10 border border-accent/20 text-body-sm text-accent hover:bg-accent hover:text-bg-primary transition-all duration-fast group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label={`Ver demonstração - ${project.name}`}
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              <span>Demo</span>
            </motion.a>
          )}
        </div>
      </div>

      {isFeatured && (
        <motion.div
          className="absolute top-4 right-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + index * 0.1 }}
        >
          <Star className="w-6 h-6 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" aria-hidden="true" />
        </motion.div>
      )}
    </motion.article>
  );
}

function ProjectModal({ project, onClose, handleTechIcon }) {
  if (!project) return null;

  const images = project.images || (project.image ? [project.image] : []);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        className="absolute inset-0 bg-bg-primary/80 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-bg-card border border-border rounded-radius-2xl shadow-shadow-xl"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-4 right-4 z-10">
          <motion.button
            onClick={onClose}
            className="p-2 rounded-radius-lg bg-bg-tertiary/50 border border-border text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors duration-fast"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Fechar detalhes do projeto"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        </div>

        <div className="p-6 lg:p-8">
          {images.length > 0 && (
            <div className="mb-8 rounded-radius-xl overflow-hidden">
              <div className="aspect-video relative overflow-hidden">
                <motion.img
                  src={images[currentImageIndex]}
                  alt={`${project.name} - screenshot ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                {images.length > 1 && (
                  <>
                    <motion.button
                      onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-bg-primary/80 backdrop-blur-sm text-text-primary hover:bg-bg-primary hover:text-accent transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Imagem anterior"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </motion.button>
                    <motion.button
                      onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-bg-primary/80 backdrop-blur-sm text-text-primary hover:bg-bg-primary hover:text-accent transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Próxima imagem"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  </>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {images.map((img, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-16 h-10 rounded-radius overflow-hidden border-2 transition-all duration-fast ${
                        idx === currentImageIndex
                          ? 'border-accent scale-105'
                          : 'border-border/50 hover:border-accent/50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Ver imagem ${idx + 1}`}
                      aria-current={idx === currentImageIndex ? 'true' : 'false'}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-3 py-1 rounded-radius text-caption font-medium border ${categoryColors[project.category] || categoryColors['Frontend']}`}>
                  {project.category}
                </span>
                {project.featured && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-radius text-caption font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <Star className="w-3 h-3" aria-hidden="true" />
                    Destaque
                  </span>
                )}
              </div>
              <h2 id="modal-title" className="font-display font-bold text-display-md text-text-primary mb-2">{project.name}</h2>
            </div>
          </div>

          <div className="prose prose-invert max-w-none mb-8">
            <p className="text-body-lg text-text-secondary mb-4">{project.description}</p>
            {project.longDescription && (
              <p className="text-body text-text-secondary">{project.longDescription}</p>
            )}
          </div>

          <div className="mb-8">
            <h3 className="font-display font-medium text-heading-sm text-text-primary mb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-accent" aria-hidden="true" />
              Tecnologias
            </h3>
            <div className="flex flex-wrap gap-2" role="list" aria-label="Tecnologias do projeto">
              {project.technologies.map((tech) => (
                <motion.span
                  key={tech}
                  className="flex items-center gap-2 px-4 py-2 rounded-radius-lg bg-bg-tertiary/50 border border-border text-body-sm text-text-secondary"
                  whileHover={{ borderColor: 'var(--accent)', color: 'var(--accent)', transform: 'translateY(-2px)' }}
                  role="listitem"
                >
                  {handleTechIcon(tech)}
                  <span>{tech}</span>
                </motion.span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-6 border-t border-border">
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label={`Ver código no GitHub - ${project.name}`}
              >
                <FaGithub className="w-5 h-5" aria-hidden="true" />
                <span>Ver Código no GitHub</span>
              </motion.a>
            )}
            {project.demo && (
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label={`Ver demonstração - ${project.name}`}
              >
                <ExternalLink className="w-5 h-5" aria-hidden="true" />
                <span>Ver Demonstração</span>
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}