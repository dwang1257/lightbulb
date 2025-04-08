import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import React from "react";  
import Link from "next/link";
import Image from "next/image";
import lightbulb from "./lightbulb.png";

const geistSans = localFont({
  src: './fonts/Geist-VariableFont_wght.ttf',
  variable: '--font-geist-sans',
});

const geistMono = localFont({
  src: './fonts/GeistMono-VariableFont_wght.ttf',
  variable: '--font-geist-mono',
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
