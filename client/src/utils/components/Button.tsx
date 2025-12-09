'use client';

import { ReactNode } from 'react';
import { LoadingSpinner } from '../icons/LoadingSpinner';

interface ButtonProps {
	children: ReactNode;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset';
	variant?: 'solid' | 'outline' | 'text' | 'link';
	color?: 'blue' | 'red' | 'green' | 'gray' | 'purple' | 'pink' | 'yellow';
	size?: 'sm' | 'md' | 'lg';
	fullWidth?: boolean;
	disabled?: boolean;
	loading?: boolean;
	icon?: ReactNode;
	iconPosition?: 'left' | 'right';
	className?: string;
}

function Button({
	children,
	onClick,
	type = 'button',
	variant = 'solid',
	color = 'blue',
	size = 'md',
	fullWidth = false,
	disabled = false,
	loading = false,
	icon,
	iconPosition = 'left',
	className = '',
}: ButtonProps) {
	// Color palettes for each variant
	const colorClasses = {
		// Solid variant - background with white text
		solid: {
			blue: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 shadow-md hover:shadow-lg focus:ring-blue-500',
			red: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-md hover:shadow-lg focus:ring-red-500',
			green: 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700 shadow-md hover:shadow-lg focus:ring-green-500',
			gray: 'bg-gray-500 text-white hover:bg-gray-600 active:bg-gray-700 shadow-md hover:shadow-lg focus:ring-gray-500',
			purple: 'bg-purple-500 text-white hover:bg-purple-600 active:bg-purple-700 shadow-md hover:shadow-lg focus:ring-purple-500',
			pink: 'bg-pink-500 text-white hover:bg-pink-600 active:bg-pink-700 shadow-md hover:shadow-lg focus:ring-pink-500',
			yellow: 'bg-yellow-500 text-white hover:bg-yellow-600 active:bg-yellow-700 shadow-md hover:shadow-lg focus:ring-yellow-500',
		},
		// Outline variant - transparent background with colored border
		outline: {
			blue: 'bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-50 active:bg-blue-100 focus:ring-blue-500',
			red: 'bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-50 active:bg-red-100 focus:ring-red-500',
			green: 'bg-transparent border-2 border-green-500 text-green-500 hover:bg-green-50 active:bg-green-100 focus:ring-green-500',
			gray: 'bg-transparent border-2 border-gray-500 text-gray-500 hover:bg-gray-50 active:bg-gray-100 focus:ring-gray-500',
			purple: 'bg-transparent border-2 border-purple-500 text-purple-500 hover:bg-purple-50 active:bg-purple-100 focus:ring-purple-500',
			pink: 'bg-transparent border-2 border-pink-500 text-pink-500 hover:bg-pink-50 active:bg-pink-100 focus:ring-pink-500',
			yellow: 'bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-50 active:bg-yellow-100 focus:ring-yellow-500',
		},
		// Text variant - no background, no border, just colored text with color change on hover
		text: {
			blue: 'bg-transparent text-blue-600 hover:text-blue-700 active:text-blue-800 focus:ring-blue-500',
			red: 'bg-transparent text-red-600 hover:text-red-700 active:text-red-800 focus:ring-red-500',
			green: 'bg-transparent text-green-600 hover:text-green-700 active:text-green-800 focus:ring-green-500',
			gray: 'bg-transparent text-gray-600 hover:text-gray-700 active:text-gray-800 focus:ring-gray-500',
			purple: 'bg-transparent text-purple-600 hover:text-purple-700 active:text-purple-800 focus:ring-purple-500',
			pink: 'bg-transparent text-pink-600 hover:text-pink-700 active:text-pink-800 focus:ring-pink-500',
			yellow: 'bg-transparent text-yellow-600 hover:text-yellow-700 active:text-yellow-800 focus:ring-yellow-500',
		},
		// Link variant - looks like a hyperlink with underline on hover
		link: {
			blue: 'bg-transparent text-blue-600 hover:text-blue-700 hover:underline active:text-blue-800 focus:ring-blue-500',
			red: 'bg-transparent text-red-600 hover:text-red-700 hover:underline active:text-red-800 focus:ring-red-500',
			green: 'bg-transparent text-green-600 hover:text-green-700 hover:underline active:text-green-800 focus:ring-green-500',
			gray: 'bg-transparent text-gray-600 hover:text-gray-700 hover:underline active:text-gray-800 focus:ring-gray-500',
			purple: 'bg-transparent text-purple-600 hover:text-purple-700 hover:underline active:text-purple-800 focus:ring-purple-500',
			pink: 'bg-transparent text-pink-600 hover:text-pink-700 hover:underline active:text-pink-800 focus:ring-pink-500',
			yellow: 'bg-transparent text-yellow-600 hover:text-yellow-700 hover:underline active:text-yellow-800 focus:ring-yellow-500',
		},
	};

	// Size styles - adjusted for different variants
	const sizeClasses = {
		sm:
			variant === 'link'
				? 'px-1 py-0.5 text-sm'
				: 'px-3 py-1.5 text-sm rounded-md',
		md:
			variant === 'link'
				? 'px-2 py-1 text-base'
				: 'px-4 py-2 text-base rounded-lg',
		lg:
			variant === 'link'
				? 'px-2 py-1 text-lg'
				: 'px-6 py-3 text-lg rounded-xl',
	};

	// Disabled styles
	const disabledClasses =
		disabled || loading
			? 'opacity-50 cursor-not-allowed pointer-events-none'
			: 'cursor-pointer';

	// Width styles
	const widthClasses = fullWidth ? 'w-full' : 'w-auto';

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled || loading}
			className={`
				${colorClasses[variant][color]}
				${sizeClasses[size]}
				${disabledClasses}
				${widthClasses}
				font-medium
				transition-all duration-200 ease-in-out
				flex items-center justify-center gap-2
				focus:outline-none focus:ring-2 focus:ring-offset-2
				${className}
			`}
		>
			{loading ? (
				<>
					<LoadingSpinner />
					<span>Loading...</span>
				</>
			) : (
				<>
					{icon && iconPosition === 'left' && <span>{icon}</span>}
					{children}
					{icon && iconPosition === 'right' && <span>{icon}</span>}
				</>
			)}
		</button>
	);
}

export default Button;
