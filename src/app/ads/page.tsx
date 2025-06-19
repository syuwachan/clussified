'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import { CardDetail } from '@/components/ui/CardDetail'
import supabase from '@/lib/supabase'
import { Ad } from '@/types/ads'

export default function AdDetailWrapper() {
	const params = useParams()
	const slug = params.slug
	const [ad, setAd] = useState<Ad | null>(null)

	useEffect(() => {
		if (!slug) return
		const fetchAd = async () => {
			const { data, error } = await supabase.from('ads').select('*').eq('id', slug).single()
			if (data) setAd(data)
		}
		fetchAd()
	}, [slug])

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
				detailImages={ad.image_url ? [ad.image_url] : []}
				created_at={ad.created_at}
				listingId={ad.id}
			/>
		</>
	)
}