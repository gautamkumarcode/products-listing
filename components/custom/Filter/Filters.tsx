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
					<h3 className="text-base font-semibold mb-3">Price Range</h3>
					<div className="space-y-4">
						<div className="relative h-12 flex items-center">
							<div className="absolute w-full h-1.5 bg-white/30 rounded-full" />

							<div
								className="absolute h-1.5 bg-white rounded-full"
								style={{
									left: `${(priceRange[0] / 1000) * 100}%`,
									width: `${((priceRange[1] - priceRange[0]) / 1000) * 100}%`,
								}}
							/>

							<input
								type="range"
								min="0"
								max="1000"
								step="10"
								value={priceRange[0]}
								onChange={(e) => {
									const value = parseInt(e.target.value);
									if (value < priceRange[1] - 10) {
										onPriceChange([value, priceRange[1]]);
									}
								}}
								className="range-slider range-slider-min"
							/>

							<input
								type="range"
								min="0"
								max="1000"
								step="10"
								value={priceRange[1]}
								onChange={(e) => {
									const value = parseInt(e.target.value);
									if (value > priceRange[0] + 10) {
										onPriceChange([priceRange[0], value]);
									}
								}}
								className="range-slider range-slider-max"
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="bg-white rounded-lg p-6 shadow-md">
				<h3 className="text-base font-semibold mb-3 text-gray-800">Brand</h3>
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
								className="w-4 h-4 text-[#0C5BA0] bg-white border-gray-300 rounded focus:ring-2 focus:ring-[#0C5BA0] cursor-pointer"
							/>
							<span className="ml-2 text-sm text-gray-700 group-hover:font-medium">
								{brand}
							</span>
						</label>
					))}
				</div>
			</div>

			<div className="bg-white rounded-lg p-6 shadow-md">
				<h3 className="text-base font-semibold mb-3 text-gray-800">Price</h3>
				<input
					type="number"
					min="0"
					max="10000"
					value={priceRange[1]}
					onChange={(e) => {
						const value = parseInt(e.target.value) || 0;
						onPriceChange([0, value]);
					}}
					placeholder="Enter max price"
					className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#0C5BA0] focus:border-transparent"
				/>
			</div>
		</div>
	);
}
