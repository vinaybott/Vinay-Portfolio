import { useEffect, useRef } from 'react'

export default function WaterRipple() {
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let ripples = []
    let animationId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    resize()

    const handleClick = (e) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        opacity: 0.5
      })
    }
    window.addEventListener('click', handleClick)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      ripples.forEach((ripple, index) => {
        ctx.beginPath()
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.opacity})`
        ctx.lineWidth = 2
        ctx.stroke()

        ripple.radius += 4
        ripple.opacity -= 0.01

        if (ripple.opacity <= 0) {
          ripples.splice(index, 1)
        }
      })
      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('click', handleClick)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999
      }} 
    />
  )
}
