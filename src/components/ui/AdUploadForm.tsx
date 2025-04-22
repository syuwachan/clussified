import React from 'react';

const AdUploadForm: React.FC = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
		<h1 className="text-2xl font-bold mb-4">Ad Upload Form</h1>
		<form>
		<div className="mb-4">
				<label className="block text-gray-700 font-bold mb-2" htmlFor="title">
					Select Category
				</label>
				<input
					className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
					id="title"
					type="text"
					placeholder="Enter title"
				/>	
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 font-bold mb-2" htmlFor="title">
					Ad Title
				</label>
				<input
					className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
					id="title"
					type="text"
					placeholder="Enter title"
				/>	
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 font-bold mb-2" htmlFor="description">
					Ad Description
				</label>
				<textarea
					className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
					id="description"
					placeholder="Enter description"
				/>
			</div>
			<button
				className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
				type="submit"
			>
				Upload
			</button>
		</form>
	</div>
	);
};

export default AdUploadForm;

