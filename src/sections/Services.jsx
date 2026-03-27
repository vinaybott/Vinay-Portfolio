import { useEffect, useRef } from 'react'
import './Services.css'
import SectionShader from '../components/SectionShader'

const SERVICES = [
  {
    icon: (
      <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 7l-7 5 7 5V7z" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        <path d="M10 2v2" />
        <path d="M14 6h2" />
      </svg>
    ),
    title: 'AI Video Editing',
    desc: 'Using AI as a powerful tool to accelerate precision editing, while human creativity and direction remain the true driving force behind hand-crafting every visual to elevate your story.',
    num: '01',
  },
  {
    icon: (
      <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
        <path d="M12 18h.01"/>
        <path d="M12 9a2 2 0 0 1 2 2c0 1.5-2 3-2 3s-2-1.5-2-3a2 2 0 0 1 2-2z" />
      </svg>
    ),
    title: 'UGC Ads Creation',
    desc: 'AI-driven storytelling for user-generated content ads that feel authentic, convert audiences, and scale effortlessly.',
    num: '02',
  },
  {
    icon: (
      <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <path d="M3.27 6.96L12 12.01l8.73-5.05" />
        <path d="M12 22.08V12" />
      </svg>
    ),
    title: 'Product Ad Creation',
    desc: 'AI-powered product advertisements that maintain brand identity while pushing creative boundaries beyond traditional production.',
    num: '03',
  },
  {
    icon: (
      <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
        <line x1="7" y1="2" x2="7" y2="22" />
        <line x1="17" y1="2" x2="17" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="2" y1="7" x2="7" y2="7" />
        <line x1="2" y1="17" x2="7" y2="17" />
        <line x1="17" y1="17" x2="22" y2="17" />
        <line x1="17" y1="7" x2="22" y2="7" />
      </svg>
    ),
    title: 'SaaS & Marketing',
    desc: 'Conversion-focused videos for tech products',
    num: '04',
  },
  {
    icon: (
      <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z"/>
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
        <path d="M2 2l7.586 7.586"/>
        <circle cx="11" cy="11" r="2"/>
      </svg>
    ),
    title: 'Graphic Design',
    desc: 'Clean, minimal design work for thumbnails, social assets, and brand materials that complement your video content.',
    num: '05',
  },
  {
    icon: (
      <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    ),
    title: 'Website Building',
    desc: 'Modern, high-performance web development with immersive 3D experiences and clean, scalable code.',
    num: '06',
  },
]

export default function Services() {
  const gridRef = useRef(null)

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.service-card')

    // Mouse spotlight effect
    const handleMouseMove = (e) => {
      cards?.forEach(card => {
        const rect = card.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        card.style.setProperty('--mouse-x', `${x}%`)
        card.style.setProperty('--mouse-y', `${y}%`)
      })
    }

    // Scroll reveal
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

    cards?.forEach((card, i) => {
      card.style.opacity = '0'
      card.style.transform = 'translateY(40px)'
      card.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s, background 0.3s ease, border-color 0.3s ease`
      observer.observe(card)
    })

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      observer.disconnect()
    }
  }, [])

  return (
    <section className="services section" id="services">
      <SectionShader className="section-canvas-bg" />
      <div className="section-glass-layer" />
      <div className="container">
        <div className="services-header">
          <span className="section-label">Services</span>
          <h2 className="section-title">What I do</h2>
          <p className="section-subtitle">
            End-to-end creative solutions powered by artificial intelligence
            and refined by human storytelling instinct.
          </p>
        </div>

        <div className="services-grid" ref={gridRef}>
          {SERVICES.map(service => (
            <div className="service-card" key={service.num}>
              <div className="service-icon">{service.icon}</div>
              <div className="service-number">{service.num}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
