"use client"

import { useEffect, useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types';
import useAuth from '@/hooks/useAuth';

export default function AdDetails() {
	const supabase = createClientComponentClient<Database>();
	const { user } = useAuth();
	const [uploading, setUploading] = useState(false)
	const [formData, setFormData] = useState({
		title: '',
		category: '',
		description: '',
		location: '',
		name: '',
		phone: '',
		email: '',
		image_url: ''
	})

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value
		}))
	}

	//upload image
	const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {

		if (!event.target.files || event.target.files.length === 0) {
			return;
		}
		const file = event.target.files[0];

		const fileCategory = formData.category || 'uncategorized';
		const filePath = `${fileCategory}/${file.name}`;
		const { error } = await supabase.storage.from('images').upload(filePath, file)
		if (error) {
		}
		const { data } = supabase.storage.from('images').getPublicUrl(filePath);
		const imageUrl = data.publicUrl;
		setFormData(prev => ({
			...prev,
			image_url: imageUrl
		}))
		// const { error: databaseError } = await supabase.from('ads').insert({ image_url: imageUrl }).select().single();
	}


	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setUploading(true)

		if (!user) {
			alert('ログインが必要です')
			return
		}

		try {
			const postData = {
				user_id: user.id,
				title: formData.title,
				category: formData.category,
				image_url: formData.image_url,
				description: formData.description,
				location: formData.location,
				contact_name: formData.name,
				contact_phone: formData.phone,
				contact_email: formData.email,
				created_at: new Date().toISOString()
			}
			console.log(postData)

			const { data, error } = await supabase
				.from('ads')
				.insert([postData])
				.select()

			if (error) {
				console.error('Error posting ad:', error)
				alert(`投稿に失敗しました: ${JSON.stringify(error)}`)
				return
			}

			const localPosts = JSON.parse(localStorage.getItem('localPosts') || '[]')
			localPosts.push(data[0])
			localStorage.setItem('localPosts', JSON.stringify(localPosts))

			alert('投稿が完了しました')
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
							<h2 className="text-xl mb-6 font-semibold text-gray-800">Ad category</h2>
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
							<h2 className="text-xl mb-6 font-semibold text-gray-800">Ad Image</h2>
							<div className="space-y-4">
								<input type="file" onChange={handleImageUpload} />
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
							onClick={handleSubmit}
						>
							Post Ad
						</button>
					</form>
				</div>
			</main>
			<Footer />
		</div>
	)
}