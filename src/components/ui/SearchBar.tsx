import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { Search } from 'lucide-react'

interface SearchBarProps {
	className?: string
}

export function SearchBar({ className }: SearchBarProps) {
	const locations = [
		'Tokyo',
		'Osaka',
		'Kyoto',
		'Fukuoka',
		'Sapporo',
		'Yokohama',
		'Nagoya',
		'Kobe'
	]

	return (
		<div className={className}>
			<div className="flex gap-2 max-w-2xl mx-auto mt-12">
				<div className="relative w-2/3">
					<input
						type="text"
						placeholder='Keyword...'
						className="w-full p-2 border rounded-lg"
					/>
				</div>
				<div className="relative w-1/3">
					<select className="w-full p-2 border rounded-lg bg-white">
						<option value="">All Locations</option>
						{locations.map((location) => (
							<option key={location} value={location}>
								{location}
							</option>
						))}
					</select>
				</div>

				<button className="bg-blue-500 text-white px-6 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
					<Search className="w-4 h-4" />
					Search
				</button>

			</div>
		</div>
	)
}	