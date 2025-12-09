import dynamic from 'next/dynamic';
import Loading from '@/utils/components/Loading';

const LoginFormRender = dynamic(
	() => import('@/modules/auth/login/views').then((mod) => mod.default),
	{
		loading: () => <Loading />,
	}
);

function LoginPage() {
	return <LoginFormRender />;
}

export default LoginPage;
