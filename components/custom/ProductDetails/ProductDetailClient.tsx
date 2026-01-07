"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/types";
import {
	ArrowLeft,
	Heart,
	IndianRupee,
	Minus,
	Plus,
	ShoppingCart,
	Star,
	Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProductDetailClientProps {
	product: Product;
}

export default function ProductDetailClient({
	product,
}: ProductDetailClientProps) {
	const { addToCart } = useCart();
	const [selectedImage, setSelectedImage] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [isAdding, setIsAdding] = useState(false);

	const images = product.images || [product.image];

	const handleAddToCart = () => {
		setIsAdding(true);
		for (let i = 0; i < quantity; i++) {
			addToCart(product);
		}
		setTimeout(() => {
			setIsAdding(false);
		}, 500);
	};

	const incrementQuantity = () => {
		setQuantity((prev) => Math.min(prev + 1, 10));
	};

	const decrementQuantity = () => {
		setQuantity((prev) => Math.max(prev - 1, 1));
	};

	return (
		<div className="min-h-screen bg-gray-100">
			<main className="container mx-auto px-4 py-8">
				<Link
					href="/"
					className="inline-flex items-center gap-2 text-[#0C5BA0] hover:text-[#094A85] font-medium mb-6">
					<ArrowLeft className="w-5 h-5" />
					Back to Products
				</Link>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div className="space-y-4">
						<div className="bg-white rounded-lg p-4 shadow-sm">
							<div className="relative aspect-square w-full overflow-hidden rounded-lg">
								<Image
									src={images[selectedImage]}
									alt={product.title}
									fill
									className="object-cover"
									priority
								/>
							</div>
						</div>

						{images.length > 1 && (
							<div className="grid grid-cols-4 gap-4">
								{images.map((img, index) => (
									<button
										key={index}
										onClick={() => setSelectedImage(index)}
										className={`relative aspect-square w-full overflow-hidden rounded-lg border-2 transition-all ${
											selectedImage === index
												? "border-[#0C5BA0]"
												: "border-gray-200 hover:border-gray-300"
										}`}>
										<Image
											src={img}
											alt={`${product.title} - View ${index + 1}`}
											fill
											className="object-cover"
										/>
									</button>
								))}
							</div>
						)}
					</div>

					<div className="space-y-6">
						<div className="bg-white rounded-lg p-6 shadow-sm">
							<div className="flex items-center gap-3 mb-3">
								<span className="text-sm font-medium text-[#0C5BA0] bg-blue-50 px-3 py-1 rounded-full">
									{product.brand}
								</span>
								<span className="text-sm text-gray-600">
									{product.category}
								</span>
							</div>

							<h1 className="text-3xl font-bold text-gray-800 mb-4">
								{product.title}
							</h1>

							{product.rating && (
								<div className="flex items-center gap-2 mb-4">
									<div className="flex items-center">
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												className={`w-5 h-5 ${
													i < Math.floor(product.rating!)
														? "text-yellow-400 fill-yellow-400"
														: "text-gray-300"
												}`}
											/>
										))}
									</div>
									<span className="text-gray-600 font-medium">
										{product.rating.toFixed(1)}
									</span>
								</div>
							)}

							<div className="flex items-center gap-2 mb-6">
								<div className="flex items-center gap-1 text-4xl font-bold text-gray-800">
									<IndianRupee className="w-8 h-8" />
									{product.price.toFixed(2)}
								</div>
							</div>

							<div className="border-t border-gray-200 pt-6 mb-6">
								<h2 className="text-lg font-semibold text-gray-800 mb-3">
									Product Description
								</h2>
								<p className="text-gray-600 leading-relaxed">
									{product.description}
								</p>
							</div>

							<div className="border-t border-gray-200 pt-6 mb-6">
								<label className="block text-sm font-medium text-gray-700 mb-3">
									Quantity
								</label>
								<div className="flex items-center gap-4">
									<div className="flex items-center border border-gray-300 rounded-md">
										<button
											onClick={decrementQuantity}
											disabled={quantity <= 1}
											className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
											<Minus className="w-4 h-4" />
										</button>
										<span className="px-6 py-3 font-semibold text-gray-800">
											{quantity}
										</span>
										<button
											onClick={incrementQuantity}
											disabled={quantity >= 10}
											className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
											<Plus className="w-4 h-4" />
										</button>
									</div>
									<span className="text-sm text-gray-600">
										(Max 10 per order)
									</span>
								</div>
							</div>

							<div className="flex gap-4">
								<button
									onClick={handleAddToCart}
									disabled={isAdding}
									className="flex-1 bg-[#0C5BA0] text-white py-4 rounded-md hover:bg-[#094A85] transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-50">
									{isAdding ? (
										<>
											<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
											Adding...
										</>
									) : (
										<>
											<ShoppingCart className="w-5 h-5" />
											Add to Cart
										</>
									)}
								</button>
								<button className="p-4 border-2 border-gray-300 rounded-md hover:border-[#0C5BA0] hover:text-[#0C5BA0] transition-colors">
									<Heart className="w-6 h-6" />
								</button>
							</div>
						</div>

						<div className="bg-white rounded-lg p-6 shadow-sm space-y-4">
							<div className="flex items-start gap-4">
								<div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
									<Truck className="w-5 h-5 text-[#0C5BA0]" />
								</div>
								<div>
									<h3 className="font-semibold text-gray-800 mb-1">
										Free Delivery
									</h3>
									<p className="text-sm text-gray-600">
										Free shipping on orders over ₹500
									</p>
								</div>
							</div>
							<div className="flex items-start gap-4">
								<div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
									<ShoppingCart className="w-5 h-5 text-[#0C5BA0]" />
								</div>
								<div>
									<h3 className="font-semibold text-gray-800 mb-1">
										Easy Returns
									</h3>
									<p className="text-sm text-gray-600">
										30-day return policy for all products
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
