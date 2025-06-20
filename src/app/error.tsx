'use client'

import { useEffect } from 'react'

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
				<div className="text-center">
					<h2 className="mt-6 text-3xl font-extrabold text-gray-900">
						エラーが発生しました
					</h2>
					<p className="mt-2 text-sm text-gray-600">
						何か問題が発生しました。もう一度お試しください。
					</p>
					<button
						onClick={reset}
						className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					>
						もう一度試す
					</button>
				</div>
			</div>
		</div>
	)
}
