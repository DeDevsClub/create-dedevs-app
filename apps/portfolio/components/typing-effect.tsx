"use client"

import { useEffect, useState, useRef } from "react"

interface TypingEffectProps {
  text: string
  typingSpeed?: number
  className?: string
  onComplete?: () => void
}

export function TypingEffect({ text, typingSpeed = 50, className = "", onComplete }: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let currentIndex = 0
    let timer: NodeJS.Timeout

    const typeNextCharacter = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.substring(0, currentIndex + 1))
        currentIndex++
        timer = setTimeout(typeNextCharacter, typingSpeed)
      } else {
        setIsTyping(false)
        if (onComplete) onComplete()
      }
    }

    typeNextCharacter()

    return () => {
      clearTimeout(timer)
    }
  }, [text, typingSpeed, onComplete])

  return (
    <div className={`font-mono ${className}`} ref={containerRef}>
      <span>{displayedText}</span>
      {isTyping && <span className="typing-cursor"></span>}
    </div>
  )
}

