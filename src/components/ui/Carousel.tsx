import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface CarouselProps {
	images: string[];
	className?: string;
}

export function Slider({ images, className }: CarouselProps) {
	return (
		<Swiper
			modules={[Navigation, Pagination, Autoplay]}
			slidesPerView={1}
			pagination={{
				clickable: true,
			}}
			navigation
			loop={images.length > 1}
			autoplay={images.length > 1 ? {
				delay: 2500,
				disableOnInteraction: false,
			} : false}
			className={className}
		>
			{images.map((src: string, index: number) => (
				<SwiperSlide key={`${index}`}>
					<div className="relative w-full h-[400px]">
						<Image
							src={src}
							fill
							priority={index === 0}
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							alt={`Slide ${index + 1}`}
							className="rounded-lg object-cover"
						/>
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	)
} 