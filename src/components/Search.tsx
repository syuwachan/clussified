import React from 'react';

const Search: React.FC = () => {
	return (
		<form
			method="get"
			action=""
			className="w-full max-w-4xl mx-auto"
		>
			<div className="p-4 bg-white rounded-lg shadow-sm">
				<div className="flex flex-col md:flex-row gap-4">
					<input
						type="text"
						name="search"
						defaultValue=""
						className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="What are you looking for"
					/>
					<input
						type="text"
						name="city"
						id="city"
						autoComplete="off"
						defaultValue=""
						className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter Location e.g. New York"
					/>
					<button
						type="submit"
						className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
					>
						Search Ad
					</button>
				</div>
			</div>
		</form>
	);
};

export default Search;
