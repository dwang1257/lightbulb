import localFont from 'next/font/local';
import "./globals.css";
import React from "react";  

// Define fonts at the module scope (not exported)
const geistSans = localFont({
  src: './fonts/Geist-VariableFont_wght.ttf',
  variable: '--font-geist-sans',
  display: 'swap',
});

const geistMono = localFont({
  src: './fonts/GeistMono-VariableFont_wght.ttf',
  variable: '--font-geist-mono',
  display: 'swap',
});

export default function Layout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
