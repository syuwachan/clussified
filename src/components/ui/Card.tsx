import { cn } from "@/lib/utils";
import "@/app/Card.css";
import Image from "next/image";

interface CardProps {
	className?: string;
	title: string;
	description: string;
	authorName: string;
	date: string;
	image: string;
	location: string;
	onViewDetail?: () => void;
}

export function Card({
	className,
	title,
	description,
	authorName,
	date,
	image,
	location,
	onViewDetail,
}: CardProps) {
	return (
		<div className={cn("card-container flex", className)}>

			<div className="card-content w-2/3 p-4">
				<div className="card-header">
					<h3 className="card-title text-xl font-semibold mb-2">{title}</h3>
					<p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
				</div>

				<div className="author-info grid grid-cols-3 gap-4 mb-4">
					<div>
						<p className="text-gray-500 text-sm">Author</p>
						<p className="author-name font-medium">{authorName}</p>
					</div>
					<div>
						<p className="text-gray-500 text-sm">Date</p>
						<p className="author-date font-medium">{date}</p>
					</div>
					<div>
						<p className="text-gray-500 text-sm">Location</p>
						<p className="author-location font-medium">{location}</p>
					</div>
				</div>

				<div className="card-image">
					<Image src={image} alt={title} width={100} height={100} />
				</div>

				<div className="card-info__container">
					<button
						className="btn-view-detail bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
						onClick={onViewDetail}
					>
						View Detail
					</button>
				</div>
			</div>
		</div>
	);
} 