"use client"

import { useState, useCallback } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Upload, X } from 'lucide-react'

export default function AdDetails() {
	// const [category, setCategory] = useState('')
	const [images, setImages] = useState<string[]>([])
	const [uploading, setUploading] = useState(false)
	const [formData, setFormData] = useState({
		title: '',
		image_1: '',
		image_2: '',
		image_3: '',
		category: '',
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

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

			const postData = {
				user_id: user.id,
				image_1: images[0],
				image_2: images[1],
				image_3: images[2],
				title: formData.title,
				category: formData.category,
				description: formData.description,
				location: formData.location,
				contact_name: formData.name,
				contact_phone: formData.phone,
				contact_email: formData.email,
				created_at: new Date().toISOString()
			}

			// Supabaseに保存
			const { error } = await supabase
				.from('posts')
				.insert([postData])

			if (error) throw error

			// ローカルストレージに保存
			const localPosts = JSON.parse(localStorage.getItem('localPosts') || '[]')
			localPosts.push(postData)
			localStorage.setItem('localPosts', JSON.stringify(localPosts))

			alert('投稿が完了しました')
			router.push('/')
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
							<h2 className="text-xl mb-6 font-semibold text-gray-800">Ad category<span className="text-red-500">*</span></h2>
							<div className="space-y-4">
								<label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Select Category <span className="text-red-500">*</span></label>
								<select
									id="category"
									name="category"
									value={formData.category}
									onChange={handleInputChange}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									required
								>
									<option value="">select category</option>
									<option value="motors">motors</option>
									<option value="property">property</option>
									<option value="buy-sell-trade">buy-sell-trade</option>
									<option value="restaurant">restaurant</option>
									<option value="event">event</option>
									<option value="foreigners">foreigners</option>
									<option value="tour-experience">tour-experience</option>
									<option value="jobs">jobs</option>
									<option value="personals">personals</option>
								</select>
							</div>
						</div>

						<div className="bg-white p-6 rounded-lg shadow-sm border">
							<h2 className="text-xl mb-6 font-semibold text-gray-800">Ad Images<span className="text-red-500">*</span></h2>
							<div className="space-y-4">
								<label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700 mb-1">Select Images <span className="text-red-500">*</span></label>
								<input
									type="file"
									id="imageUpload"
									name="imageUpload"
									accept="image/*"
									multiple
									onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									required
								/>
								<input
									type="file"
									id="imageUpload"
									name="imageUpload"
									accept="image/*"
									multiple
									onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									required
								/>
								<input
									type="file"
									id="imageUpload"
									name="imageUpload"
									accept="image/*"
									multiple
									onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
									className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
									required
								/>
								<div className="grid grid-cols-3 gap-4 w-full mt-4">
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
							onClick={handleSubmit}
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
