'use client'

import Header from '@/components/Header'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import supabase from '../../../lib/supabase'
// import AdDetailPage from '@/app/ads/[slug]'

interface Ad {
	id: string
	title: string
	slug: string
	tag: string
	author_name: string
	location: string
	date: string
	imageUrls?: string
}

export default function BuySellTrade() {
	const [ads, setAds] = useState<Ad[]>([])
	const router = useRouter()

	useEffect(() => {
		const fetchAds = async () => {
			const { data, error } = await supabase.from('ads').select('*')
			console.log(data)
			if (error) {
				console.error('Error fetching ads:', error)
			} else {
				setAds(data)
				console.log(data)
			}
		}
		fetchAds()
	}, [])

	return (
		<>
			<Header />
			<div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
				{ads.map((ad) => (
					<Card
						key={ad.id}
						title={ad.title}
						tag={ad.tag}
						authorName={ad.author_name}
						date={ad.date}
						location={ad.location}
						images={ad.imageUrls ?? []}
						onViewDetail={() => router.push(`/ads/${ad.slug}`)}
					/>
				))}
			</div>
		</>
	)
}