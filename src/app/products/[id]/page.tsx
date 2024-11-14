'use client'

import { useEffect, useState } from 'react'
import { useProduct } from '@/app/products/[id]/hooks/use-product'

export interface ProductDetailPageProps {
  params: Promise<{ id: string }>  // params는 Promise로 전달됩니다.
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [id, setId] = useState<string | null>(null)

  // params를 비동기로
  useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id)
    })
  }, [params])

  const { data, isLoading, error } = useProduct(id || '')

  if (isLoading) return <div>Loading...</div>
  if (error) throw new Error(error.message)

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
