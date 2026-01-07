"use client";

import { useCart } from "@/context/CartContext";
import { ArrowLeft, CheckCircle, IndianRupee } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function CheckoutPage() {
	const { cart, cartTotal, clearCart } = useCart();
	const router = useRouter();
	const [isProcessing, setIsProcessing] = useState(false);

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		address: "",
		city: "",
		state: "",
		zipCode: "",
		paymentMethod: "card",
	});

	const tax = cartTotal * 0.18;
	const shipping = cartTotal > 0 ? 100 : 0;
	const total = cartTotal + tax + shipping;

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setIsProcessing(true);

		// Simulate payment processing
		await new Promise((resolve) => setTimeout(resolve, 2000));

		// Generate order number
		const orderNumber = `ORD-${Date.now()}`;

		// Clear cart and redirect to success page
		clearCart();
		router.push(`/success?order=${orderNumber}`);
	};

	if (cart.length === 0) {
		return (
			<div className="min-h-screen bg-gray-100">
				<main className="container mx-auto px-4 py-16">
					<div className="max-w-2xl mx-auto text-center">
						<h1 className="text-3xl font-bold text-gray-800 mb-4">
							Your Cart is Empty
						</h1>
						<p className="text-gray-600 mb-8">
							Add some items to your cart before checking out.
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
				<div className="mb-8">
					<Link
						href="/cart"
						className="inline-flex items-center gap-2 text-[#0C5BA0] hover:text-[#094A85] font-medium mb-4">
						<ArrowLeft className="w-5 h-5" />
						Back to Cart
					</Link>
					<h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Checkout Form */}
					<div className="lg:col-span-2">
						<form onSubmit={handleSubmit} className="space-y-6">
							{/* Contact Information */}
							<div className="bg-white rounded-lg p-6 shadow-sm">
								<h2 className="text-xl font-semibold text-gray-800 mb-4">
									Contact Information
								</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label
											htmlFor="firstName"
											className="block text-sm font-medium text-gray-700 mb-2">
											First Name *
										</label>
										<input
											type="text"
											id="firstName"
											name="firstName"
											required
											value={formData.firstName}
											onChange={handleInputChange}
											className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C5BA0] focus:border-transparent"
										/>
									</div>
									<div>
										<label
											htmlFor="lastName"
											className="block text-sm font-medium text-gray-700 mb-2">
											Last Name *
										</label>
										<input
											type="text"
											id="lastName"
											name="lastName"
											required
											value={formData.lastName}
											onChange={handleInputChange}
											className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C5BA0] focus:border-transparent"
										/>
									</div>
									<div>
										<label
											htmlFor="email"
											className="block text-sm font-medium text-gray-700 mb-2">
											Email *
										</label>
										<input
											type="email"
											id="email"
											name="email"
											required
											value={formData.email}
											onChange={handleInputChange}
											className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C5BA0] focus:border-transparent"
										/>
									</div>
									<div>
										<label
											htmlFor="phone"
											className="block text-sm font-medium text-gray-700 mb-2">
											Phone *
										</label>
										<input
											type="tel"
											id="phone"
											name="phone"
											required
											value={formData.phone}
											onChange={handleInputChange}
											className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C5BA0] focus:border-transparent"
										/>
									</div>
								</div>
							</div>

							{/* Shipping Address */}
							<div className="bg-white rounded-lg p-6 shadow-sm">
								<h2 className="text-xl font-semibold text-gray-800 mb-4">
									Shipping Address
								</h2>
								<div className="space-y-4">
									<div>
										<label
											htmlFor="address"
											className="block text-sm font-medium text-gray-700 mb-2">
											Street Address *
										</label>
										<input
											type="text"
											id="address"
											name="address"
											required
											value={formData.address}
											onChange={handleInputChange}
											className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C5BA0] focus:border-transparent"
										/>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
										<div>
											<label
												htmlFor="city"
												className="block text-sm font-medium text-gray-700 mb-2">
												City *
											</label>
											<input
												type="text"
												id="city"
												name="city"
												required
												value={formData.city}
												onChange={handleInputChange}
												className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C5BA0] focus:border-transparent"
											/>
										</div>
										<div>
											<label
												htmlFor="state"
												className="block text-sm font-medium text-gray-700 mb-2">
												State *
											</label>
											<input
												type="text"
												id="state"
												name="state"
												required
												value={formData.state}
												onChange={handleInputChange}
												className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C5BA0] focus:border-transparent"
											/>
										</div>
										<div>
											<label
												htmlFor="zipCode"
												className="block text-sm font-medium text-gray-700 mb-2">
												ZIP Code *
											</label>
											<input
												type="text"
												id="zipCode"
												name="zipCode"
												required
												value={formData.zipCode}
												onChange={handleInputChange}
												className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C5BA0] focus:border-transparent"
											/>
										</div>
									</div>
								</div>
							</div>

							{/* Payment Method */}
							<div className="bg-white rounded-lg p-6 shadow-sm">
								<h2 className="text-xl font-semibold text-gray-800 mb-4">
									Payment Method
								</h2>
								<div className="space-y-3">
									<label className="flex items-center p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
										<input
											type="radio"
											name="paymentMethod"
											value="card"
											checked={formData.paymentMethod === "card"}
											onChange={handleInputChange}
											className="w-4 h-4 text-[#0C5BA0] focus:ring-[#0C5BA0]"
										/>
										<span className="ml-3 text-gray-700 font-medium">
											Credit / Debit Card
										</span>
									</label>
									<label className="flex items-center p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
										<input
											type="radio"
											name="paymentMethod"
											value="upi"
											checked={formData.paymentMethod === "upi"}
											onChange={handleInputChange}
											className="w-4 h-4 text-[#0C5BA0] focus:ring-[#0C5BA0]"
										/>
										<span className="ml-3 text-gray-700 font-medium">UPI</span>
									</label>
									<label className="flex items-center p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
										<input
											type="radio"
											name="paymentMethod"
											value="cod"
											checked={formData.paymentMethod === "cod"}
											onChange={handleInputChange}
											className="w-4 h-4 text-[#0C5BA0] focus:ring-[#0C5BA0]"
										/>
										<span className="ml-3 text-gray-700 font-medium">
											Cash on Delivery
										</span>
									</label>
								</div>
							</div>

							<button
								type="submit"
								disabled={isProcessing}
								className="w-full bg-[#0C5BA0] text-white py-4 rounded-md font-semibold hover:bg-[#094A85] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
								{isProcessing ? (
									<>
										<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
										Processing...
									</>
								) : (
									<>
										<CheckCircle className="w-5 h-5" />
										Place Order
									</>
								)}
							</button>
						</form>
					</div>

					{/* Order Summary */}
					<div className="lg:col-span-1">
						<div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
							<h2 className="text-xl font-semibold text-gray-800 mb-4">
								Order Summary
							</h2>

							<div className="space-y-4 mb-6">
								{cart.map((item) => (
									<div key={item.id} className="flex gap-3">
										<div className="relative w-16 h-16 flex-shrink-0">
											<Image
												src={item.image}
												alt={item.title}
												fill
												className="object-cover rounded"
											/>
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm font-medium text-gray-800 truncate">
												{item.title}
											</p>
											<p className="text-xs text-gray-600">
												Qty: {item.quantity}
											</p>
											<div className="flex items-center gap-0.5 text-sm font-semibold text-gray-800">
												<IndianRupee className="w-3.5 h-3.5" />
												{(item.price * item.quantity).toFixed(2)}
											</div>
										</div>
									</div>
								))}
							</div>

							<div className="border-t border-gray-200 pt-4 space-y-3">
								<div className="flex justify-between text-gray-700">
									<span>Subtotal</span>
									<div className="flex items-center gap-0.5 font-medium">
										<IndianRupee className="w-4 h-4" />
										{cartTotal.toFixed(2)}
									</div>
								</div>
								<div className="flex justify-between text-gray-700">
									<span>Tax (18%)</span>
									<div className="flex items-center gap-0.5 font-medium">
										<IndianRupee className="w-4 h-4" />
										{tax.toFixed(2)}
									</div>
								</div>
								<div className="flex justify-between text-gray-700">
									<span>Shipping</span>
									<div className="flex items-center gap-0.5 font-medium">
										<IndianRupee className="w-4 h-4" />
										{shipping.toFixed(2)}
									</div>
								</div>
								<div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold text-gray-800">
									<span>Total</span>
									<div className="flex items-center gap-0.5">
										<IndianRupee className="w-5 h-5" />
										{total.toFixed(2)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
