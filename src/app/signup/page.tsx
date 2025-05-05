'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import Header from '@/components/Header';
import './signup.css';

interface SignUpFormInput {
	username: string;
	email: string;
	password: string;
	role: 'client' | 'advertiser';
}

export default function SignUp() {
	const router = useRouter();
	const { onSignup } = useAuth();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const { register, handleSubmit } = useForm<SignUpFormInput>({
		defaultValues: {
			email: '',
			password: '',
			username: '',
			role: 'client',
		},
	});

	const onSubmit: SubmitHandler<SignUpFormInput> = async (data) => {
		try {
			setIsLoading(true);
			setError(null);
			const { username, email, password } = data;
			await onSignup(email, password, username);
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
				
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="signup-form"
				>
					{error && (
						<div className="error-message">
							{error}
						</div>
					)}
					<div className="form-group">
					<p className="signup-title">Sign up</p>
						<label className="form-label">
							username
						</label>
						<input
							type="text"
							{...register('username', { required: true })}
							className="form-input"
							placeholder='This will be your profile address.Letters and numbers only'
						/>
					</div>

					<div className="form-group">
						<label className="form-label">
							email
						</label>
						<input
							type="email"
							{...register('email', { required: true })}
							className="form-input"
							placeholder='No spam,guaranteed!'
						/>
					</div>

					<div className="form-group">
						<label className="form-label">
							password
						</label>
						<input
							type="password"
							{...register('password', { required: true })}
							className="form-input"
							placeholder='Must be at least 8 characters'
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
							<span className="role-text">Client（View Ads）</span>
						</label>

						<label className="role-label">
							<input
								type="radio"
								value="advertiser"
								{...register('role', { required: true })}
								className="role-radio"
							/>
							<span className="role-text">Advertiser（Post Ads）</span>
						</label>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className="submit-button"
					>
						{isLoading ? '登録中...' : 'Sign Up'}
					</button>
				</form>
			</div>
		</>
	);
} 