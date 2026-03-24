import { useEffect, useRef, useCallback } from 'react'
import './Cursor.css'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const raf = useRef(null)

  const animate = useCallback(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Ring follows with smooth lag
    ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15
    ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15

    dot.style.left = `${pos.current.x}px`
    dot.style.top = `${pos.current.y}px`
    ring.style.left = `${ringPos.current.x}px`
    ring.style.top = `${ringPos.current.y}px`

    raf.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window) return

    const handleMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseEnter = () => {
      dotRef.current?.classList.add('hovering')
      ringRef.current?.classList.add('hovering')
    }

    const handleMouseLeave = () => {
      dotRef.current?.classList.remove('hovering')
      ringRef.current?.classList.remove('hovering')
    }

    window.addEventListener('mousemove', handleMouseMove)
    raf.current = requestAnimationFrame(animate)

    // Add hover listeners to interactive elements
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, input, textarea, .glass-card, .work-card, .service-card')
      interactives.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter)
        el.addEventListener('mouseleave', handleMouseLeave)
      })
    }

    // Observe DOM changes to add listeners to new elements
    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })
    addHoverListeners()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(raf.current)
      observer.disconnect()
    }
  }, [animate])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
