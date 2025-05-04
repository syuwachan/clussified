import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Slider } from "./Carousel";

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
		<div className={cn(
			"max-w-[400px] h-[520px] m-2 p-8 border border-gray-200 rounded-xl shadow-sm bg-white transition-transform hover:-translate-y-1",
			className
		)}>
			{images.length > 0 ? (
				<Slider images={images} />
			) : null}

			<div className="mt-4">
				<div className="mb-6">
					<span className="inline-block px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-full">
						{tag}
					</span>
					<h3 className="mt-2 text-xl font-semibold text-gray-900">
						{title}
					</h3>
				</div>

				<div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg mb-6">
					<div>
						<p className="text-xs text-gray-500 uppercase tracking-wider">Author</p>
						<p className="text-sm font-medium text-gray-700">{authorName}</p>
					</div>
					<div>
						<p className="text-xs text-gray-500 uppercase tracking-wider">Date</p>
						<p className="text-sm font-medium text-gray-700">{date}</p>
					</div>
					<div>
						<p className="text-xs text-gray-500 uppercase tracking-wider">Location</p>
						<p className="text-sm font-medium text-gray-700">{location}</p>
					</div>
				</div>

				<div className="flex justify-center pt-4 border-t">
					<Button
						variant="default"
						onClick={onViewDetail}
						className="w-full"
					>
						View Detail
					</Button>
				</div>
			</div>
		</div>
	);
} 