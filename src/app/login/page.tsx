'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../../hooks/useAuth';
import Header from '@/components/Header';
import './login.css';

export default function LoginPage() {
	const router = useRouter();
	const { onLogin } = useAuth();
	const [username, setUserName] = useState('');
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
		<>
			<Header></Header>
			<div className="login-container">
				<form onSubmit={handleLogin} className="login-form">
					<h1 className="login-title">Login</h1>
					<label className="form-label">
							email
						</label>
					<input
						type="email"
						placeholder="your email address"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="login-input"
						required
					/>
					<label className="form-label">
							password
						</label>
					<input
						type="password"
						placeholder="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="login-input"
						required
					/>
					{error && <p className="login-error">{error}</p>}
					<button
						type="submit"
						disabled={loading}
						className="login-button"
					>
						{loading ? 'logging...' : 'login'}
					</button>
				</form>
			</div>
		</>
	);
} 