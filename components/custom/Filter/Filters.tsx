"use client";

interface FiltersProps {
	selectedCategory: string;
	onCategoryChange: (category: string) => void;
	selectedBrands: string[];
	onBrandChange: (brands: string[]) => void;
	priceRange: [number, number];
	onPriceChange: (range: [number, number]) => void;
}

export default function Filters({
	selectedCategory,
	onCategoryChange,
	selectedBrands,
	onBrandChange,
	priceRange,
	onPriceChange,
}: FiltersProps) {
	const categories = ["All", "Electronics", "Clothing", "Home"];
	const brands = [
		"Nike",
		"Sony",
		"Apple",
		"Samsung",
		"Dell",
		"Canon",
		"Ray-Ban",
		"JBL",
		"Logitech",
	];

	const handleBrandToggle = (brand: string) => {
		if (selectedBrands.includes(brand)) {
			onBrandChange(selectedBrands.filter((b) => b !== brand));
		} else {
			onBrandChange([...selectedBrands, brand]);
		}
	};

	return (
		<div className="space-y-6">
			<div className="bg-[#0C5BA0] text-white rounded-lg p-6">
				<h2 className="text-xl font-bold mb-6">Filters</h2>

				<div className="mb-6">
					<h3 className="text-base font-semibold mb-3">Category</h3>
					<div className="space-y-2">
						{categories.map((category) => (
							<label
								key={category}
								className="flex items-center cursor-pointer group">
								<input
									type="radio"
									name="category"
									value={category}
									checked={selectedCategory === category}
									onChange={(e) => onCategoryChange(e.target.value)}
									className="w-4 h-4 text-blue-600 bg-white border-white focus:ring-2 focus:ring-white cursor-pointer"
								/>
								<span className="ml-2 text-sm group-hover:font-medium">
									{category}
								</span>
							</label>
						))}
					</div>
				</div>

				<div>
					<h3 className="text-base font-semibold mb-3">Price</h3>
					<div className="space-y-3">
						<input
							type="range"
							min="0"
							max="1000"
							value={priceRange[1]}
							onChange={(e) =>
								onPriceChange([priceRange[0], parseInt(e.target.value)])
							}
							className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer accent-white"
						/>
						<div className="flex justify-between text-sm">
							<span>{priceRange[0]}</span>
							<span>{priceRange[1]}</span>
						</div>
					</div>
				</div>

				<div className="pt-4 border-t border-white/20">
					<h3 className="text-base font-semibold mb-3">Brand</h3>
					<div className="space-y-2 max-h-48 overflow-y-auto">
						{brands.map((brand) => (
							<label
								key={brand}
								className="flex items-center cursor-pointer group">
								<input
									type="checkbox"
									value={brand}
									checked={selectedBrands.includes(brand)}
									onChange={() => handleBrandToggle(brand)}
									className="w-4 h-4 text-blue-600 bg-white border-white rounded focus:ring-2 focus:ring-white cursor-pointer"
								/>
								<span className="ml-2 text-sm group-hover:font-medium">
									{brand}
								</span>
							</label>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
