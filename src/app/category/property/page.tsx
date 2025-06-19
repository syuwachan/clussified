'use client'

import Header from '@/components/Header'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import supabase from '../../../lib/supabase'
import { SearchBar } from '@/components/ui/SearchBar'
import AdDetailPage from '@/app/ads/page'

interface Ad {
	id: string
	title: string
	slug: string
	image_url: string
	contact_name: string
	description: string
	location: string
	created_at: string
	imageUrls: string
}

export default function BuySellTrade() {
	const [ads, setAds] = useState<Ad[]>([])
	const router = useRouter()

	useEffect(() => {
		const fetchAds = async () => {
			const { data, error } = await supabase.from('ads').select('*')
			if (error) {
				console.error('Error fetching ads:', error)
			} else {
				setAds(data)
			}
		}
		fetchAds()
	}, [])

	return (
		<>
			<Header />
			<SearchBar />
			<div className="flex flex-col items-center gap-6 p-6">
				{ads.map((ad) => (
					<Card
						key={ad.id}
						title={ad.title}
						authorName={ad.contact_name}
						date={ad.created_at}
						location={ad.location}
						description={ad.description}
						image={ad.image_url}
						onViewDetail={() => router.push(`/ads/${ad.id}`)}
					/>
				))}
			</div>
		</>
	)
}