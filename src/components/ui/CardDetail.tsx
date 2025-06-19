import Image from 'next/image'
import { cn } from '@/lib/utils'
import supabase from '@/lib/supabase';
import { useEffect } from 'react';

interface CardDetailProps {
	className?: string;
	title: string;
	authorName: string;
	date: string;
	location: string;
	description: string;
	price?: string;
	detailImages?: string[]
	created_at: string;
	listingId: string;
}

export function CardDetail({
	className,
	title,
	authorName,
	location,
	description,
	detailImages = [],
	created_at,
	listingId
}: CardDetailProps) {

	useEffect(() => {
		if (!listingId) return;  

		const fetchImages = async () => {
			const { data, error } = await supabase
				.from('images')
				.select('*')
				.eq('listing_id', listingId);

			if (error) {
				console.error('Error fetching images:', error);
			} else {
				console.log(data)
			}
		};

		fetchImages();
	}, [listingId]);


	return (
		<div className={cn("bg-white rounded-lg shadow-lg", className)}>
			{/* タイトル */}
			<h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">{title}</h1>
			{/* 投稿日 */}
			<p className="text-sm text-gray-500 text-center">{created_at}</p>
			{/* 画像 */}

			<div className="p-6">
				{/* タイトルセクション */}
				<div className="mb-6 flex">
					{detailImages.length > 0 && (
						<div className="relative h-[250px] w-[400px]">
							<Image
								src={detailImages[0]}
								fill
								priority
								sizes="(max-width: 768px) 100vw, (max-width: 1000px) 50vw, 33vw"
								alt={title}
								className="object-cover rounded-lg"
							/>
						</div>
					)}
					<div className="flex-1 ml-6">
						<p className=" text-gray-600 font-bold">Name</p>
						<p className="text-lg font-bold text-gray-800">{authorName}</p>
						<p className=" text-gray-600 font-bold mt-4">Location</p>
						<p className="text-lg font-bold text-gray-800 mb-6">{location}</p>
						<button
							className="w-full bg-[#3b82f6] hover:bg-blue-700 font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 mt-4 shadow-md hover:shadow-lg"
						>
							<span className="text-white">Contact Me</span>
						</button>
					</div>
				</div>
				<div className="mb-6">
					<p className="text-lg text-gray-600 font-bold mb-4">pictures</p>
					
					
					<div className='flex'>
					<div className="relative h-[100px] w-[150px]">
							<Image
								src={detailImages[0]}
								fill
								priority
								sizes="(max-width: 768px) 100vw, (max-width: 1000px) 50vw, 33vw"
								alt={title}
								className="object-cover pr-4"
							/>
						</div>
						<div className="relative h-[100px] w-[150px]">
							<Image
								src={detailImages[0]}
								fill
								priority
								sizes="(max-width: 768px) 100vw, (max-width: 1000px) 50vw, 33vw"
								alt={title}
								className="object-cover pr-4"
							/>
						</div>
						<div className="relative h-[100px] w-[150px]">
							<Image
								src={detailImages[0]}
								fill
								priority
								sizes="(max-width: 768px) 100vw, (max-width: 1000px) 50vw, 33vw"
								alt={title}
								className="object-cover pr-4"
							/>
						</div>
						<div className="relative h-[100px] w-[150px]">
							<Image
								src={detailImages[0]}
								fill
								priority
								sizes="(max-width: 768px) 100vw, (max-width: 1000px) 50vw, 33vw"
								alt={title}
								className="object-cover pr-4"
							/>
						</div>
						</div>
					
					
				</div>
				{/* メッセージ */}
				<div className="mb-6">
					<p className="text-lg text-gray-600 font-bold">Description</p>
					<p className="text-gray-800">{description}</p>
				</div>

				<div className="mb-6">
					<p className="text-lg text-gray-600 font-bold">Message</p>
					<form>
						<textarea
							placeholder=""
							className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
						/>
					</form>

					<button
						className="w-full bg-[#3b82f6] hover:bg-blue-700 font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 mt-4 shadow-md hover:shadow-lg"
					>
						<span className="text-white">Just Send Your question</span>
					</button>

				</div>

			</div>
		</div>
	)
}