'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import supabase from '@/lib/supabase'
import { CardDetail } from '@/components/ui/CardDetail'
import Header from '@/components/Header'

export default function AdDetailPage() {
	const params = useParams()
	const [ad, setAd] = useState<any>(null)

	useEffect(() => {
		const fetchAd = async () => {
			const { data, error } = await supabase
				.from('ads')
				.select('*')
				.eq('id', params.id)
				.single()

			if (error) {
				console.error('Error fetching ad:', error)
			} else {
				setAd(data)
			}
		}

		fetchAd()
	}, [params.id])

	if (!ad) return <div>Loading...</div>

	return (
		<>
			<Header />
			<CardDetail
				className="p-6 max-w-3xl mx-auto mt-8"
				title={ad.title}
				authorName={ad.author_name}
				date={ad.date}
				location={ad.location}
				description={ad.description}
				price={ad.price}
				detailImages={ad.imageUrls ? [ad.imageUrls] : []}
			/>
		</>
	)
} 