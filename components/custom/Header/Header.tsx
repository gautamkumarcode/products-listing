"use client";

import { useCart } from "@/context/CartContext";
import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function Header() {
	const { cartCount } = useCart();

	return (
		<header className="bg-[#0C5BA0] text-white">
			<div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
				<Link href="/" className="text-2xl font-bold">
					Logo
				</Link>

				<div className="flex-1 max-w-md mx-4">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
						<input
							type="text"
							placeholder="Search for products..."
							className="w-full pl-10 pr-4 py-2 rounded-md border border-blue-300 focus:outline-none focus:border-blue-500 text-white bg-[#0C5BA0] placeholder-gray-200"
						/>
					</div>
				</div>

				<Link
					href="/cart"
					className="flex items-center gap-2 bg-[#0C5BA0] hover:bg-[#094A85] px-4 py-2 rounded-md border border-white transition-colors relative">
					<ShoppingCart className="w-5 h-5" />
					<span className="font-medium">Cart</span>
					{cartCount > 0 && (
						<span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
							{cartCount}
						</span>
					)}
				</Link>
			</div>
		</header>
	);
}
