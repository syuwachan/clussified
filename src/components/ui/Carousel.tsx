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
			loop={true}
			autoplay={{
				delay: 2500,
				disableOnInteraction: false,
			}}
			className={className}
		>
			{images.map((src: string, index: number) => (
				<SwiperSlide key={`${index}`}>
					<Image
						src={src}
						layout="responsive"
						width={640}
						height={400}
						alt={`Slide ${index + 1}`}
						className="rounded-lg"
					/>
				</SwiperSlide>
			))}
		</Swiper>
	)
} 