export default function Loading() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="text-center">
				<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
				<p className="mt-4 text-lg text-gray-600">読み込み中...</p>
			</div>
		</div>
	)
}
