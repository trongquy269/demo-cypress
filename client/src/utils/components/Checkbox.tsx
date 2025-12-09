'use client';

import { useState } from 'react';

interface CheckboxProps {
	label: string;
	name: string;
	required?: boolean;
	checked?: boolean;
	onChange?: (checked: boolean) => void;
	size?: 'sm' | 'md' | 'lg';
	error?: string;
}

function Checkbox({
	label,
	name,
	required = false,
	checked = false,
	onChange,
	size = 'md',
	error = 'This field is required',
}: CheckboxProps) {
	const [isChecked, setIsChecked] = useState(checked);
	const [showError, setShowError] = useState(false);

	const handleChange = () => {
		const newChecked = !isChecked;
		setIsChecked(newChecked);
		onChange?.(newChecked);

		// Show error if required and unchecked
		if (required && !newChecked) {
			setShowError(true);
		} else {
			setShowError(false);
		}
	};

	// Size configurations
	const sizeClasses = {
		sm: {
			checkbox: 'w-4 h-4',
			label: 'text-sm',
			icon: 'text-xs',
		},
		md: {
			checkbox: 'w-5 h-5',
			label: 'text-base',
			icon: 'text-sm',
		},
		lg: {
			checkbox: 'w-6 h-6',
			label: 'text-lg',
			icon: 'text-base',
		},
	};

	const currentSize = sizeClasses[size];

	// Determine border color
	const borderColor =
		showError && required && !isChecked
			? 'border-red-500'
			: 'border-gray-300 hover:border-blue-500';

	const bgColor = isChecked ? 'bg-blue-500 border-blue-500' : 'bg-white';

	return (
		<div className='flex flex-col gap-1'>
			<div className='flex items-center gap-2'>
				{/* Hidden native input for form compatibility */}
				<input
					type='checkbox'
					id={name}
					name={name}
					checked={isChecked}
					onChange={handleChange}
					className='sr-only'
					required={required}
				/>

				{/* Custom checkbox */}
				<label
					htmlFor={name}
					className={`
						${currentSize.checkbox}
						${borderColor}
						${bgColor}
						border-2 rounded-md cursor-pointer
						flex items-center justify-center
						transition-all duration-200 ease-in-out
						focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2
					`}
				>
					{isChecked && (
						<svg
							className={`${currentSize.icon} text-white`}
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={3}
								d='M5 13l4 4L19 7'
							/>
						</svg>
					)}
				</label>

				{/* Label text */}
				<span
					className={`${currentSize.label} text-gray-700 cursor-pointer select-none`}
					onClick={handleChange}
				>
					{label}
					{required && <span className='text-red-500 ml-1'>*</span>}
				</span>
			</div>

			{/* Error message */}
			{showError && required && !isChecked && (
				<p className='text-red-500 text-sm ml-7 italic animate-fadeIn'>
					{error}
				</p>
			)}
		</div>
	);
}

export default Checkbox;
