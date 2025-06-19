// app/ads/[id]/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/lib/database.types'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default async function AdDetailPage({ params }: { params: { id: string } }) {
	const supabase = createServerComponentClient<Database>({ cookies })
	const { data: ad, error } = await supabase
		.from('ads')
		.select('*')
		.eq('id', params.id)
		.single()

	if (!ad || error) {
		return notFound()
	}

	return (
		<>
			<Header />
			<div className="w-2/3 mx-auto mt-12 bg-white shadow-md rounded-lg overflow-hidden">
			{/* ヘッダー：画像＋タイトル重ねる */}
			<div className="relative h-80 w-full">
				<Image
					src={ad.image_url}
					alt={ad.title}
					fill
					className="object-cover w-full h-full"
					unoptimized
				/>
				<div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-6 w-full">
					<h1 className="text-3xl font-bold">{ad.title}</h1>
					<p className="text-sm mt-1">{new Date(ad.created_at).toLocaleDateString()} | {ad.category}</p>
				</div>
			</div>

			<div className="grid md:grid-cols-3 gap-8 p-8">
				{/* 左：詳細 */}
				<div className="md:col-span-2 space-y-6">
					<h2 className="text-2xl font-semibold text-gray-800">Description</h2>
					<p className="text-gray-700 leading-relaxed whitespace-pre-line">{ad.description}</p>
				</div>

				{/* 右：カードで情報まとめ */}
				<div className="bg-gray-50 p-6 rounded-lg shadow-inner space-y-4">
					<h3 className="text-xl font-semibold text-gray-800">Contact Info</h3>
					<div className="text-sm space-y-2 text-gray-700">
						<p><span className="font-medium">Posted by:</span> {ad.contact_name}</p>
						<p><span className="font-medium">Email:</span> {ad.contact_email}</p>
						<p><span className="font-medium">Phone:</span> {ad.contact_phone}</p>
						<p><span className="font-medium">Location:</span> {ad.location}</p>
					</div>
				</div>
			</div>

			{/* 下部ギャラリー（将来画像複数対応想定） */}
			{/* <div className="px-8 pb-8">
				<h3 className="text-lg font-semibold mb-4">Gallery</h3>
				<Image src={ad.image_url} alt="Gallery" width={400} height={300} className="rounded-md shadow" />
			</div> */}
		</div>
		<Footer />
		</>
	)
}