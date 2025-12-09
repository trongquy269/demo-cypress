function Loading() {
	return (
		<div className='fixed inset-0 w-full h-full bg-black/50 backdrop-blur-lg flex justify-center items-center z-9999 animate-fadeIn'>
			<div className='flex flex-col items-center gap-6'>
				<div className='relative w-20 h-20'>
					<div className='absolute w-full h-full rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 border-b-pink-500 animate-spin'></div>
					<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full border-3 border-transparent border-t-pink-500 border-r-purple-500 border-b-blue-500 animate-spin-reverse'></div>
				</div>
				<p className='text-white text-lg font-medium tracking-wider animate-pulse m-0'>
					Loading...
				</p>
			</div>
		</div>
	);
}

export default Loading;
