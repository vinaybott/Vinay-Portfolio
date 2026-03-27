import { useEffect, useRef } from 'react'
import SectionShader from '../components/SectionShader'
import './Skills.css'

/* ── SVG Icons matched to each category ── */
const VideoWandIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 2l2 4 4 2-4 2-2 4-2-4-4-2 4-2z" />
    <path d="M5.5 10L7 13l3 1.5L7 16l-1.5 3L4 16l-3-1.5L4 13z" />
    <path d="M12 18l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" />
  </svg>
)

const BrainIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a6 6 0 0 0-6 6c0 1.66.68 3.16 1.76 4.24L12 16l4.24-3.76A6 6 0 0 0 12 2z" />
    <path d="M9 22h6" />
    <path d="M12 16v6" />
    <circle cx="8.5" cy="8" r="1" fill="currentColor" />
    <circle cx="15.5" cy="8" r="1" fill="currentColor" />
    <path d="M9 12s1.5 1 3 1 3-1 3-1" />
  </svg>
)

const FilmIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
    <line x1="7" y1="2" x2="7" y2="22" />
    <line x1="17" y1="2" x2="17" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="2" y1="7" x2="7" y2="7" />
    <line x1="2" y1="17" x2="7" y2="17" />
    <line x1="17" y1="7" x2="22" y2="7" />
    <line x1="17" y1="17" x2="22" y2="17" />
  </svg>
)

const SKILL_CATEGORIES = [
  {
    title: 'AI Video & Image Tools',
    icon: <VideoWandIcon />,
    tools: [
      'Nano', 'Banana', 'ImageFX', 'Whisk', 'Ideogram',
      'Leonardo AI', 'Veo 3.1', 'Hailuo Models', 'Runway ML',
      'Dream Machine (Luma Labs)', 'ElevenLabs', 'Google Mixboard'
    ]
  },
  {
    title: 'LLMs & AI Assistants',
    icon: <BrainIcon />,
    tools: [
      'Gemini', 'Claude', 'ChatGPT', 'Kimi 2.5', 'Grok',
      'Wispr Flow', 'Antigravity'
    ]
  },
  {
    title: 'Video Editing Software',
    icon: <FilmIcon />,
    tools: [
      'CapCut', 'DaVinci Resolve'
    ]
  }
]

export default function Skills() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'translateY(0)'
          }
        })
      },
      { threshold: 0.05 }
    )

    const elements = sectionRef.current?.querySelectorAll('.skills-category, .skills-header')
    elements?.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(30px)'
      el.style.transition = `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="skills section" id="skills" ref={sectionRef}>
      <SectionShader className="section-canvas-bg" />
      <div className="section-glass-layer" />
      <div className="container">
        <div className="skills-header">
          <span className="section-label">Skills & Tools</span>
          <h2>My AI Arsenal</h2>
          <p className="skills-subtitle">
            The creative toolkit behind every frame — from generative AI to professional editing suites.
          </p>
        </div>

        <div className="skills-grid">
          {SKILL_CATEGORIES.map((category) => (
            <div className="skills-category" key={category.title}>
              <div className="skills-category-header">
                <span className="skills-category-icon">{category.icon}</span>
                <h3>{category.title}</h3>
              </div>
              <div className="skills-pills">
                {category.tools.map((tool) => (
                  <span className="skill-pill" key={tool}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
