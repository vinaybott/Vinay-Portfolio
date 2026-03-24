import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionShader from '../components/SectionShader'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

const SKILLS = [
  { name: 'Video Editing', desc: 'Cinematic cuts, color grading, motion graphics', num: '01' },
  { name: 'AI Image Generation', desc: 'Creating hyper-realistic visuals with AI tools', num: '02' },
  { name: 'Product Ads (AI)', desc: 'Brand-first product advertisements powered by AI', num: '03' },
  { name: 'SaaS & Marketing', desc: 'Conversion-focused videos for tech products', num: '04' },
]

const AVATAR_CARDS = [
  {
    id: 'edu',
    img: '1.png',
    label: 'EDUCATION',
    title: 'IIITDM Kancheepuram',
    desc: 'B.Tech in Computer Science & Engineering — Indian Institute of Information Technology, Design and Manufacturing, Kancheepuram.'
  },
  {
    id: 'about',
    img: '2.png',
    label: 'WHO I AM',
    title: 'Video Editor & AI Creative',
    desc: 'Freelance video editor specializing in AI-generated content, brand films, product ads, and UGC — crafting visual stories that convert and captivate.'
  },
  {
    id: 'social',
    img: '3.png',
    label: 'SOCIAL',
    title: '13K+ Instagram Followers',
    desc: "Follow my editing journey — behind-the-scenes reels, AI creative experiments, and motion work that's growing an engaged visual community.",
    link: 'https://www.instagram.com/mrvny_/',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px', marginBottom: '2px' }}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    )
  }
]

export default function About() {
  const sectionRef = useRef(null)
  const photoRef = useRef(null)
  const headingRef = useRef(null)
  const avatarRefs = useRef([])

  useEffect(() => {
    // Scroll-based blur on background images
    const avatars = avatarRefs.current.filter(Boolean)
    avatars.forEach((avatar) => {
      // Start blurred, become clear on scroll into view
      gsap.set(avatar, { filter: 'blur(8px)', opacity: 0.5 })

      ScrollTrigger.create({
        trigger: avatar,
        start: 'top 80%',
        end: 'top 30%',
        scrub: 1,
        onUpdate: (self) => {
          const blur = 8 - self.progress * 8
          const opacity = 0.5 + self.progress * 0.5
          gsap.set(avatar, {
            filter: `blur(${blur}px)`,
            opacity,
          })
        },
      })
    })

    // Hover effect — GSAP Timeline sequences
    avatars.forEach((avatar) => {
      const img = avatar.querySelector('.avatar-img')
      const overlay = avatar.querySelector('.avatar-overlay')
      const content = avatar.querySelector('.avatar-content')

      gsap.set(img, { scale: 1.0 })
      gsap.set(overlay, { backgroundColor: 'rgba(5, 8, 20, 0.0)', backdropFilter: 'blur(0px)' })
      gsap.set(content, { opacity: 0, y: 20 })

      let tlIn, tlOut

      const onEnter = () => {
        if (tlOut) tlOut.kill()
        
        // Clear background scroll blur
        gsap.to(avatar, { filter: 'blur(0px)', opacity: 1, duration: 0.4 })
        
        tlIn = gsap.timeline()
        tlIn.to(avatar, { width: 420, duration: 0.55, ease: 'power3.out' }, 0)
        tlIn.to(img, { scale: 1.08, duration: 0.55, ease: 'power3.out' }, 0)
        tlIn.to(overlay, { backgroundColor: 'rgba(5, 8, 20, 0.72)', backdropFilter: 'blur(12px)', duration: 0.45 }, 0)
        tlIn.to(content, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, 0.2)
      }

      const onLeave = () => {
        if (tlIn) tlIn.kill()

        // Restore scroll blur
        const trigger = ScrollTrigger.getAll().find(t => t.trigger === avatar)
        if (trigger) {
          const blur = 8 - trigger.progress * 8
          const opacity = 0.5 + trigger.progress * 0.5
          gsap.to(avatar, { filter: `blur(${blur}px)`, opacity, duration: 0.4 })
        }

        tlOut = gsap.timeline()
        tlOut.to(content, { opacity: 0, y: 16, duration: 0.25, ease: 'power2.in' })
        tlOut.to(overlay, { backgroundColor: 'rgba(5, 8, 20, 0.0)', backdropFilter: 'blur(0px)', duration: 0.3 })
        tlOut.to(img, { scale: 1.0, duration: 0.5, ease: 'power3.out' }, '-=0.1')
        tlOut.to(avatar, { width: 200, duration: 0.5, ease: 'power3.out' }, '<')
      }

      avatar.addEventListener('mouseenter', onEnter)
      avatar.addEventListener('mouseleave', onLeave)
    })

    // Reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll('.about-bio, .skill-item, .about-stats, .about-photo-card')
    elements?.forEach(el => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(30px)'
      el.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
      observer.observe(el)
    })

    // Stagger skill items
    const skills = sectionRef.current?.querySelectorAll('.skill-item')
    skills?.forEach((el, i) => {
      el.style.transitionDelay = `${i * 0.1}s`
    })

    // Heading GSAP animation
    if (headingRef.current) {
      const words = headingRef.current.querySelectorAll('.about-heading-word');
      gsap.fromTo(words, 
        { 
          scale: 0.4, 
          opacity: 0, 
          filter: 'blur(12px)' 
        },
        {
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          stagger: 0.18,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play reverse play reverse'
          }
        }
      );
    }

    return () => {
      observer.disconnect()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  // Add revealed styles
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`
    document.head.appendChild(style)
    return () => style.remove()
  }, [])

  return (
    <section className="about section" id="about" ref={sectionRef}>
      <SectionShader className="section-canvas-bg" />
      <div className="section-glass-layer" />
      <div className="container">
        {/* Photo highlight section */}
        <div className="about-photo-section">
          <div className="about-photo-card" ref={photoRef}>
            <div className="about-photo-glass-border" />
            <img src={`${import.meta.env.BASE_URL}my-pic.png`} alt="Vinay" className="about-photo-img" />
            <div className="about-photo-info">
              <h3>Vinay</h3>
              <span>AI Video Editor</span>
            </div>
          </div>
          <div className="about-avatar-gallery">
            {AVATAR_CARDS.map((card, i) => (
              <div
                className="avatar-item"
                key={card.id}
                ref={(el) => (avatarRefs.current[i] = el)}
                onClick={() => card.link && window.open(card.link, '_blank', 'noopener,noreferrer')}
              >
                <img src={`${import.meta.env.BASE_URL}images/${card.img}`} alt={card.title} className="avatar-img" />
                <div className="avatar-overlay">
                  <div className="avatar-content">
                    <div className="avatar-label">
                      {card.icon}{card.label}
                    </div>
                    <h4 className="avatar-title">{card.title}</h4>
                    <p className="avatar-desc">{card.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* About content */}
        <div className="about-grid">
          <div className="about-bio">
            <span className="section-label">About</span>
            <h2 ref={headingRef}>
              <span className="about-heading-word" style={{ display: 'inline-block' }}>Creating</span>{' '}
              <span className="about-heading-word" style={{ display: 'inline-block' }}>the</span>{' '}
              <span className="about-heading-word" style={{ display: 'inline-block' }}>future</span>{' '}
              <span className="about-heading-word" style={{ display: 'inline-block' }}>of</span>{' '}
              <span className="about-heading-word" style={{ display: 'inline-block' }}>visual</span>{' '}
              <span className="about-heading-word" style={{ display: 'inline-block' }}>content</span>
            </h2>
            <p>
              I'm Vinay — an <span className="highlight-text">AI Video Editor</span> and
              creative storyteller who bridges the gap between cutting-edge AI technology
              and compelling visual narratives.
            </p>
            <p>
              Specializing in AI-powered content creation, I've produced marketing videos,
              SaaS product demos, UGC ads, and long-form content for agencies and brands
              who demand <span className="highlight-text">premium quality without compromising brand identity</span>.
            </p>

            <div className="about-stats">
              <div>
                <div className="stat-number">100+</div>
                <div className="stat-label">Projects</div>
              </div>
              <div>
                <div className="stat-number">6+</div>
                <div className="stat-label">Brands</div>
              </div>
              <div>
                <div className="stat-number">3+</div>
                <div className="stat-label">Years</div>
              </div>
            </div>
          </div>

          <div className="about-skills">
            {SKILLS.map(skill => (
              <div className="skill-item" key={skill.num}>
                <div className="skill-number">{skill.num}</div>
                <div className="skill-name">{skill.name}</div>
                <div className="skill-desc">{skill.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
