"use client"
import Link from 'next/link';
import { useState } from "react";
import supabase from '@/lib/supabase'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
	const [userName, setUserName] = useState<string | null>(null)
	const router = useRouter()

	useEffect(() => {
		const fetchUser = async () => {
			const { data: { user }, error } = await supabase.auth.getUser()
			if (error) {
				console.error('ユーザー取得エラー', error)
			} else if (user) {
				setUserName(user.user_metadata?.username || user.email)
			}
		}
		fetchUser()

		// 認証状態の変更を監視
		const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
			if (session?.user) {
				setUserName(session.user.user_metadata?.username || session.user.email)
			} else {
				setUserName(null)
			}
		})

		return () => {
			subscription.unsubscribe()
		}
	}, [])

	const handleLogout = async () => {
		const { error } = await supabase.auth.signOut()
		if (error) {
			console.error('Logout error', error)
		} else {
			router.push('/')
		}
	}

	return (
		<header className="bg-white shadow-sm">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<Link href="/" className="text-xl font-bold text-blue-600">J-Classified</Link>
					<div className="flex items-center gap-4">
						{userName ? (
							<div className="flex items-center gap-4">
								<p className="text-gray-700">こんにちは、<span className="font-medium">{userName}</span> さん</p>
								<button
									onClick={handleLogout}
									className="text-sm text-gray-600 hover:text-gray-900"
								>
									Logout
								</button>
							</div>
						) : (
							<div className="flex items-center gap-4">
								<Link href="/signup" className="text-sm text-gray-600 hover:text-gray-900">新規登録</Link>
								<Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">ログイン</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
} 