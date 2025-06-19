// app/ads/[id]/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/lib/database.types'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Header from '@/components/Header'

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
			<div className="max-w-4xl mx-auto p-6">
				<h1 className="text-3xl font-bold mb-4 text-blue-700">{ad.title}</h1>
				<p className="text-gray-700 mb-4">{ad.description}</p>

				<div className="mb-6 text-sm text-gray-600 space-y-1">
					<p><strong>Category:</strong> {ad.category}</p>
					<p><strong>Location:</strong> {ad.location}</p>
					<p><strong>Posted by:</strong> {ad.contact_name}</p>
					<p><strong>Email:</strong> {ad.contact_email}</p>
					<p><strong>Phone:</strong> {ad.contact_phone}</p>
					<p><strong>Date:</strong> {new Date(ad.created_at).toLocaleDateString()}</p>
				</div>

				{ad.image_url && (
					<div className="mt-4">
						<Image
							src={ad.image_url}
							alt={ad.title}
							width={800}
							height={500}
							className="rounded-lg object-cover"
							unoptimized
						/>
					</div>
				)}
			</div>
		</>
	)
}