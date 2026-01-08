"use client";

import Filters from "@/components/custom/Filter/Filters";
import ProductCard from "@/components/custom/ProductCard/ProductCard";
import { useCart } from "@/context/CartContext";
import { useSearch } from "@/context/SearchContext";
import { products } from "@/data/products";
import { Filter, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const {
		searchQuery,
		setSearchQuery,
		selectedCategory,
		setSelectedCategory,
		selectedBrands,
		setSelectedBrands,
		priceRange,
		setPriceRange,
	} = useSearch();

	const [showFilters, setShowFilters] = useState(false);
	const { addToCart } = useCart();

	useEffect(() => {
		const category = searchParams.get("category") || "All";
		const brands = searchParams.get("brands")?.split(",").filter(Boolean) || [];
		const price = searchParams.get("price");
		const search = searchParams.get("search") || "";

		setSelectedCategory(category);
		setSelectedBrands(brands);
		setSearchQuery(search);

		if (price) {
			const [min, max] = price.split("-").map(Number);
			if (!isNaN(min) && !isNaN(max)) {
				setPriceRange([min, max]);
			}
		}
	}, []);

	useEffect(() => {
		const params = new URLSearchParams();

		if (selectedCategory !== "All") {
			params.set("category", selectedCategory);
		}

		if (selectedBrands.length > 0) {
			params.set("brands", selectedBrands.join(","));
		}

		if (priceRange[0] !== 0 || priceRange[1] !== 1000) {
			params.set("price", `${priceRange[0]}-${priceRange[1]}`);
		}

		if (searchQuery) {
			params.set("search", searchQuery);
		}

		const queryString = params.toString();
		const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
		router.push(newUrl, { scroll: false });
	}, [
		selectedCategory,
		selectedBrands,
		priceRange,
		searchQuery,
		pathname,
		router,
	]);

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
				<div className="flex items-center justify-end mb-6 lg:hidden">
					<button
						onClick={() => setShowFilters(!showFilters)}
						className="flex items-center gap-2 bg-[#0C5BA0] text-white px-4 py-2 rounded-md hover:bg-[#094A85]">
						<Filter className="w-5 h-5" />
						Filters
					</button>
				</div>

				<div className="flex gap-6 relative">
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

					<div className="flex-1">
						<h1 className="text-3xl font-bold text-gray-800 mb-6">
							Product Listing
						</h1>

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
