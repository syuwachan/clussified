'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import supabase from '../../../lib/supabase';

export default function AuthCallback() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const handleAuthCallback = async () => {
			try {
				console.log('Auth callback: Starting authentication check');

				// URLパラメータからエラーを確認
				const errorParam = searchParams.get('error');
				if (errorParam) {
					throw new Error(`認証エラー: ${errorParam}`);
				}

				// セッションの確認
				const { data: { session }, error: sessionError } = await supabase.auth.getSession();

				if (sessionError) {
					console.error('Auth callback: Session error:', sessionError);
					throw sessionError;
				}

				if (!session) {
					console.error('Auth callback: No session found');
					throw new Error('認証セッションが見つかりません');
				}

				console.log('Auth callback: Authentication successful');

				// 認証成功後、ホームページにリダイレクト
				router.push('/');
			} catch (error) {
				console.error('Auth callback error:', error);
				setError(error instanceof Error ? error.message : '認証処理に失敗しました');

				// エラー発生時はログインページにリダイレクト
				setTimeout(() => {
					router.push('/login?error=auth_callback_failed');
				}, 3000);
			}
		};

		handleAuthCallback();
	}, [router, searchParams]);

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-50">
			<div className="text-center p-8 bg-white rounded-lg shadow-md">
				{error ? (
					<>
						<h1 className="text-xl font-semibold mb-4 text-red-600">認証エラー</h1>
						<p className="text-gray-600 mb-4">{error}</p>
						<p className="text-sm text-gray-500">ログインページにリダイレクトします...</p>
					</>
				) : (
					<>
						<h1 className="text-xl font-semibold mb-4">認証処理中...</h1>
						<p className="text-gray-600">しばらくお待ちください</p>
						<div className="mt-4">
							<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
						</div>
					</>
				)}
			</div>
		</div>
	);
} 