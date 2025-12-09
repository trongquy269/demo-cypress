import Image from 'next/image';

function Welcome() {
	return (
		<div className='relative w-[600px] h-[600px] rounded-tr-2xl rounded-br-2xl overflow-hidden'>
			<Image
				src='/login-img.jpg'
				alt='Welcome image'
				layout='fill'
				objectFit='cover'
			/>
		</div>
	);
}

export default Welcome;
