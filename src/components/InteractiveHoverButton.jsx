import React from 'react'
import './InteractiveHoverButton.css'

export default function InteractiveHoverButton({ 
  text, 
  onClick, 
  active = false, 
  success = false, 
  successText = "Message Sent ✓",
  fullWidth = false,
  large = false,
  type = "button"
}) {
  const displayText = success ? successText : text
  const blobClass = success ? 'ihb-blob success' : 'ihb-blob'
  
  return (
    <button 
      type={type}
      className={`ihb-btn ${active ? 'active' : ''} ${fullWidth ? 'full-width' : ''} ${large ? 'large' : ''} ${success ? 'is-success' : ''}`}
      onClick={onClick}
    >
      <div className={blobClass} />
      
      <span className="ihb-text-primary">
        {displayText}
      </span>
      
      <div className="ihb-text-hover">
        {displayText}
        {!success && (
          <svg className="ihb-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        )}
      </div>
    </button>
  )
}
