'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import Header from '@/components/Header';
import './signup.css';
import Link from 'next/link';
import supabase from '../../lib/supabase';

interface SignUpFormInput {
	username: string;
	email: string;
	role: 'client' | 'advertiser';
}

export default function SignUp() {
	const router = useRouter();
	const { onSignup } = useAuth();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const { register, handleSubmit } = useForm<SignUpFormInput>({
		defaultValues: {
			username: '',
			email: '',
			role: 'client',
		},
	});

	const onSubmit: SubmitHandler<SignUpFormInput> = async (data) => {
		try {
			setIsLoading(true);
			setError(null);

			const { username, email, role } = data;
			const { error: signUpError, data: { user } } = await onSignup(email, username, role);

			if (signUpError) throw signUpError;
			if (!user || !user.id) throw new Error('ユーザー登録に失敗しました');

			const { error: insertError } = await supabase
				.from('user_login_data')
				.insert([
					{
						user_id: user.id,
						username,
						email,
						role,
						created_at: new Date().toISOString(),
					},
				]);

			if (insertError) {
				if (insertError.message.includes('row-level security')) {
					throw new Error('RLSポリシーによってデータの挿入が拒否されました。');
				}
				throw insertError;
			}

			router.push('/');
		} catch (err) {
			setError(err instanceof Error ? err.message : '登録に失敗しました');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Header />
			<div className="signup-container">
				<form onSubmit={handleSubmit(onSubmit)} className="signup-form">
					{error && <div className="error-message">{error}</div>}

					<div className="form-group">
						<p className="signup-title">Sign Up</p>
						<label className="form-label">Username</label>
						<input
							type="text"
							{...register('username', { required: true })}
							className="form-input"
							placeholder="Enter your username"
						/>
					</div>

					<div className="form-group">
						<label className="form-label">Email</label>
						<input
							type="email"
							{...register('email', { required: true })}
							className="form-input"
							placeholder="Enter your email"
						/>
					</div>


					<div className="role-container">
						<label className="role-label">
							<input
								type="radio"
								value="client"
								{...register('role', { required: true })}
								className="role-radio"
							/>
							<span className="role-text">Client</span>
						</label>

						<label className="role-label">
							<input
								type="radio"
								value="advertiser"
								{...register('role', { required: true })}
								className="role-radio"
							/>
							<span className="role-text">Advertiser</span>
						</label>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className="submit-button"
					>
						{isLoading ? 'Registering...' : 'Signup'}
					</button>

					<p className="login-link">
						Already have an account?{' '}
						<Link href="/login" className="link">
							Login
						</Link>
					</p>
				</form>
			</div>
		</>
	);
}