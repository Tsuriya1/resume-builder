import type { Metadata } from 'next';
import './globals.css';
import React from "react";

export const metadata: Metadata = {
  title: 'Resume Builder',
  description: 'Resume Builder frontend scaffold',
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

