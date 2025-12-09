'use client';

import Input from '@/utils/components/Input';
import Checkbox from '@/utils/components/Checkbox';
import Button from '@/utils/components/Button';
import { useState } from 'react';
import { validateEmail } from '@/utils/helpers/validateEmail';
import { validatePassword } from '@/utils/helpers/validatePassword';
import axiosClient from '@/configs/apis/AxiosClient';
import { ApiEndpoint } from '@/configs/apis/ApiEndpoint';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

type ErrorType = {
	type: 'username' | 'password' | 'remember';
	message: string;
};

function Form() {
	const router = useRouter();
	const { refetchUser } = useAuth();

	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [remember, setRemember] = useState<boolean>(false);
	const [error, setError] = useState<ErrorType | null>(null);

	const handleSubmit = async () => {
		if (!username.trim()) {
			setError({ type: 'username', message: 'Username is required' });
			return;
		}

		if (!password.trim()) {
			setError({ type: 'password', message: 'Password is required' });
			return;
		}

		if (!validateEmail(username)) {
			setError({ type: 'username', message: 'Username is not valid' });
			return;
		}

		if (!validatePassword(password)) {
			setError({
				type: 'password',
				message:
					'Must be 8+ chars, 1 number, 1 lowercase, 1 uppercase, 1 special char',
			});
			return;
		}

		try {
			await axiosClient
				.post(ApiEndpoint.login, {
					email: username,
					password,
					isRemember: remember,
				})
				.then(async (res) => {
					if (res?.status === 200) {
						// Cookies are set automatically by the server
						// Refetch user to update AuthContext
						await refetchUser();
						// Navigate to home
						router.push('/');
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} catch (error) {
			console.error('Login failed:', error);
		}
	};

	return (
		<div className='w-[400px] h-full p-4 space-y-4'>
			<h2 className='text-4xl font-bold text-center mb-12'>LOGIN</h2>
			<Input
				placeholder='user@example.com'
				label='Username'
				name='username'
				type='text'
				required
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				error={error?.type === 'username' ? error.message : ''}
			/>
			<Input
				placeholder='********'
				label='Password'
				name='password'
				type='password'
				required
				onEnter={handleSubmit}
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				error={error?.type === 'password' ? error.message : ''}
			/>
			<Checkbox
				label='Remember me'
				name='remember'
				checked={remember}
				onChange={setRemember}
				error={error?.type === 'remember' ? error.message : ''}
			/>
			<Button
				variant='solid'
				color='blue'
				size='lg'
				fullWidth
				loading={false}
				iconPosition='right'
				className='mt-12'
				onClick={handleSubmit}
			>
				Login
			</Button>
			<div className='w-full flex items-center justify-center'>
				<span>{"Don't have an account?"}</span>
				<Button
					variant='link'
					color='blue'
					size='lg'
					onClick={() => router.push('/auth/register')}
				>
					Register
				</Button>
			</div>
			<div className='w-full flex items-center justify-center'>
				<Button
					variant='text'
					color='gray'
					type='button'
					size='lg'
					loading={false}
					className='hover:!text-blue-500 transition-colors duration-150 ease-in-out'
					onClick={() => router.back()}
				>
					Back
				</Button>
			</div>
		</div>
	);
}

export default Form;
