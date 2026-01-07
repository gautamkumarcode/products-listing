"use client";

import Filters from "@/components/Filters";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { Product } from "@/types";
import { useMemo, useState } from "react";

export default function Home() {
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
	const [searchQuery, setSearchQuery] = useState("");

	const handleAddToCart = (product: Product) => {
		console.log("Added to cart:", product);
		// Cart functionality will be added later
	};

	const filteredProducts = useMemo(() => {
		return products.filter((product) => {
			const matchesCategory =
				selectedCategory === "All" || product.category === selectedCategory;
			const matchesPrice =
				product.price >= priceRange[0] && product.price <= priceRange[1];
			const matchesSearch =
				searchQuery === "" ||
				product.title.toLowerCase().includes(searchQuery.toLowerCase());

			return matchesCategory && matchesPrice && matchesSearch;
		});
	}, [selectedCategory, priceRange, searchQuery]);

	return (
		<div className="min-h-screen bg-gray-100">
			<main className="container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold text-gray-800 mb-6">
					Product Listing
				</h1>

				<div className="flex gap-6">
					{/* Sidebar */}
					<aside className="w-64 shrink-0">
						<Filters
							selectedCategory={selectedCategory}
							onCategoryChange={setSelectedCategory}
							priceRange={priceRange}
							onPriceChange={setPriceRange}
						/>
					</aside>

					{/* Products Grid */}
					<div className="flex-1">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{filteredProducts.map((product) => (
								<ProductCard
									key={product.id}
									product={product}
									onAddToCart={handleAddToCart}
								/>
							))}
						</div>

						{filteredProducts.length === 0 && (
							<p className="text-center text-gray-500 py-12">
								No products found matching your criteria.
							</p>
						)}
					</div>
				</div>
			</main>
		</div>
	);
}
