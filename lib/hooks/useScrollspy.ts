'use client'

import { useState, useEffect } from 'react'

export default function useScrollspy(ids: string[]) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { 
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0.1
      }
    )

    const elements = ids.map(id => document.getElementById(id)).filter(Boolean) as Element[]
    
    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [ids])

  return activeId
}
