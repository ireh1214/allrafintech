'use client'
import { useFavoriteQuotes } from '@/app/quotes/hooks/use-favorite-quotes'
import { QuoteCard } from '@/app/quotes/components/quote-card'

export default function FavoriteQuotesPage() {
  const { favoriteQuotes, toggleFavorite } = useFavoriteQuotes()

  return (
    <div>
      <h1 className={'mb-4 text-3xl font-bold italic text-secondary-foreground'}>
        My Favorite
      </h1>
      <ul>
        {favoriteQuotes.length > 0 ? (
          favoriteQuotes.map((quote: any) => (
            <QuoteCard
              key={quote.id}
              quote={quote.quote}
              author={quote.author}
              isFavorite={true}
              onFavorite={() => toggleFavorite(quote.id)}
            />
          ))
        ) : (
          <li className="text-center text-lg">
            <p>아직 즐겨찾기한 명언이 없습니다. 멋진 즐겨찾기 명언을 추가해보세요!👍</p>
            <button onClick={() => window.history.back()} className="mt-4 text-blue-500">
              돌아가기
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}
