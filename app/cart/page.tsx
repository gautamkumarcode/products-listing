"use client";

import { useCart } from "@/context/CartContext";
import {
	ArrowLeft,
	IndianRupee,
	Minus,
	Plus,
	ShoppingCart,
	Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
	const { cart, updateQuantity, removeFromCart, clearCart, cartTotal } =
		useCart();

	if (cart.length === 0) {
		return (
			<div className="min-h-screen bg-gray-100">
				<main className="container mx-auto px-4 py-16">
					<div className="max-w-2xl mx-auto text-center">
						<ShoppingCart className="w-24 h-24 mx-auto text-gray-400 mb-6" />
						<h1 className="text-3xl font-bold text-gray-800 mb-4">
							Your Cart is Empty
						</h1>
						<p className="text-gray-600 mb-8">
							Looks like you haven't added any items to your cart yet.
						</p>
						<Link
							href="/"
							className="inline-flex items-center gap-2 bg-[#0C5BA0] text-white px-6 py-3 rounded-md hover:bg-[#094A85] transition-colors">
							<ArrowLeft className="w-5 h-5" />
							Continue Shopping
						</Link>
					</div>
				</main>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-100">
			<main className="container mx-auto px-4 py-8">
				<div className="flex items-center justify-between mb-8">
					<h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
					<Link
						href="/"
						className="flex items-center gap-2 text-[#0C5BA0] hover:text-[#094A85] font-medium">
						<ArrowLeft className="w-5 h-5" />
						Continue Shopping
					</Link>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2 space-y-4">
						{cart.map((item) => (
							<div
								key={item.id}
								className="bg-white rounded-lg p-6 shadow-sm flex gap-4">
								<div className="w-24 h-24 shrink-0 bg-gray-100 rounded-md relative">
									<Image
										src={item.image}
										alt={item.title}
										fill
										className="object-contain p-2"
										sizes="96px"
									/>
								</div>

								<div className="flex-1 min-w-0">
									<div className="flex justify-between items-start mb-2">
										<div>
											<Link
												href={`/product/<IndianRupee size={16} />{item.id}`}
												className="font-semibold text-gray-900 hover:text-[#0C5BA0] line-clamp-1">
												{item.title}
											</Link>
											<p className="text-sm text-gray-500">{item.brand}</p>
										</div>
										<button
											onClick={() => removeFromCart(item.id)}
											className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-md transition-colors"
											aria-label="Remove item">
											<Trash2 className="w-5 h-5" />
										</button>
									</div>

									<div className="flex items-center justify-between mt-4">
										<div className="flex items-center gap-2">
											<button
												onClick={() =>
													updateQuantity(item.id, item.quantity - 1)
												}
												className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
												disabled={item.quantity <= 1}>
												<Minus className="w-4 h-4" />
											</button>
											<span className="w-12 text-center font-medium">
												{item.quantity}
											</span>
											<button
												onClick={() =>
													updateQuantity(item.id, item.quantity + 1)
												}
												className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
												<Plus className="w-4 h-4" />
											</button>
										</div>

										<div className="text-right">
											<p className="text-sm text-gray-500 flex items-center gap-1">
												<IndianRupee size={16} />
												{item.price} each
											</p>
											<p className="text-lg font-bold text-gray-900 flex items-center gap-1">
												<IndianRupee size={16} />
												{(item.price * item.quantity).toFixed(2)}
											</p>
										</div>
									</div>
								</div>
							</div>
						))}

						<button
							onClick={clearCart}
							className="w-full py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors font-medium">
							Clear Cart
						</button>
					</div>

					<div className="lg:col-span-1">
						<div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
							<h2 className="text-xl font-bold text-gray-800 mb-6">
								Order Summary
							</h2>

							<div className="space-y-3 mb-6">
								<div className="flex justify-between text-gray-600">
									<span>
										Subtotal (
										{cart.reduce((sum, item) => sum + item.quantity, 0)} items)
									</span>
									<span className="font-medium flex items-center gap-1">
										<IndianRupee size={16} />
										{cartTotal.toFixed(2)}
									</span>
								</div>
								<div className="flex justify-between text-gray-600">
									<span>Shipping</span>
									<span className="text-green-600 font-medium">Free</span>
								</div>
								<div className="flex justify-between text-gray-600">
									<span>Tax</span>
									<span className="font-medium flex items-center gap-1">
										<IndianRupee size={16} />
										{(cartTotal * 0.1).toFixed(2)}
									</span>
								</div>
								<div className="border-t pt-3 mt-3">
									<div className="flex justify-between text-lg font-bold text-gray-900">
										<span>Total</span>
										<span className="flex items-center gap-1">
											<IndianRupee size={16} />
											{(cartTotal * 1.1).toFixed(2)}
										</span>
									</div>
								</div>
							</div>

							<Link
								href="/checkout"
								className="block w-full bg-[#0C5BA0] text-white py-3 rounded-md hover:bg-[#094A85] transition-colors font-medium mb-3 text-center">
								Proceed to Checkout
							</Link>

							<div className="text-center text-sm text-gray-500">
								<p>Secure checkout powered by</p>
								<p className="font-medium text-gray-700">SSL Encryption</p>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
