import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, ChevronRight, Menu, X } from 'lucide-react'
import './App.css'

type Project = {
  number: string
  title: string
  category: string
  description: string
  technologies: string[]
  github?: string
  visual: 'drain' | 'gmail' | 'learning' | 'wildtrack' | 'battery'
}

const projects: Project[] = [
  { number: '01', title: 'DrainGuard AI', category: 'IoT / intelligent infrastructure', description: 'An IoT-based smart drainage monitoring system designed to detect blockages and rising water levels in real time.', technologies: ['ESP32', 'FastAPI', 'Random Forest', 'SQLite', 'REST APIs'], github: 'https://github.com/Kash1444/IOT-Based-Drainage-Blockage-Detection-System', visual: 'drain' },
  { number: '02', title: 'AI Gmail Assistant', category: 'Generative AI / retrieval', description: 'An AI-powered Gmail assistant using Gemini, semantic retrieval, and ChromaDB to work with email information.', technologies: ['Gemini', 'Python', 'ChromaDB', 'Semantic retrieval'], visual: 'gmail' },
  { number: '03', title: 'AI-enabled Learning Platform', category: 'Education / RAG', description: 'An AI-enabled learning platform focused on competency scoring, personalized training, retrieval-augmented generation, and MCQ generation.', technologies: ['FastAPI', 'RAG', 'ChromaDB', 'MCQ generation'], github: 'https://github.com/Kash1444/AI-enabled-learning-platform', visual: 'learning' },
  { number: '04', title: 'WILDTRACK', category: 'Embedded sensing / ML', description: 'An animal threat detection system combining machine learning with embedded sensing.', technologies: ['Machine Learning', 'Arduino', 'Thermal sensing', 'Wi-Fi'], visual: 'wildtrack' },
  { number: '05', title: 'EV Battery Range & Aging Predictor', category: 'Machine learning', description: 'A machine-learning project focused on predicting EV battery range and aging behavior.', technologies: ['Machine Learning'], visual: 'battery' },
]

const skillGroups = [
  ['Languages', 'Python', 'C', 'SQL'],
  ['Machine Learning / Data', 'scikit-learn', 'pandas', 'NumPy', 'Matplotlib'],
  ['Backend / AI', 'FastAPI', 'REST APIs', 'RAG', 'Vector databases', 'API integrations'],
  ['Cloud / DevOps', 'AWS', 'Git', 'GitHub', 'CI/CD', 'Docker', 'Linux'],
  ['Databases', 'MongoDB'],
  ['Other', 'Streamlit', 'Arduino', 'ESP32'],
]

const profiles = [
  ['GitHub', 'github.com/Kash1444', 'https://github.com/Kash1444'],
  ['LinkedIn', 'linkedin.com/in/prakashcodes', 'https://www.linkedin.com/in/prakashcodes/'],
  ['LeetCode', 'leetcode.com/u/Kash_144', 'https://leetcode.com/u/Kash_144/'],
  ['HackerRank', 'hackerrank.com/profile/dharmaprakash144', 'https://www.hackerrank.com/profile/dharmaprakash144'],
]

const navItems = ['about', 'projects', 'playground', 'experience', 'contact']

function Label({ number, children }: { number: string; children: string }) {
  return <div className="section-label"><span>{number}</span><span>{children}</span></div>
}

function FlowVisual({ type, playground = false }: { type: Project['visual'] | 'rag' | 'api' | 'system'; playground?: boolean }) {
  const nodes: Record<string, string[]> = {
    drain: ['FLOW 1', 'BLOCKAGE POINT', 'FLOW 2'],
    gmail: ['EMAIL', 'RETRIEVAL', 'CONTEXT', 'GEMINI', 'RESPONSE'],
    learning: ['LEARNER', 'ASSESSMENT', 'COMPETENCY GAP', 'TRAINING', 'EVALUATION'],
    wildtrack: ['THERMAL', 'ULTRASONIC', 'ML LAYER', 'ALERT'],
    battery: ['BATTERY DATA', 'FEATURES', 'PREDICTION'],
    rag: ['QUERY', 'EMBEDDING', 'VECTOR SEARCH', 'GROUNDED RESPONSE'],
    api: ['CLIENT', 'API ROUTE', 'SERVICE', 'DATABASE', 'RESPONSE'],
    system: ['SENSOR INPUT', 'DECISION LAYER', 'SYSTEM STATUS'],
  }
  return (
    <div className={`flow-visual ${playground ? 'playground-visual' : ''}`}>
      <div className="flow-topline">
        <span>{type === 'drain' ? 'CONCEPTUAL SYSTEM FLOW' : playground ? 'INTERACTIVE EXPLORATION' : 'TECHNICAL FLOW'}</span>
        <span>{type === 'drain' ? 'STATIC DIAGRAM' : 'HOVER TO TRACE'}</span>
      </div>
      <div className="flow-nodes">
        {nodes[type].map((node, i) => (
          <div className="flow-node-wrap" key={node}>
            <div className="flow-node">{node}</div>
            {i < nodes[type].length - 1 && <ChevronRight className="flow-arrow" size={14} />}
          </div>
        ))}
      </div>
      {type === 'drain' && <div className="flow-caption">ULTRASONIC WATER LEVEL<br />ESP32 → BLYNK → BACKEND → AI INTERPRETATION</div>}
      {type === 'gmail' && <div className="code-strip">semantic retrieval / grounded response</div>}
      {type === 'learning' && <div className="learning-bars"><i /><i /><i /><i /><i /></div>}
      {playground && <div className="flow-caption">VISUAL EXPLORATION, NOT A PRODUCTION SYSTEM</div>}
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [activeSkill, setActiveSkill] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState('about')
  const [cursor, setCursor] = useState({ x: -100, y: -100 })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const scroll = () => setProgress(window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight))
    const mouse = (event: MouseEvent) => setCursor({ x: event.clientX, y: event.clientY })
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id) })
    }, { rootMargin: '-35% 0px -55% 0px' })
    navItems.forEach((item) => { const section = document.getElementById(item); if (section) observer.observe(section) })
    window.addEventListener('scroll', scroll, { passive: true })
    window.addEventListener('mousemove', mouse)
    scroll()
    return () => {
      window.removeEventListener('scroll', scroll)
      window.removeEventListener('mousemove', mouse)
      observer.disconnect()
    }
  }, [])

  const reveal = { initial: { opacity: 0, y: reduceMotion ? 0 : 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-80px' }, transition: { duration: .7 } }
  const closeMenu = () => setMenuOpen(false)
  const navLink = (item: string) => <a className={activeSection === item ? 'active' : ''} href={`#${item}`} onClick={closeMenu} key={item}><span>{item}</span>{activeSection === item && <i />}</a>

  return <div className="site-shell">
    <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />
    {!reduceMotion && <div className="cursor-dot" style={{ transform: `translate3d(${cursor.x}px,${cursor.y}px,0)` }} />}
    <header className={`site-nav ${progress > .02 ? 'scrolled' : ''}`}>
      <a className="brand" href="#top" onClick={closeMenu}><span className="brand-mark">D</span><span>Dharmaprakash</span></a>
      <nav className="desktop-nav">{navItems.map(navLink)}</nav>
      <div className="nav-right"><a className="resume-link" href="https://drive.google.com/file/d/1na3jGWi_1t_SJf2qxv4bDE5RyFaAytF3/view?usp=sharing" target="_blank" rel="noopener noreferrer">Resume <ArrowUpRight size={14} /></a><button className="menu-button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button></div>
      {menuOpen && <nav className="mobile-nav">{navItems.map(navLink)}</nav>}
    </header>
    <main id="top">
      <section className="hero section-pad">
        <div className="hero-copy">
          <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .2 }}><span>01</span> AI × BACKEND × SYSTEMS</motion.p>
          <motion.h1 initial={{ opacity: 0, y: reduceMotion ? 0 : 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>Dharmaprakash<span className="accent-dot">.</span></motion.h1>
          <motion.p className="hero-statement" initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 }}>Building intelligent systems that connect <em>AI, APIs,</em> and the real world.</motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5 }}><a className="button button-primary" href="#projects">View projects <ArrowDownRight size={17} /></a><a className="text-link" href="#contact">Get in touch <ArrowUpRight size={15} /></a></motion.div>
        </div>
        <div className="system-map"><div className="map-kicker">SYSTEM MAP / 001</div><div className="map-line" />{['AI', 'BACKEND', 'DATA', 'PHYSICAL SYSTEMS', 'REAL-WORLD OUTPUT'].map((node, i) => <motion.div className={`map-node node-${i}`} key={node} initial={{ opacity: 0, x: reduceMotion ? 0 : 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .4 + i * .12 }}><span>0{i + 1}</span>{node}{i < 4 && <ChevronRight size={14} />}</motion.div>)}</div>
        <div className="hero-index">SCROLL TO EXPLORE <ArrowDownRight size={15} /></div>
      </section>
      <section id="about" className="section-pad about-section"><motion.div {...reveal}><Label number="02">About / identity</Label></motion.div><div className="about-grid"><motion.div {...reveal}><h2>Curious about the layer between <span className="serif">intelligence</span> and impact.</h2></motion.div><motion.div className="about-copy" {...reveal}><p>I’m Dharmaprakash, a Computer Science Engineering student focused on AI, backend development, machine learning, and intelligent systems.</p><p>I like understanding how ideas move from a model or API into a reliable system that someone can actually use.</p><div className="education-meta"><span>EDUCATION</span><strong>B.E. Computer Science &amp; Engineering</strong><span>KCG College of Technology · 2023–2027 · AI &amp; Data Science · CGPA 8.2 / 10</span></div></motion.div></div></section>
      <section className="section-pad skills-section"><motion.div {...reveal}><Label number="03">Tools / working set</Label></motion.div><div className="skills-header"><h2>A practical <span className="serif">stack.</span></h2><p>Tools I use to move from an experiment to a working system.</p></div><div className="skills-grid">{skillGroups.map((group) => <div className={`skill-group ${activeSkill && activeSkill !== group[0] ? 'dimmed' : ''}`} key={group[0]} onMouseEnter={() => setActiveSkill(group[0])} onMouseLeave={() => setActiveSkill(null)}><div className="skill-group-title"><span>{group[0]}</span><span>0{skillGroups.indexOf(group) + 1}</span></div>{group.slice(1).map((skill) => <span className="skill" key={skill}>{skill}</span>)}</div>)}</div></section>
      <section id="projects" className="projects-section"><div className="section-pad projects-heading"><motion.div {...reveal}><Label number="04">Selected work</Label></motion.div><motion.p {...reveal}>Projects where models, APIs, and physical inputs meet.</motion.p></div><div className="project-list">{projects.map((project) => <motion.article className="project-row" key={project.number} {...reveal}><div className="project-number">{project.number}</div><div className="project-info"><div className="project-category">{project.category}</div><h3>{project.title}</h3><p className="project-description">{project.description}</p><div className="tag-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>{project.github && <a className="project-link" href={project.github} target="_blank" rel="noopener noreferrer">Repository <ArrowUpRight size={14} /></a>}</div><FlowVisual type={project.visual} /></motion.article>)}</div></section>
      <section id="playground" className="section-pad playground-section"><motion.div {...reveal}><Label number="05">Technical playground</Label></motion.div><div className="playground-heading"><h2>Thinking in <span className="serif">flows.</span></h2><p>Visual explorations, not production systems.</p></div><div className="playground-grid"><FlowVisual type="rag" playground /><FlowVisual type="api" playground /><FlowVisual type="system" playground /></div></section>
      <section id="experience" className="section-pad timeline-section"><motion.div {...reveal}><Label number="06">Experience / proof points</Label></motion.div><div className="timeline"><div className="timeline-line"><motion.i initial={{ height: 0 }} whileInView={{ height: '100%' }} viewport={{ once: true }} transition={{ duration: 1.2 }} /></div><motion.div className="timeline-item" {...reveal}><div className="timeline-marker" /><div><div className="timeline-type">INTERNSHIP</div><h3>CloudQuest</h3><p>AI Engineer Intern</p><small>AI / backend-related work and bug fixes.</small></div></motion.div><motion.div className="timeline-item" {...reveal}><div className="timeline-marker" /><div><div className="timeline-type">ACHIEVEMENT / 2024</div><h3>Pitch Perfect</h3><p>KCG College of Technology · <strong>2nd Prize</strong></p><small>50+ teams</small></div></motion.div></div></section>
      <section className="section-pad profiles-section"><motion.div {...reveal}><Label number="07">Elsewhere</Label></motion.div><div className="profiles-layout"><h2>Find me <span className="serif">online.</span></h2><div className="profile-list">{profiles.map(([name, handle, href]) => <a className="profile-link" key={name} href={href} target="_blank" rel="noopener noreferrer"><span><strong>{name}</strong><small>{handle}</small></span><ArrowUpRight size={17} /></a>)}</div></div></section>
      <section id="contact" className="contact-section"><div className="section-pad"><motion.div {...reveal}><Label number="08">Contact / next step</Label></motion.div><div className="contact-content"><h2>Let’s build something <span className="serif">useful.</span></h2><a className="button button-primary" href="https://www.linkedin.com/in/prakashcodes/" target="_blank" rel="noopener noreferrer">Start a conversation <ArrowUpRight size={17} /></a></div></div></section>
    </main>
    <footer className="site-footer section-pad"><div><strong>Dharmaprakash</strong><p>AI × Backend × Systems</p></div><div className="footer-right"><a href="https://github.com/Kash1444" target="_blank" rel="noopener noreferrer">↗ GitHub</a><span>Built with React + TypeScript</span><span>© {new Date().getFullYear()}</span></div></footer>
  </div>
}

export default App
