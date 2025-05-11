"use client"
import { Car, Home, ShoppingBag, Utensils, Calendar, Users, Plane, Briefcase, Heart } from 'lucide-react'
import Header from '@/components/Header'
import { useState } from 'react'
import Image from 'next/image'

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
	const [images, setImages] = useState<string[]>([])

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (files) {
			const newImages = Array.from(files).map(file => URL.createObjectURL(file))
			setImages(prev => [...prev, ...newImages])
		}
	}

	return (
		<>
			<div className="w-1/2 mx-auto p-4">
				<Header />
				<h1 className="text-2xl mb-4 text-center text-[#3b82f6]">Select category to post ad</h1>
				<p className="text-center text-gray-500 mb-6">Buy and sell your phone, car, house and other stuff. Find jobs and avail services</p>

				<div className="grid grid-cols-3 gap-4 mb-8">
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

				<div className="mb-8">
					<h2 className="text-xl mb-4 text-center">Upload Images</h2>
					<div className="flex flex-col items-center gap-4">
						<input
							type="file"
							accept="image/*"
							multiple
							onChange={handleImageUpload}
							className="block w-full text-sm text-gray-500
								file:mr-4 file:py-2 file:px-4
								file:rounded-full file:border-0
								file:text-sm file:font-semibold
								file:bg-blue-50 file:text-blue-700
								hover:file:bg-blue-100"
						/>
						<div className="grid grid-cols-3 gap-4 w-full">
							{images.map((image, index) => (
								<div key={index} className="relative aspect-square">
									<Image
										src={image}
										alt={`Uploaded image ${index + 1}`}
										fill
										className="object-cover rounded-lg"
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
