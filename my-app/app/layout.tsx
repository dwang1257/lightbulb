import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import React from "react";  


export const geistSans = localFont({
  src: './fonts/Geist-VariableFont_wght.ttf',
  variable: '--font-geist-sans',
  display: 'swap',
});

export const geistMono = localFont({
  src: './fonts/GeistMono-VariableFont_wght.ttf',
  variable: '--font-geist-mono',
  display: 'swap',
}); 

export default function Layout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} font-sans antialiased`}>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
