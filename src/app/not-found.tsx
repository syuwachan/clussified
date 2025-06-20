import Link from 'next/link'

export default function NotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
				<div className="text-center">
					<h1 className="text-6xl font-bold text-gray-900">404</h1>
					<h2 className="mt-6 text-3xl font-extrabold text-gray-900">
						ページが見つかりません
					</h2>
					<p className="mt-2 text-sm text-gray-600">
						お探しのページは存在しないか、移動された可能性があります。
					</p>
					<Link
						href="/"
						className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						ホームに戻る
					</Link>
				</div>
			</div>
		</div>
	)
} 