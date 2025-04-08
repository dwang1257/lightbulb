import type { Metadata } from "next";
import "./globals.css";
import React from "react";  
import Link from "next/link";
import Image from "next/image";
import lightbulb from "./lightbulb.png";
import { geistSans, geistMono } from './fonts';

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
