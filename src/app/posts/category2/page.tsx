"use client"

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { Car, Home, ShoppingBag, Utensils, Calendar, Users, Plane, Briefcase, Heart, X, Upload } from 'lucide-react'
import Header from '@/components/Header'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AdDetails() {
	const [category, setCategory] = useState('')
	const [images, setImages] = useState<string[]>([])
	const [isDragging, setIsDragging] = useState(false)
	const [uploading, setUploading] = useState(false)
	const supabase = createClientComponentClient()

	const uploadToSupabase = async (file: File) => {
		try {
			const fileExt = file.name.split('.').pop()
			const fileName = `${Math.random()}.${fileExt}`
			const filePath = `${fileName}`

			const { error: uploadError } = await supabase.storage
				.from('images')
				.upload(filePath, file)

			if (uploadError) {
				throw uploadError
			}

			const { data: { publicUrl } } = supabase.storage
				.from('images')
				.getPublicUrl(filePath)

			return publicUrl
		} catch (error) {
			console.error('Error uploading image:', error)
			throw error
		}
	}

	const handleImageUpload = async (files: FileList) => {
		setUploading(true)
		try {
			const uploadPromises = Array.from(files).map(file => uploadToSupabase(file))
			const uploadedUrls = await Promise.all(uploadPromises)
			setImages(prev => [...prev, ...uploadedUrls])
		} catch (error) {
			console.error('Error uploading images:', error)
			alert('画像のアップロードに失敗しました')
		} finally {
			setUploading(false)
		}
	}

	const handleDragOver = useCallback((e: React.DragEvent) => {
		e.preventDefault()
		setIsDragging(true)
	}, [])

	const handleDragLeave = useCallback((e: React.DragEvent) => {
		e.preventDefault()
		setIsDragging(false)
	}, [])

	const handleDrop = useCallback(async (e: React.DragEvent) => {
		e.preventDefault()
		setIsDragging(false)
		const files = e.dataTransfer.files
		if (files) {
			await handleImageUpload(files)
		}
	}, [])

	const removeImage = async (index: number) => {
		const imageUrl = images[index]
		try {
			const fileName = imageUrl.split('/').pop()
			if (fileName) {
				const { error } = await supabase.storage
					.from('images')
					.remove([fileName])

				if (error) throw error
			}
			setImages(prev => prev.filter((_, i) => i !== index))
		} catch (error) {
			console.error('Error removing image:', error)
			alert('画像の削除に失敗しました')
		}
	}

	return (
		<>
			<Header />
			<div className="w-1/2 mx-auto p-4">
				<h1 className="text-2xl mb-8 text-center text-[#3b82f6]">Enter your ad details</h1>
				<form className="space-y-8">
					<div className="bg-white p-6 rounded-lg shadow-sm border">
						<h2 className="text-xl mb-6 font-semibold text-gray-800">Upload Images</h2>
						<div
							className={`flex flex-col items-center gap-4 p-8 border-2 border-dashed rounded-lg transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
								}`}
							onDragOver={handleDragOver}
							onDragLeave={handleDragLeave}
							onDrop={handleDrop}
						>
							<Upload className="w-12 h-12 text-gray-400" />
							<p className="text-gray-500">
								{uploading ? 'アップロード中...' : 'Drop your images here or click to upload'}
							</p>
							<input
								type="file"
								accept="image/*"
								multiple
								onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
								className="hidden"
								id="image-upload"
							/>
							<label
								htmlFor="image-upload"
								className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
							>
								Select Images
							</label>
							<div className="grid grid-cols-3 gap-4 w-full">
								{images.map((image, index) => (
									<div key={index} className="relative aspect-square group">
										<Image
											src={image}
											alt={`Uploaded image ${index + 1}`}
											fill
											className="object-cover rounded-lg"
										/>
										<button
											type="button"
											onClick={() => removeImage(index)}
											className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
										>
											<X className="w-4 h-4" />
										</button>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className="bg-white p-6 rounded-lg shadow-sm border">
						<h2 className="text-xl mb-6 font-semibold text-gray-800">Ad Details</h2>
						<div className="space-y-4">
							<div>
								<label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
								<input
									type="text"
									id="title"
									name="title"
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									placeholder="Enter your ad title"
								/>
							</div>
							<div>
								<label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
								<textarea
									id="description"
									name="description"
									rows={4}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									placeholder="Describe your item or service"
								/>
							</div>
							<div>
								<label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
								<input
									type="text"
									id="location"
									name="location"
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									placeholder="Enter your location"
								/>
							</div>
						</div>
					</div>

					<div className="bg-white p-6 rounded-lg shadow-sm border">
						<h2 className="text-xl mb-6 font-semibold text-gray-800">Contact Details</h2>
						<div className="space-y-4">
							<div>
								<label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
								<input
									type="text"
									id="name"
									name="name"
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									placeholder="Enter your name"
								/>
							</div>
							<div>
								<label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
								<input
									type="tel"
									id="phone"
									name="phone"
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									placeholder="Enter your phone number"
								/>
							</div>
							<div>
								<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
								<input
									type="email"
									id="email"
									name="email"
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									placeholder="Enter your email"
								/>
							</div>
						</div>
					</div>

					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors font-medium"
					>
						Post Ad
					</button>
				</form>
			</div>
		</>
	)
}
