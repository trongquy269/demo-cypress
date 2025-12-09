import Welcome from '../components/Welcome';
import Form from '../components/Form';

function LoginWrapper() {
	return (
		<div className='h-auto bg-white rounded-2xl flex items-center justify-between overflow-hidden gap-8 shadow-lg'>
			<Welcome />
			<Form />
		</div>
	);
}

export default LoginWrapper;
