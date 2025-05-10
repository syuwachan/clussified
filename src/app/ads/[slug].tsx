// pages/ads/[slug].tsx
import { GetServerSideProps } from 'next'
import supabase from '@/lib/supabase'
import { CardDetail } from '@/components/ui/CardDetail'
import Header from '@/components/Header'

export const getServerSideProps: GetServerSideProps = async (context) => {
	const slug = context.params?.slug as string

	const { data, error } = await supabase
		.from('ads')
		.select('*')
		.eq('id', slug)
		.single()

	if (error || !data) {
		return { notFound: true }
	}

	return {
		props: {
			ad: data,
		},
	}
}

export default function AdDetailPage({ ad }: { ad: any }) {
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