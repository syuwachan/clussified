import { NextPage } from 'next';
import { SubmitHandler, useForm } from 'react-hook-form';
import useAuth from './hooks/useAuth';

interface SignUpFormInput {
	username: string;
	email: string;
	password: string;
	role: 'client' | 'advertiser';
}

const SignUp: NextPage = () => {
	const { onSignUp } = useAuth();
	const { register, handleSubmit } = useForm<SignUpFormInput>({
		defaultValues: {
			email: '',
			password: '',
			username: '',
			role: 'client',
		},
	});

	const onSubmit: SubmitHandler<SignUpFormInput> = async (data) => {
		const { username, email, password } = data;
		await onSignUp(email, password, username);
	};

	return (
		<div className="max-h-screen flex items-center justify-center">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-1/2 mx-auto my-8 p-6 bg-white rounded-2xl shadow-md space-y-6"
			>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						username
					</label>
					<input
						type="text"
						{...register('username', { required: true })}
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder='This will be your profile address.Letters and numbers only'
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						email
					</label>
					<input
						type="email"
						{...register('email', { required: true })}
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder='No spam,guaranteed!'
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						password
					</label>
					<input
						type="password"
						{...register('password', { required: true })}
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder='this will be your profile address.Letters and numbers only'
					/>
				</div>


				<div className="flex flex-col gap-4 p-4 border bg-white max-w-md">
					<label className="flex items-center gap-3 p-3 cursor-pointer">
						<input
							type="radio"
							value="client"
							{...register('role', { required: true })}
							className="accent-blue-600"
						/>
						<span className="text-sm font-medium">Client（View Ads）</span>
					</label>

					<label className="flex items-center gap-3 p-3 cursor-pointer ">
						<input
							type="radio"
							value="advertiser"
							{...register('role', { required: true })}
							className="accent-blue-600"
						/>
						<span className="text-sm font-medium">Advertiser（Post Ads）</span>
					</label>
				</div>



				<button
					type="submit"
					className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
				>
					SignUp
				</button>
			</form>
		</div>
	);
};

export default SignUp;
