'use client'

import { useEffect, useState } from 'react'
import { useProduct } from '@/app/products/[id]/hooks/use-product'
import { Badge } from '@/components/ui/badge'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

export interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const [id, setId] = useState<string | null>(null)

  useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id)
    })
  }, [params])

  const { data, isLoading, error } = useProduct(id || '')

  if (isLoading) return <div>Loading...</div>
  if (error) throw new Error(error.message)

  if (!data) return <div>No product data available</div>

  return (
    <div className="product-detail w-full max-w-[1504px] mx-auto px-4">
      <section className="flex flex-col md:flex-row">
        {/* 상품 이미지 */}
        <div className="product-img mb-6 md:mb-0 md:w-1/2">
          {data.images?.length > 1 ? (
            <Swiper slidesPerView={1} className="w-full h-auto">
              {data.images.map((image, index) => (
                <SwiperSlide key={index} className="flex justify-center">
                  <img
                    src={image}
                    alt={`${data.title} image ${index + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <img
              src={data.thumbnail}
              alt={data.title}
              className="w-full h-auto object-cover"
            />
          )}
        </div>
        {/* 상품 정보 */}
        <div className="md:w-1/2 md:pl-8">
          <Badge variant={'destructive'}>{data.discountPercentage}% Sale</Badge>
          <h3 className="text-3xl font-bold mt-4">{data.title}</h3>
          <p className="text-xl font-semibold text-green-600 mt-2">
            ${data.price}
          </p>
          <p
            className={`mt-4 ${data.availabilityStatus === 'In Stock' ? 'text-green-500' : 'text-red-500'}`}
          >
            {data.availabilityStatus}
          </p>
          <p className="text-lg text-gray-700 mt-4">{data.description}</p>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 text-gray-600 text-center">
        {/* 카테고리 */}
        <div className="product-info-section">
          <p className="product-info-title">Category:</p>
          <p>{data.category}</p>
        </div>

        <div className="product-info-section">
          <p className="product-info-title">Brand:</p>
          <p>{data.brand}</p>
        </div>

        <div className="product-info-section">
          <p className="product-info-title">SKU:</p>
          <p>{data.sku}</p>
        </div>

        <div className="product-info-section">
          <p className="product-info-title">Dimensions:</p>
          {data.dimensions.width} x {data.dimensions.height} x{' '}
          {data.dimensions.depth} cm
        </div>

        {/* 배송 정보 */}
        <div className="product-info-section">
          <p className="product-info-title">Shipping:</p>
          <p>{data.shippingInformation}</p>
        </div>

        {/* 보증 정보 */}
        <div className="product-info-section">
          <p className="product-info-title">Warranty:</p>
          <p>{data.warrantyInformation}</p>
        </div>
      </section>

      {/* 리뷰 */}
      <div className="reviews mt-6">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        {data.reviews.length ? (
          data.reviews.map(({ reviewerName, date, comment, rating }, index) => (
            <div key={index} className="review mt-4 bg-white p-6 rounded-[4px]">
              <p className="font-semibold text-xl text-gray-800">
                {reviewerName}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                {new Date(date).toLocaleDateString()}
              </p>
              <p className="text-gray-700 mt-2">{comment}</p>
              <p className="mt-2 text-yellow-500 font-semibold">
                Rating: {rating} / 5
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No reviews yet</p>
        )}
      </div>

      {/* 반품 정책 */}
      <p className="mt-4 text-gray-600 text-sm">
        Return Policy: {data.returnPolicy}
      </p>
    </div>
  )
}
