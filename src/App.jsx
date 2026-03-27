import { useState, useEffect } from 'react'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Work from './sections/Work'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import './App.css'

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="app">
      {/* Page loader */}
      <div className={`page-loader ${isLoaded ? 'loaded' : ''}`}>
        <span className="loader-text">VINAY</span>
      </div>

      {/* Custom cursor */}
      <Cursor />

      {/* Dynamic Island navigation */}
      <Navbar />

      {/* Sections */}
      <main>
        <Hero />
        <About />
        <div className="section-divider" />
        <Services />
        <div className="section-divider" />
        <Skills />
        <div className="section-divider" />
        <Work />
        <div className="section-divider" />
        <Experience />
        <div className="section-divider" />
        <Contact />
      </main>
    </div>
  )
}
