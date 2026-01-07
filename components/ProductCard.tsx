import { Product } from "@/types";
import { IndianRupee, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
	product: Product;
	onAddToCart: (product: Product) => void;
}

export default function ProductCard({
	product,
	onAddToCart,
}: ProductCardProps) {
	return (
		<div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
			<Link href={`/product/${product.id}`}>
				<div className="aspect-square bg-gray-100 relative flex items-center justify-center">
					<div className="w-48 h-48 relative">
						<Image
							src={product.image}
							alt={product.title}
							fill
							className="object-contain"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
					</div>
				</div>
			</Link>

			<div className="p-4">
				<Link href={`/product/${product.id}`}>
					<h3 className="font-semibold text-gray-900 mb-1 hover:text-blue-600">
						{product.title}
					</h3>
				</Link>
				<p className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-1">
					<IndianRupee size={18} />
					{product.price}
				</p>

				{product.rating && (
					<div className="flex items-center gap-1 mb-3">
						{[...Array(5)].map((_, i) => (
							<Star
								key={i}
								className={`w-4 h-4 ${
									i < Math.floor(product.rating!)
										? "fill-blue-500 text-blue-500"
										: i < product.rating!
										? "fill-blue-300 text-blue-300"
										: "fill-gray-200 text-gray-200"
								}`}
							/>
						))}
					</div>
				)}

				<button
					onClick={() => onAddToCart(product)}
					className="w-full bg-[#0C5BA0] hover:bg-[#094A85] text-white font-medium py-2 px-4 rounded-md transition-colors">
					Add to Cart
				</button>
			</div>
		</div>
	);
}
