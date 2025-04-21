'use client'

import useAuth from '../pages/hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
	const { onLogout } = useAuth()
	const router = useRouter()

	const handleLogout = async () => {
		try {
			await onLogout()
			router.push('/login') 
		} catch (err: any) {
			alert('ログアウト失敗: ' + err.message)
		}
	}

	return (
		<button
			onClick={handleLogout}
			className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
		>
			ログアウト
		</button>
	)
}