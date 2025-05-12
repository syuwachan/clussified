"use client"
import Link from 'next/link';
import { useState } from "react";
import supabase from '@/lib/supabase'
import { useEffect } from 'react';

export default function Header() {
	const [userName, setUserName] = useState<string | null>(null)

	useEffect(() => {
		const fetchUser = async () => {
			const { data: { user }, error } = await supabase.auth.getUser()
			if (error) {
				console.error('ユーザー取得エラー', error)
			} else if (user) {
				setUserName(user.user_metadata?.username)
			}
		}
		fetchUser()
	}, [])

	return (
		<div className='flex justify-around items-center p-4'>
			<Link href="/" className="p-2">J-Classified</Link>
			{userName ? (
				<p>こんにちは、{userName} さん！</p>
			) : (
				<div className="flex justify-between">
					<Link href="/signup" className="">Sign Up</Link>
					<Link href="/login" className="pl-8">Login</Link>
				</div>
			)}

		</div>
	);
} 