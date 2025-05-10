import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/Carousel";
import "@/app/Card.css";
import Image from "next/image";

interface CardProps {
	className?: string;
	title: string;
	tag: string;
	authorName: string;
	date: string;
	location: string;
	images?: string[];
	onViewDetail?: () => void;
}

export function Card({
	className,
	title,
	tag,
	authorName,
	date,
	location,
	images = [],
	onViewDetail,
}: CardProps) {
	return (
		<div className={cn("card-container", className)}>
			{images.length > 0 ? (
				<div className="card-image-container">
					<Image
						src={images[0]}
						alt={title}
						width={400}
						height={300}
						className="object-cover w-full h-[300px] rounded-t-lg"
					/>
				</div>
			) : null}

			<div className="card-content">
				<div className="card-header">
					<span className="card-tag">{tag}</span>
					<h3 className="card-title">{title}</h3>
				</div>

				<div className="author-info">
					<div>
						<p>Author</p>
						<p className="author-name">{authorName}</p>
					</div>
					<div>
						<p>Date</p>
						<p className="author-date">{date}</p>
					</div>
					<div>
						<p>Location</p>
						<p className="author-location">{location}</p>
					</div>
				</div>

				<div className="card-info__container">
					<button
						className="btn-view-detail"
						onClick={onViewDetail}
					>
						View Detail
					</button>
				</div>
			</div>
		</div>
	);
} 