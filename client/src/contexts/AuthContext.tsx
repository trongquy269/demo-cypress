'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import axiosClient from '@/configs/apis/AxiosClient';
import { ApiEndpoint } from '@/configs/apis/ApiEndpoint';

type User = {
	id: string;
	email: string;
	name: string;
	role: string;
	avatar?: string;
	createAt: Date;
	updateAt: Date;
};

type AuthContextType = {
	user: User | null;
	loading: boolean;
	logout: () => Promise<void>;
	refetchUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const pathname = usePathname();

	const fetchUser = async () => {
		try {
			const response = await axiosClient.get(ApiEndpoint.profile);
			if (response?.status === 200 && response.data) {
				setUser(response.data);
			}
		} catch {
			// User not authenticated or token expired - silently set user to null
			setUser(null);
		} finally {
			setLoading(false);
		}
	};

	const logout = async () => {
		try {
			await axiosClient.post(ApiEndpoint.logout);
			setUser(null);
		} catch (error) {
			console.error('Logout failed:', error);
		}
	};

	useEffect(() => {
		// Skip authentication check for /auth/* routes
		if (pathname?.startsWith('/auth/')) {
			setLoading(false);
			return;
		}

		fetchUser();
	}, [pathname]);

	return (
		<AuthContext.Provider
			value={{ user, loading, logout, refetchUser: fetchUser }}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}
