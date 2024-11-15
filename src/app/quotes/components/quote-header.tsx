'use client';

import Image from 'next/image'
import { Markazi_Text } from 'next/font/google'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const markaziText = Markazi_Text({
  subsets: ['latin'],
  weight: '700',
})

export default function QuoteHeader() {
  const pathname = usePathname()

  return (
    <header className="container fixed top-0 z-50 bg-background py-10 pr-10 w-full">
      <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto">
        <Link href="/quotes" className="inline-flex items-center gap-2">
          <Image
            src="/quotes-logo.svg"
            alt="logo"
            width={80}
            height={80}
            className="flex-shrink-0" // 이미지 크기 고정
          />
          <h2
            className={cn(
              markaziText.className,
              'text-2xl lg:text-4xl font-bold'
            )}
          >
            Allra Wisdom
          </h2>
        </Link>

        <Link
          className="font-semibold italic underline"
          href={pathname === '/quotes/favorites' ? '/quotes' : '/quotes/favorites'}
        >
          {pathname === '/quotes/favorites' ? 'Go to Quotes' : 'My Favorite'}
        </Link>
      </div>
    </header>
  )
}
