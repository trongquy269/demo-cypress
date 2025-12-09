import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home page',
};

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
