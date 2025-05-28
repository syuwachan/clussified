import { cn } from "@/lib/utils";
import "@/app/Card.css";
import Image from "next/image";

interface CardProps {
	className?: string;
	title: string;
	authorName: string;
	date: string;
	location: string;
	images?: string[];
	onViewDetail?: () => void;
}

export function Card({
	className,
	title,
	authorName,
	date,
	location,
	images = [],
	onViewDetail,
}: CardProps) {
	return (
		<div className={cn("card-container flex", className)}>
			{images.length > 0 ? (
				<div className="card-image-container w-1/3">
					<Image
						src={images[0]}
						alt={title}
						width={300}
						height={300}
						className="object-cover w-full h-full rounded-l-lg"
					/>
				</div>
			) : null}

			<div className="card-content w-2/3 p-4">
				<div className="card-header">
					{/* <span className="card-tag">{tag}</span> */}
					<h3 className="card-title">{title}</h3>
					{/* <p className="card-tag">{tag}</p> */}
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