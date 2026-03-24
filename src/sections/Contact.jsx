import { useEffect, useRef, useState } from 'react'
import './Contact.css'
import SectionShader from '../components/SectionShader'
import InteractiveHoverButton from '../components/InteractiveHoverButton'
import { Instagram, Linkedin, Youtube, AtSign, Mail } from 'lucide-react'

const XLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
)

export default function Contact() {
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSuccess, setIsSuccess] = useState(false)

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

    const elements = sectionRef.current?.querySelectorAll('.contact-left, .contact-form, .footer')
    elements?.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(30px)'
      el.style.transition = `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: "dc52bae6-40f4-410f-90c3-1b931c39f2ec",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Inquiry from ${formData.name}`,
          from_name: "Vinay Portfolio Contact",
        })
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true)
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => {
          setIsSuccess(false)
        }, 3000)
      } else {
        alert("There was an issue sending your message. Please try again.")
      }
    } catch (error) {
      console.error(error)
      alert("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="contact section" id="contact" ref={sectionRef}>
      <SectionShader className="section-canvas-bg" />
      <div className="section-glass-layer" />
      <div className="container">
        <div className="contact-layout">
          <div className="contact-left">
            <span className="section-label">Contact</span>
            <h2>Let's create<br />something incredible</h2>
            <p>
              Have a project in mind? I'd love to hear about it.
              Whether it's a brand video, product ad, or something entirely new —
              let's bring your vision to life.
            </p>
            <div className="contact-socials">
              <a href="https://www.instagram.com/mrvny_/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                <Instagram />
              </a>
              <a href="https://www.linkedin.com/in/vinay-kumar-26163836b/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <Linkedin />
              </a>
              <a href="https://www.youtube.com/@mrvny" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="YouTube">
                <Youtube />
              </a>
              <a href="https://x.com/mrvny__" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="X">
                <XLogo />
              </a>
              <a href="https://www.threads.com/@mrvny_" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Threads">
                <AtSign />
              </a>
              <a href="mailto:vinaybot0322@gmail.com" className="social-link" aria-label="Email">
                <Mail />
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>

            <div className="form-group">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                id="contact-name"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                id="contact-email"
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                id="contact-message"
              />
            </div>
            <InteractiveHoverButton 
              type="submit" 
              text="Send Message" 
              success={isSuccess} 
              fullWidth={true} 
              large={true} 
            />
          </form>
        </div>

        <footer className="footer">
          <div className="footer-text">
            © 2026 VINAY. All rights reserved.
          </div>
          <div className="footer-links">
            <a href="#hero">Top</a>
            <a href="#work">Work</a>
            <a href="#contact">Contact</a>
          </div>
        </footer>
      </div>
    </section>
  )
}
