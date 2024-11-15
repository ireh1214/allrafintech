import { useState, useEffect } from 'react'
import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { useProductsSearchParams } from '@/app/products/(list)/hooks/use-products-search-params'

export function ProductSearchInput({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { term, handleTermChange } = useProductsSearchParams()
  const [searchTerm, setSearchTerm] = useState(term || '')
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)

    if (debounceTimeout) {
      clearTimeout(debounceTimeout) // 기존 타이머를 취소
    }
    const newTimeout = setTimeout(() => {
      handleTermChange(e.target.value) // 0.5초 후에 검색어 처리
    }, 500)

    setDebounceTimeout(newTimeout) // 새로운 타이머 저장
  }

  useEffect(() => {
    if (term !== searchTerm) {
      setSearchTerm(term)
    }
  }, [term])

  return (
    <main className={cn('relative', className)} {...props}>
      <Input
        value={searchTerm}
        onChange={handleChange}
        className={'h-12 pl-12 text-base'}
        placeholder={'Search product'}
      />
      <SearchIcon className={'absolute left-3 top-1/2 -translate-y-1/2'} />
    </main>
  )
}
