'use client';

import Button from '@/utils/components/Button';
import { useRouter } from 'next/navigation';

function RegisterView() {
	const router = useRouter();

	return (
		<div>
			<h2>Register</h2>
			<Button
				variant='solid'
				color='blue'
				size='lg'
				onClick={() => router.push('/auth/login')}
			>
				Back to Login
			</Button>
		</div>
	);
}

export default RegisterView;
