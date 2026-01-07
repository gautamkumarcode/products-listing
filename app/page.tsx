"use client";

import Filters from "@/components/custom/Filter/Filters";
import ProductCard from "@/components/custom/ProductCard/ProductCard";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { Filter, X } from "lucide-react";
import { useMemo, useState } from "react";

export default function Home() {
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
	const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
	const [searchQuery, setSearchQuery] = useState("");
	const [showFilters, setShowFilters] = useState(false);
	const { addToCart } = useCart();

	const filteredProducts = useMemo(() => {
		return products.filter((product) => {
			const matchesCategory =
				selectedCategory === "All" || product.category === selectedCategory;
			const matchesBrand =
				selectedBrands.length === 0 || selectedBrands.includes(product.brand);
			const matchesPrice =
				product.price >= priceRange[0] && product.price <= priceRange[1];
			const matchesSearch =
				searchQuery === "" ||
				product.title.toLowerCase().includes(searchQuery.toLowerCase());

			return matchesCategory && matchesBrand && matchesPrice && matchesSearch;
		});
	}, [selectedCategory, selectedBrands, priceRange, searchQuery]);

	return (
		<div className="min-h-screen bg-gray-100">
			<main className="container mx-auto px-4 py-8">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-3xl font-bold text-gray-800">Product Listing</h1>

					{/* Mobile Filter Toggle */}
					<button
						onClick={() => setShowFilters(!showFilters)}
						className="lg:hidden flex items-center gap-2 bg-[#0C5BA0] text-white px-4 py-2 rounded-md hover:bg-[#094A85]">
						<Filter className="w-5 h-5" />
						Filters
					</button>
				</div>

				<div className="flex gap-6 relative">
					{/* Sidebar */}
					<aside
						className={`${
							showFilters ? "block" : "hidden"
						} lg:block w-64 shrink-0 fixed lg:static inset-0 bg-black/50 lg:bg-transparent z-40`}
						onClick={(e) => {
							if (e.target === e.currentTarget) setShowFilters(false);
						}}>
						<div className="w-64 h-full lg:h-auto bg-white lg:bg-transparent p-4 lg:p-0 overflow-y-auto">
							<div className="flex items-center justify-between mb-4 lg:hidden">
								<h2 className="text-xl font-bold">Filters</h2>
								<button
									onClick={() => setShowFilters(false)}
									className="p-2 hover:bg-gray-100 rounded-md">
									<X className="w-5 h-5" />
								</button>
							</div>
							<Filters
								selectedCategory={selectedCategory}
								onCategoryChange={setSelectedCategory}
								selectedBrands={selectedBrands}
								onBrandChange={setSelectedBrands}
								priceRange={priceRange}
								onPriceChange={setPriceRange}
							/>
						</div>
					</aside>

					{/* Products Grid */}
					<div className="flex-1">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{filteredProducts.map((product) => (
								<ProductCard
									key={product.id}
									product={product}
									onAddToCart={addToCart}
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
