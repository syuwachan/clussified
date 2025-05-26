'use client';

import { useEffect, useState } from 'react';
import { checkProjectStatus } from '@/lib/supabase';

export default function ProjectStatus() {
	const [status, setStatus] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const checkStatus = async () => {
			try {
				setLoading(true);
				const result = await checkProjectStatus();
				setStatus(result);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'ステータス確認に失敗しました');
			} finally {
				setLoading(false);
			}
		};

		checkStatus();
	}, []);

	if (loading) {
		return <div>ステータスを確認中...</div>;
	}

	if (error) {
		return <div className="error">エラー: {error}</div>;
	}

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">プロジェクトステータス</h1>

			<div className="grid gap-4">
				<div className="p-4 border rounded">
					<h2 className="font-bold mb-2">全体ステータス</h2>
					<div className={`text-lg ${status?.isHealthy ? 'text-green-600' : 'text-red-600'}`}>
						{status?.isHealthy ? '正常' : '異常'}
					</div>
				</div>

				<div className="p-4 border rounded">
					<h2 className="font-bold mb-2">詳細ステータス</h2>
					<div className="grid gap-2">
						<div>
							<span className="font-semibold">ヘルスチェック: </span>
							<span className={status?.healthStatus === 'ok' ? 'text-green-600' : 'text-red-600'}>
								{status?.healthStatus}
							</span>
						</div>
						<div>
							<span className="font-semibold">認証状態: </span>
							<span className={status?.authStatus === 'ok' ? 'text-green-600' : 'text-red-600'}>
								{status?.authStatus}
							</span>
						</div>
						<div>
							<span className="font-semibold">設定状態: </span>
							<span className={status?.configStatus === 'ok' ? 'text-green-600' : 'text-red-600'}>
								{status?.configStatus}
							</span>
						</div>
					</div>
				</div>

				{status?.errors && Object.keys(status.errors).length > 0 && (
					<div className="p-4 border rounded bg-red-50">
						<h2 className="font-bold mb-2 text-red-600">エラー詳細</h2>
						<pre className="whitespace-pre-wrap text-sm">
							{JSON.stringify(status.errors, null, 2)}
						</pre>
					</div>
				)}
			</div>
		</div>
	);
} 