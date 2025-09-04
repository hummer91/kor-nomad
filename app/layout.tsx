import type React from "react";
import type { Metadata } from "next";
import { Buenard as Pretendard } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";

const pretendard = Pretendard({
	subsets: ["latin"],
	display: "swap",
	weight: ["400", "700"],
	variable: "--font-pretendard",
});

export const metadata: Metadata = {
	title: "KOR NOMAD - 한국 디지털 노마드를 위한 최고의 도시 찾기",
	description:
		"생활비, 인터넷, 카페 문화까지 - 한국의 모든 도시 데이터로 완벽한 디지털 노마드 라이프를 시작하세요",
	generator: "v0.app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko">
			<body
				className={`font-sans ${pretendard.variable} ${GeistSans.variable} ${GeistMono.variable}`}
			>
				<Suspense fallback={null}>{children}</Suspense>
				<Analytics />
			</body>
		</html>
	);
}
