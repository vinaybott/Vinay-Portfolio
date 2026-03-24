import { useEffect, useRef } from 'react'
import './Hero.css'

export default function Hero() {
  const bgTextRef = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      const moveX = (clientX - centerX) / centerX
      const moveY = (clientY - centerY) / centerY

      // Parallax on background text
      if (bgTextRef.current) {
        bgTextRef.current.style.transform = `translate(calc(-50% + ${moveX * 30}px), calc(-50% + ${moveY * 15}px))`
      }
    }

    const section = sectionRef.current
    if (section) {
      section.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (section) {
        section.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  return (
    <section className="hero" id="hero" ref={sectionRef}>
      {/* Highly optimized, hardware-accelerated video background */}
      <video
        className="hero-video-bg"
        src="/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        webkit-playsinline="true"
        disablePictureInPicture
        preload="auto"
      />
      <div className="hero-video-dim" />

      {/* Background watermark */}
      <div className="hero-bg-text" ref={bgTextRef}>VINAY</div>

      {/* Bottom-left glassmorphism UI card */}
      <div className="hero-glass-card">
        <div className="hero-glass-card-border" />
        <span className="hero-card-label">AI Video Editor & Creative Storyteller</span>
        <h1 className="hero-card-title">
          Crafting Visual<br />Experiences
        </h1>
        <p className="hero-card-sub">
          Transforming ideas into cinematic stories through AI-powered editing,
          creative direction, and cutting-edge visual design.
        </p>
      </div>

      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}
