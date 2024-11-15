import { useState, useEffect } from 'react'
import { allQuotes } from '../data/allQuotes'

export const useFavoriteQuotes = () => {
  const [favoriteQuotes, setFavoriteQuotes] = useState<any[]>([])
  // localStorage에서 명언들을 불러옴
  // 데이터는 자동으로 삭제되지 않고, 명시적으로 삭제하지 않는 한 영구적 유지됩니다!
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteQuotes')
    setFavoriteQuotes(storedFavorites ? JSON.parse(storedFavorites) : [])
  }, [])

  useEffect(() => {
    localStorage.setItem('favoriteQuotes', JSON.stringify(favoriteQuotes))
  }, [favoriteQuotes])

  const toggleFavorite = (quoteId: number) => {
    setFavoriteQuotes((prevFavorites: any[]) => {
      const isAlreadyFavorite = prevFavorites.some(
        (quote: { id: number }) => quote.id === quoteId
      )
      if (isAlreadyFavorite) {
        return prevFavorites.filter(
          (quote: { id: number }) => quote.id !== quoteId
        ) //즐겨찾기 되어있을 시 제거
      } else {
        const quoteToAdd = allQuotes.find((quote) => quote.id === quoteId)
        return quoteToAdd ? [...prevFavorites, quoteToAdd] : prevFavorites //추가
      }
    })
  }

  return { favoriteQuotes, toggleFavorite }
}
