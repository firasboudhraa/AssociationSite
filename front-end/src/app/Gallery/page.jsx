'use client'

import { useState } from 'react'
import Image from 'next/image'
import Navbar from '@/components/molecules/nav'
import Footer from '@/components/molecules/Footer'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

import images from '@/lib/images'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

export default function Page() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const imageList = Object.entries(images).map(([key, value]) => ({ src: value, alt: key }))

  return (
    <div>
      <Navbar />
      <section className='min-h-screen bg-[var(--bgSoft)] py-12'>
        <div className='container'>
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{
              swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
            }}
            modules={[FreeMode, Navigation, Thumbs]}
            className='h-96 w-96 rounded-lg'
          >
            {imageList.map((image, index) => (
              <SwiperSlide key={index}>
                <div className='flex h-full w-full items-center justify-center'>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    className='block h-full w-full object-cover'
                    width={500}
                    height={300}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={12}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className='thumbs mt-3 h-32 w-full rounded-lg'
          >
            {imageList.map((image, index) => (
              <SwiperSlide key={index}>
                <button className='flex h-full w-full items-center justify-center'>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    className='block h-full w-full object-cover'
                    width={100}
                    height={60}
                  />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <Footer />
    </div>
  )
}
