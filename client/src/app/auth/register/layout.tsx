import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
	title: 'Register',
	description: 'Register to your account',
};

export default async function layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
