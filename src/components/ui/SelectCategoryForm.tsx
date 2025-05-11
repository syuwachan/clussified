"use client"

import { useState } from 'react'
import { Car, Home, ShoppingBag, Utensils, Calendar, Users, Plane, Briefcase, Heart } from 'lucide-react'

const categories = [
	{ value: 'motors', label: 'motors', icon: Car },
	{ value: 'property', label: 'property', icon: Home },
	{ value: 'buySellTrade', label: 'buySellTrade', icon: ShoppingBag },
	{ value: 'restaurant', label: 'restaurant', icon: Utensils },
	{ value: 'event', label: 'event', icon: Calendar },
	{ value: 'foreigners', label: 'foreigners', icon: Users },
	{ value: 'tour', label: 'tour', icon: Plane },
	{ value: 'jobs', label: 'jobs', icon: Briefcase },
	{ value: 'personals', label: 'personals', icon: Heart },
]

export default function SelectCategoryForm() {
	const [category, setCategory] = useState('')

	return (
		<div className="w-1/2 mx-auto p-4">
			<h1 className="text-2xl mb-4 text-center text-[#3b82f6]">Select category to post ad</h1>
			<p className="text-center text-gray-500 mb-6">Buy and sell your phone, car, house and other stuff. Find jobs and avail services</p>

			<div className="grid grid-cols-3 gap-4">
				{categories.map((cat) => (
					<button
						key={cat.value}
						onClick={() => setCategory(cat.value)}
						className={`p-4 border rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors ${category === cat.value ? 'border-blue-500 bg-blue-50' : ''
							}`}
					>
						<cat.icon className="w-6 h-6" />
						<span className="text-sm">{cat.label}</span>
					</button>
				))}
			</div>
		</div>
	)
}
