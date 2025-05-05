"use client"
import Link from 'next/link';
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';
import supabase from '@/lib/supabase'
import { useEffect } from 'react';

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const { t } = useTranslation();
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
					<Link href="/signup" className="">{t('translations.signup')}</Link>
					<Link href="/login" className="">{t('translations.login')}</Link>
				</div>
			)}

			<div className="relative hover:cursor-pointer">
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="flex items-center gap-2 px-4 py-2 bg-white shadow-sm font-size-18 hover:bg-gray-50 transition-colors hover:cursor-pointer"
				>
					Language🌏
					<ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
				</button>

				<div className={`absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg transition-all duration-200 ease-in-out transform ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
					<div className="py-4">
						<button
							className="block w-full px-4 py-2 text-left text-md hover:bg-gray-100 cursor-pointer pl-6 hover:cursor-pointer"
							onClick={() => i18n.changeLanguage('en')}
						>
							{t('english')}
						</button>
						<button
							className="block w-full px-4 py-2 text-left text-md hover:bg-gray-100 cursor-pointer pl-6 hover:cursor-pointer"
							onClick={() => i18n.changeLanguage('ja')}
						>
							{t('japanese')}
						</button>
						<button
							className="block w-full px-4 py-2 text-left text-md hover:bg-gray-100 cursor-pointer pl-6 hover:cursor-pointer"
							onClick={() => i18n.changeLanguage('zh')}
						>
							{t('chinese')}
						</button>
						<button className="block w-full px-4 py-2 text-left text-md hover:bg-gray-100 cursor-pointer pl-6 hover:cursor-pointer"
							onClick={() => i18n.changeLanguage('ko')}
						>
							{t('korean')}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
} 