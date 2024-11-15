import { useQuery } from '@tanstack/react-query'
import { getProduct } from '@/actions/get-product'
import { ProductDetail } from '@/schemas/product' // ProductDetail 타입 가져오기

export const useProduct = (id: string) => {
  return useQuery<ProductDetail>({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await getProduct(id)
      if (res.status === 'error') {
        throw new Error(res.error)
      }
      return res.data // ProductDetail 타입으로 처리
    },
  })
}
