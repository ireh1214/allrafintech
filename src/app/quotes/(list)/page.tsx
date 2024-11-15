'use client'
import { useInfiniteQuotes } from '@/app/quotes/hooks/use-infinite-quotes'
import { useFavoriteQuotes } from '@/app/quotes/hooks/use-favorite-quotes'
import { QuoteCard } from '@/app/quotes/components/quote-card'

export default function QuotesPage() {
  const { visibleQuotes, loadMoreRef } = useInfiniteQuotes()
  const { favoriteQuotes, toggleFavorite } = useFavoriteQuotes()

  // 즐겨찾기한 명언을 확인하는 함수를 useMemo로 메모이제이션 (성능 최적화 용도)
  const isFavorite = (quoteId: number) => 
    favoriteQuotes.some((favQuote: { id: number }) => favQuote.id === quoteId)

  return (
    <>
      {visibleQuotes.map((quote, index) => {
        const { id, quote: quoteText, author } = quote
        const isQuoteFavorite = isFavorite(id)

        return (
          <QuoteCard
            key={`${id}-${author}-${index}`} //key가 겹쳐는 이슈가 있기에 index 추가
            quote={quoteText}
            author={author}
            isFavorite={isQuoteFavorite}
            onFavorite={() => toggleFavorite(id)}  // onFavorite가 클릭되면 id를 전달해서 알림
          />
        )
      })}
      <div ref={loadMoreRef}></div>
    </>
  )
}
