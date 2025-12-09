'use client';

import { useState } from 'react';
import { Eye } from '../icons/Eye';
import { EyeOff } from '../icons/EyeOff';

function Input({
	type = 'text',
	name = '',
	value = '',
	onChange,
	onBlur,
	onFocus,
	onEnter,
	error = '',
	placeholder = '',
	label = '',
	className = '',
	required = false,
	...props
}: {
	type?: string;
	name?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
	onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	error?: string | undefined;
	placeholder?: string;
	label?: string;
	className?: string;
	required?: boolean;
}) {
	const [showPassword, setShowPassword] = useState(false);
	const [typeInput, setTypeInput] = useState(type);

	const changeStatePassword = () => {
		if (showPassword) {
			setShowPassword(false);
			setTypeInput('password');
		} else {
			setShowPassword(true);
			setTypeInput('text');
		}
	};

	return (
		<div className={`space-y-1 flex flex-col ${className}`}>
			{label && (
				<label
					className='text-base font-semibold'
					htmlFor={name}
				>
					{label}
					{required && <span className='text-red-500'> *</span>}
				</label>
			)}
			<div className='w-full relative'>
				<input
					id={name}
					type={typeInput}
					name={name}
					value={value}
					onBlur={onBlur}
					onFocus={onFocus}
					onChange={onChange}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							onEnter?.(e);
						}
					}}
					placeholder={placeholder}
					className={`w-full h-10 px-4 border border-gray-300 rounded-lg focus:border-blue-500 outline-none ${
						error && 'border-red-500'
					}`}
					{...props}
				/>
				{type === 'password' && (
					<div
						className='absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer'
						onClick={changeStatePassword}
					>
						{showPassword ? <Eye /> : <EyeOff />}
					</div>
				)}
			</div>
			{error && (
				<p className='italic text-xs text-red-500 animate-fadeIn'>
					{error}
				</p>
			)}
		</div>
	);
}

export default Input;
