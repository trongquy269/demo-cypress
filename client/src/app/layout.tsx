import React from 'react';
import '@/styles/globals.css';
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
    >
      <head></head>

      <body className='scroll-smooth w-screen h-screen'>
        <AuthProvider>
          <main className='w-full h-full'>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
