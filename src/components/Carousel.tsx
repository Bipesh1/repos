import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import Carousel, { Slider, SliderContainer, ThumsSlider } from '@/components/ui/blogcarousel';
import Image from 'next/image';

function CarouselSlider({ urls = [] }: { urls?: string[] }) {
  const OPTIONS: EmblaOptionsType = { loop: false };
  
  return (
    <div className='2xl:w-[70%] bg-background sm:w-[80%] w-[90%] mx-auto'>
      <Carousel options={OPTIONS} className='relative' isAutoPlay={true}>
        <SliderContainer className='gap-2'>
          {urls.map((url,index) => (
            <Slider
              key={index}
              className='xl:h-[400px] sm:h-[350px] h-[300px] w-full'
              thumnailSrc={url}
            >
              <Image
                src={url}
                width={1400}
                height={800}
                alt='image'
                className='h-full object-cover rounded-lg w-full'
              />
            </Slider>
          ))}
        </SliderContainer>
        <ThumsSlider />
      </Carousel>
    </div>
  );
}

export default CarouselSlider;