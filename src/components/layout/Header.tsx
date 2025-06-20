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
			console.log(user)
			if (error) {
				console.error('ユーザー取得エラー', error)
			} else if (user) {
				setUserName(user.email || null)
			}
		}
		fetchUser()

		// 認証状態の変更を監視
		const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
			if (session?.user) {
				setUserName(session.user.email || null)
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
		<header className="bg-white shadow-md sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
						J-Classified
					</Link>
					<div className="flex items-center gap-6">
						{userName ? (
							<div className="flex items-center gap-4">
								<div className="flex items-center gap-2">
									<p className="text-gray-700 text-sm font-medium">{userName}</p>
								</div>
								<button
									onClick={handleLogout}
									className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
								>
									Logout
								</button>
							</div>
						) : (
							<div className="flex items-center gap-4">
								<Link
									href="/signup"
									className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
								>
									SignUp
								</Link>
								<Link
									href="/login"
									className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
								>
									Login
								</Link>
							</div>
						)}
						<Link
							href="/posts/category"
							className="px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors text-sm"
						>
							Post
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
} 