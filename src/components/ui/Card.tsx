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
		<div
			className={cn(
				"flex flex-col w-1/2 md:flex-row bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 mb-4",
				className
			)}
		>
			<div className="relative
			md:w-1/3 h-64 md:h-auto">
				<Image
					src={image}
					alt={title}
					fill
					className="object-cover hover:scale-100 transition-transform duration-300"
					unoptimized
				/>
			</div>

			<div className="p-8 flex flex-col justify-between w-full md:w-2/3 space-y-6">
				<div>
					<div className="flex justify-between items-start mb-4">
						<h3 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">{title}</h3>
					</div>
					<p className="text-gray-600 text-sm mb-6 line-clamp-2">{description}</p>

					<div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm text-gray-600">
						<div>
							<p className="text-gray-400 text-xs uppercase mb-1">Author</p>
							<p className="font-medium">{authorName}</p>
						</div>
						<div>
							<p className="text-gray-400 text-xs uppercase mb-1">Date</p>
							<p className="font-medium">{date}</p>
						</div>
						<div>
							<p className="text-gray-400 text-xs uppercase mb-1">Location</p>
							<p className="font-medium">{location}</p>
						</div>
					</div>
				</div>

				<div className="flex justify-center">
					<button
						className="w-full sm:w-auto bg-blue-500 text-white px-6 py-2.5 rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-colors duration-200 font-medium text-sm"
						onClick={onViewDetail}
					>
						View Detail
					</button>
				</div>
			</div>
		</div>
	);
} 