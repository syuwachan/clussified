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
			<div className="flex gap-2 max-w-2xl mx-auto">
				<div className="relative w-2/3">
					<input
						type="text"
						placeholder='Keyword...'
						className="w-full p-2 pl-10 border rounded-lg"
					/>
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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
			</div>
		</div>
	)
}	