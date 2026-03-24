import { useEffect, useRef } from 'react'
import './Experience.css'
import SectionShader from '../components/SectionShader'

const EXPERIENCES = [
  {
    period: '2025 — 2026',
    role: 'AI Video Editor & Website Builder',
    company: 'Independent / Agency Projects',
    desc: 'Specializing in AI-powered video production and modern web development. Creating high-converting websites and immersive digital experiences tailored to client needs.',
    tags: ['Web Development', 'AI Editing', 'Web Design'],
  },
  {
    period: '2024',
    role: 'Video Editor & Social Media Handler',
    company: 'Marketing Agency & Freelance',
    desc: 'Managed full-cycle social media content, editing highly engaging short-form videos and driving account growth strategies across major platforms.',
    tags: ['Social Media', 'Content Strategy', 'Video Editing'],
  },
  {
    period: '2023',
    role: 'Freelance Video Editor',
    company: 'Agency Collaborations',
    desc: 'Started professional freelancing journey, actively collaborating with marketing agencies to deliver polished commercial and promotional content.',
    tags: ['Freelance', 'Commercials', 'Agency Projects'],
  },
  {
    period: 'College Days',
    role: 'Music Page Founder',
    company: 'Instagram Content Creator',
    desc: 'Created and organically grew a music page on Instagram, scaling it to generate millions of viral views and establishing a strong foundation in digital content algorithms.',
    tags: ['Viral Content', 'Page Growth', 'Curation'],
  },
]

export default function Experience() {
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
      { threshold: 0.1 }
    )

    const items = sectionRef.current?.querySelectorAll('.timeline-item, .experience-left')
    items?.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(30px)'
      el.style.transition = `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="experience section" id="experience" ref={sectionRef}>
      <SectionShader className="section-canvas-bg" />
      <div className="section-glass-layer" />
      <div className="container">
        <div className="experience-layout">
          <div className="experience-left">
            <span className="section-label">Experience</span>
            <h2 className="section-title">Journey</h2>
            <p className="experience-quote">
              "The best content doesn't just <em>look good</em> — it
              retains <em>brand identity</em> while pushing creative
              boundaries with <em>AI</em>."
            </p>
          </div>

          <div className="experience-timeline">
            {EXPERIENCES.map((exp, i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-period">{exp.period}</div>
                <h3 className="timeline-role">{exp.role}</h3>
                <div className="timeline-company">{exp.company}</div>
                <p className="timeline-desc">{exp.desc}</p>
                <div className="timeline-tags">
                  {exp.tags.map(tag => (
                    <span className="timeline-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
