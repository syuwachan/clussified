"use client"

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { Car, Home, ShoppingBag, Utensils, Calendar, Users, Plane, Briefcase, Heart, X, Upload } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function AdDetails() {
	const [category, setCategory] = useState('')
	const [images, setImages] = useState<string[]>([])
	const [isDragging, setIsDragging] = useState(false)
	const [uploading, setUploading] = useState(false)
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		location: '',
		name: '',
		phone: '',
		email: ''
	})
	const supabase = createClientComponentClient()
	const router = useRouter()

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

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value
		}))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setUploading(true)

		try {
			const { data: { user } } = await supabase.auth.getUser()

			if (!user) {
				alert('ログインが必要です')
				router.push('/login')
				return
			}

			const { error } = await supabase
				.from('posts')
				.insert([
					{
						user_id: user.id,
						title: formData.title,
						description: formData.description,
						location: formData.location,
						contact_name: formData.name,
						contact_phone: formData.phone,
						contact_email: formData.email,
						images: images,
						category: category,
						created_at: new Date().toISOString()
					}
				])

			if (error) throw error

			alert('投稿が完了しました')
			router.push('/') // 投稿完了後、トップページにリダイレクト
		} catch (error) {
			console.error('Error posting ad:', error)
			alert('投稿に失敗しました')
		} finally {
			setUploading(false)
		}
	}

	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<main className="flex-grow">
				<div className="w-1/2 mx-auto p-4">
					<h1 className="text-2xl mb-8 text-center text-[#3b82f6]">Enter your ad details</h1>
					<form className="space-y-8" onSubmit={handleSubmit}>
						<div className="bg-white p-6 rounded-lg shadow-sm border">
							<h2 className="text-xl mb-6 font-semibold text-gray-800">Upload Images <span className="text-red-500">*</span></h2>
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
									<label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
									<input
										type="text"
										id="title"
										name="title"
										value={formData.title}
										onChange={handleInputChange}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										placeholder="Enter your ad title"
										required
									/>
								</div>
								<div>
									<label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description <span className="text-red-500">*</span></label>
									<textarea
										id="description"
										name="description"
										value={formData.description}
										onChange={handleInputChange}
										rows={4}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										placeholder="Describe your item or service"
										required
									/>
								</div>
								<div>
									<label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location <span className="text-red-500">*</span></label>
									<input
										type="text"
										id="location"
										name="location"
										value={formData.location}
										onChange={handleInputChange}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										placeholder="Enter your location"
										required
									/>
								</div>
							</div>
						</div>

						<div className="bg-white p-6 rounded-lg shadow-sm border">
							<h2 className="text-xl mb-6 font-semibold text-gray-800">Contact Details</h2>
							<div className="space-y-4">
								<div>
									<label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
									<input
										type="text"
										id="name"
										name="name"
										value={formData.name}
										onChange={handleInputChange}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										placeholder="Enter your name"
										required
									/>
								</div>
								<div>
									<label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone <span className="text-red-500">*</span></label>
									<input
										type="tel"
										id="phone"
										name="phone"
										value={formData.phone}
										onChange={handleInputChange}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										placeholder="Enter your phone number"
										required
									/>
								</div>
								<div>
									<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
									<input
										type="email"
										id="email"
										name="email"
										value={formData.email}
										onChange={handleInputChange}
										className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										placeholder="Enter your email"
										required
									/>
								</div>
							</div>
						</div>

						<button
							type="submit"
							disabled={uploading}
							className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors font-medium disabled:bg-blue-300"
						>
							{uploading ? '投稿中...' : 'Post Ad'}
						</button>
					</form>
				</div>
			</main>
			<Footer />
		</div>
	)
}
