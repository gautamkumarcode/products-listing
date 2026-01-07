import Footer from "@/components/custom/Footer/Footer";
import Header from "@/components/custom/Header/Header";
import { CartProvider } from "@/context/CartContext";
import { SearchProvider } from "@/context/SearchContext";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
	title: "Product Listing - Shop Online",
	description: "Browse and shop our wide selection of products",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
				<CartProvider>
					<SearchProvider>
						<Header />
						<main className="flex-1">{children}</main>
						<Footer />
					</SearchProvider>
				</CartProvider>
			</body>
		</html>
	);
}
