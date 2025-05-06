// pages/ads/[slug].tsx
import { GetServerSideProps } from 'next'
import supabase from '@/lib/supabase'

export const getServerSideProps: GetServerSideProps = async (context) => {
	const slug = context.params?.slug as string

	const { data, error } = await supabase
		.from('ads')
		.select('*')
		.eq('slug', slug)
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
		<div className="p-6 max-w-3xl mx-auto">
			<h1 className="text-2xl font-bold mb-2">{ad.title}</h1>
			<p className="text-sm text-gray-500 mb-4">{ad.tag} | {ad.date} | {ad.location}</p>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
				{ad.images?.map((img: string, idx: number) => (
					<img key={idx} src={img} alt={ad.title} className="rounded shadow" />
				))}
			</div>
			<p className="text-gray-700">Posted by {ad.author_name}</p>
		</div>
	)
}