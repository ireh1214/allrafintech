import { useState, useEffect, useRef } from 'react'
import { allQuotes } from '../data/allQuotes'

export const useInfiniteQuotes = () => {
  const [visibleQuotes, setVisibleQuotes] = useState(allQuotes.slice(0, 3))
  const [quoteIndex, setQuoteIndex] = useState(5)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const loadMoreQuotes = () => {
    setVisibleQuotes((prevQuotes) => [
      ...prevQuotes,
      ...allQuotes.slice(quoteIndex, quoteIndex + 5),
    ])
    setQuoteIndex((prevIndex) => prevIndex + 5)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible') // `visible` 클래스 추가
          loadMoreQuotes()
        }
      },
      { threshold: 1.0 }
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current)
      }
    }
  }, [quoteIndex])

  return { visibleQuotes, loadMoreRef }
}
