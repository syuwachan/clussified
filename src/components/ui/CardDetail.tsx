import { cn } from "@/lib/utils";
import '@/app/ads/[id]/CardDetail.css';

interface CardDetailProps {
	className?: string;
	title: string;
	authorName: string;
	date: string;
	location: string;
	description: string;
	detailImages?: string[]
	price: number;
}

export function CardDetail({
	className,
	title,
	authorName,
	date,
	location,
	description,
	detailImages,
	price,
  }: CardDetailProps) {
	return(
		<div className={cn("card-container", className)}>
			<div>
				<h1>{title}</h1>
			</div>
			<div>
				<h2>{authorName}</h2>
				<p>{date}</p>
			</div>
			<div>
				<h3>{location}</h3>
			</div>
			<div>
				<h4>{price}</h4>
				<p>{detailImages}</p>
			</div>
			<div>
				<p>Message</p>
				<p>{description}</p>
			</div>
			<div>
				<button>Just Send your message</button>
			</div>
		</div>
	)
}