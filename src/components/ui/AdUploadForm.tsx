import React from 'react';

const AdUploadForm: React.FC = () => {
	return (
		<div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
			<h1 className="text-2xl mb-4 text-center">Ad Upload Form</h1>
			<form>
				<div className="mb-4">
					<label className="block text-gray-700 mb-2" htmlFor="category">
						Select Category
					</label>
					<select
						className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
						id="category"
					>
						<option value="">Select Category</option>
						<option value="motors">Motors</option>
						<option value="property">Property</option>
						<option value="jobs">Jobs</option>
						<option value="services">Services</option>
						<option value="other">Other</option>
					</select>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 mb-2" htmlFor="title">
						Ad Title
					</label>
					<input
						className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
						id="title"
						type="text"
						placeholder="タイトルを入力してください"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 mb-2" htmlFor="description">
						Ad Description
					</label>
					<textarea
						className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
						id="description"
						placeholder="Enter description"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 mb-2" htmlFor="image">
						Upload Image
					</label>
					<input
						className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
						id="image"
						type="file"
						accept="image/*"
					/>
				</div>
				<button
					className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
					type="submit"
				>
					Post
				</button>
			</form>
		</div>
	);
};

export default AdUploadForm;