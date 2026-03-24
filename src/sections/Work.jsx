import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import './Work.css'
import SectionShader from '../components/SectionShader'
import InteractiveHoverButton from '../components/InteractiveHoverButton'

const CATEGORIES = ['All', 'SaaS Videos', 'Product Ads', 'UGC Ads', 'Social Reels', 'Influencer Reels', 'Long-form']

const PROJECTS = [
  { title: 'Rectangular Container Production', category: 'Product Ads', desc: '3D assembly line animation for product manufacturing', letter: 'R', video: '/work-video-1.mp4' },
  { title: '100ml Container Advertisement', category: 'Product Ads', desc: 'Product ad created for Rudhra Industries', letter: '1', video: '/work-video-2.mp4', isVertical: true },
  { title: 'Brooklyn Stitch Promo', category: 'UGC Ads', desc: 'Dynamic website promo video for clothing brand', letter: 'B', video: '/work-video-3.mp4' },
  { title: 'Brooklyn Stitch Swans', category: 'Product Ads', desc: 'Conceptual 3D clothing brand design', letter: 'S', video: '/work-video-4.mp4', isVertical: true },
  { title: 'Lenscare Promo', category: 'Product Ads', desc: 'Product ad for eyewear brand Lenscare', letter: 'L', video: '/work-video-5.mp4', isVertical: true },
  { title: 'Lenscare Brown Edition', category: 'Product Ads', desc: 'Product ad for eyewear brand Lenscare', letter: 'L', video: '/work-video-6.mp4', isVertical: true, hideInAll: true },
  { title: 'Brew Buzz Instagram Reel', category: 'Social Reels', desc: 'Shot and edited dynamic vertical reel for Brew Buzz', letter: 'B', video: '/work-video-7.mp4', isVertical: true },
  { title: 'Glutathione Promo', category: ['UGC Ads', 'Social Reels', 'Influencer Reels'], desc: 'Product promotional video for Instagram ad', letter: 'G', video: '/work-video-8.mp4', isVertical: true },
  { title: 'Kalyani Influencer Reel', category: ['Social Reels', 'Influencer Reels'], desc: 'Vertical influencer reel for social media', letter: 'K', video: '/work-video-9.mp4', isVertical: true },
  { title: 'C&L Platform', category: 'SaaS Videos', desc: 'Promotional SaaS platform video', letter: 'C', video: '/work-video-10.mp4' },
  { title: 'Rudhra Diwali Promo', category: 'Social Reels', desc: 'Diwali promotional video for Rudhra Industries', letter: 'R', video: '/work-video-11.mp4', hideInAll: true },
  { title: 'Rudhra IML Label Ad', category: 'Product Ads', desc: 'IML label product advertisement for Rudhra Industries', letter: 'R', video: '/work-video-12.mp4', hideInAll: true },
  { title: 'Hinged Boxes Ad', category: 'Product Ads', desc: '3D product advertisement for hinged boxes', letter: 'H', video: '/work-video-13.mp4' },
  { title: 'D Construct', category: ['UGC Ads', 'Social Reels', 'Influencer Reels'], desc: 'Vertical influencer advertisement video', letter: 'D', video: '/work-video-14.mp4', isVertical: true, hideInAll: true },
  { title: 'Glasses Product Ad', category: 'Product Ads', desc: 'Product advertisement for manufacturing company', letter: 'G', video: '/work-video-15.mp4', ratio: '3:4', hideInAll: true },
  { title: 'Fashion Designer Reel', category: ['Social Reels', 'Influencer Reels', 'UGC Ads'], desc: 'Fashion Designer of the Year reel for Hindustan College', letter: 'F', video: '/work-video-16.mp4', isVertical: true }
]

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('All')
  const gridRef = useRef(null)
  
  // Fullscreen GSAP Video Modal State
  const [selectedProject, setSelectedProject] = useState(null)
  const [modalRect, setModalRect] = useState(null)
  
  const cardVideoRefs = useRef({})
  const modalContentRef = useRef(null)
  const modalBgRef = useRef(null)
  const modalCloseRef = useRef(null)

  const filtered = activeFilter === 'All'
    ? PROJECTS.filter(p => !p.hideInAll)
    : PROJECTS.filter(p => Array.isArray(p.category) ? p.category.includes(activeFilter) : p.category === activeFilter)

  // Stagger animation on cards
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.work-card')
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

    cards?.forEach((card, i) => {
      card.style.opacity = '0'
      card.style.transform = 'translateY(30px)'
      card.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`
      observer.observe(card)
    })

    return () => observer.disconnect()
  }, [activeFilter])

  // GSAP Modal Handlers
  const handleCardClick = (project, e) => {
    if (!project.video) return
    const rect = e.currentTarget.getBoundingClientRect()
    setModalRect(rect)
    // capture the current playback time of the thumbnail video to sync the fullscreen playback seamlessly
    const currentTime = cardVideoRefs.current[project.title]?.currentTime || 0
    setSelectedProject({ ...project, startTime: currentTime })
    document.body.style.overflow = 'hidden' // lock background scroll
  }

  const handleClose = () => {
    if (!selectedProject || !modalRect) return
    
    gsap.to(modalBgRef.current, {
      opacity: 0,
      backdropFilter: 'blur(0px)',
      duration: 0.4,
      ease: 'power2.in'
    })
    
    gsap.to(modalCloseRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3
    })
    
    gsap.to(modalContentRef.current, {
      top: modalRect.top,
      left: modalRect.left,
      width: modalRect.width,
      height: modalRect.height,
      borderRadius: '16px',
      duration: 0.5,
      ease: 'power3.inOut',
      onComplete: () => {
        setSelectedProject(null)
        setModalRect(null)
        document.body.style.overflow = '' // unlock background scroll
      }
    })
  }

  // Animate GSAP Modal In
  useEffect(() => {
    if (selectedProject && modalContentRef.current && modalRect) {
      gsap.set(modalBgRef.current, { opacity: 0, backdropFilter: 'blur(0px)' })
      gsap.set(modalCloseRef.current, { opacity: 0, y: -20 })
      gsap.set(modalContentRef.current, {
        top: modalRect.top,
        left: modalRect.left,
        width: modalRect.width,
        height: modalRect.height,
        borderRadius: '16px'
      })
      
      const isMobile = window.innerWidth < 768
      const isVertical = selectedProject.isVertical
      const isThreeFour = selectedProject.ratio === '3:4'
      
      let targetWidth, targetHeight, targetTop, targetLeft, targetAspectRatio;
      
      if (isThreeFour) {
        targetHeight = '85vh';
        targetWidth = 'calc(85vh * 3 / 4)';
        targetTop = '7.5vh';
        targetLeft = 'calc(50vw - (85vh * 3 / 8))';
        targetAspectRatio = '3/4';
      } else if (isVertical) {
        targetHeight = '85vh';
        targetWidth = 'calc(85vh * 9 / 16)';
        targetTop = '7.5vh';
        targetLeft = 'calc(50vw - (85vh * 9 / 32))';
        targetAspectRatio = '9/16';
      } else {
        targetWidth = isMobile ? '90vw' : '80vw';
        targetHeight = isMobile ? 'auto' : '80vh';
        targetTop = isMobile ? '20vh' : '10vh';
        targetLeft = isMobile ? '5vw' : '10vw';
        targetAspectRatio = isMobile ? '16/9' : 'auto';
      }
      
      gsap.to(modalBgRef.current, {
        opacity: 1,
        backdropFilter: 'blur(20px)',
        duration: 0.5,
        ease: 'power2.out'
      })
      
      gsap.to(modalContentRef.current, {
        top: targetTop,
        left: targetLeft,
        width: targetWidth,
        height: targetHeight,
        aspectRatio: targetAspectRatio,
        borderRadius: isMobile ? '16px' : '24px',
        duration: 0.7,
        ease: 'power3.inOut'
      })
      
      gsap.to(modalCloseRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        delay: 0.3,
        ease: 'back.out(1.5)'
      })
    }
  }, [selectedProject, modalRect])

  const modal = typeof document !== 'undefined' ? createPortal(
    <div className={`video-modal ${selectedProject ? 'active' : ''}`}>
      <div className="video-modal-bg" ref={modalBgRef} onClick={handleClose} />
      
      {selectedProject && (
        <>
          <div className="video-modal-close" ref={modalCloseRef} onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </div>
          
          <div className="video-modal-content" ref={modalContentRef}>
            <video 
              src={`${import.meta.env.BASE_URL}${selectedProject.video.replace(/^\//, '')}`} 
              autoPlay 
              loop 
              muted={false} 
              playsInline
              onLoadedMetadata={(e) => { e.target.currentTime = selectedProject.startTime }}
            />
          </div>
        </>
      )}
    </div>,
    document.body
  ) : null

  return (
    <section className="work section" id="work">
      <SectionShader className="section-canvas-bg" />
      <div className="section-glass-layer" />
      <div className="container">
        <div className="work-header">
          <span className="section-label">Portfolio</span>
          <h2 className="section-title">Selected Work</h2>
          <p className="section-subtitle">
            A curated selection of projects showcasing AI-powered video editing
            and creative content production.
          </p>
        </div>

        <div className="work-filters">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`work-category-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="work-grid" ref={gridRef}>
          {filtered.map((project, i) => (
            <div 
              className="work-card" 
              key={`${project.title}-${activeFilter}`}
              onClick={(e) => project.video ? handleCardClick(project, e) : null}
            >
              {project.video ? (
                <video
                  className="work-card-video"
                  src={`${import.meta.env.BASE_URL}${project.video.replace(/^\//, '')}`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  ref={el => cardVideoRefs.current[project.title] = el}
                  style={{ opacity: selectedProject?.title === project.title ? 0 : 1 }}
                />
              ) : (
                <div className="work-placeholder">{project.letter}</div>
              )}
              
              <div className="work-card-overlay">
                <span className="work-card-category">
                  {Array.isArray(project.category) ? project.category.join(' • ') : project.category}
                </span>
                <h3 className="work-card-title">{project.title}</h3>
                <p className="work-card-desc">{project.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {modal}
    </section>
  )
}
