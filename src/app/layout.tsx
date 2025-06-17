import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { StagewiseToolbar } from '@stagewise/toolbar-next';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cursor AI 설치 가이드",
  description: "Cursor AI 코드 에디터 설치 및 사용법 프레젠테이션",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StagewiseToolbar />
        {children}
      </body>
    </html>
  );
}
