'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../../hooks/useAuth';

export default function LoginPage() {
	const router = useRouter();
	const { onLogin } = useAuth();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		try {
			await onLogin(email, password);
			router.push('/');
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-md mx-auto mt-16 p-6 border rounded shadow">
			<form onSubmit={handleLogin} className="space-y-4">
				<input
					type="email"
					placeholder="your email address"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full p-2 border rounded"
					required
				/>
				<input
					type="password"
					placeholder="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full p-2 border rounded"
					required
				/>
				{error && <p className="text-red-500">{error}</p>}
				<button
					type="submit"
					disabled={loading}
					className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
				>
					{loading ? 'logging...' : 'login'}
				</button>
			</form>
		</div>
	);
} 