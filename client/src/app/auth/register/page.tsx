import dynamic from 'next/dynamic';
import Loading from '@/utils/components/Loading';

const RegisterFormRender = dynamic(
	() => import('@/modules/auth/register/views').then((mod) => mod.default),
	{
		loading: () => <Loading />,
	},
);

function RegisterPage() {
	return <RegisterFormRender />;
}

export default RegisterPage;
