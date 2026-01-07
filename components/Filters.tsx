"use client";

interface FiltersProps {
	selectedCategory: string;
	onCategoryChange: (category: string) => void;
	priceRange: [number, number];
	onPriceChange: (range: [number, number]) => void;
}

export default function Filters({
	selectedCategory,
	onCategoryChange,
	priceRange,
	onPriceChange,
}: FiltersProps) {
	const categories = ["All", "Electronics", "Clothing", "Home"];

	return (
		<div className="space-y-6">
			{/* Filters Card */}
			<div className="bg-[#0C5BA0] text-white rounded-lg p-6">
				<h2 className="text-xl font-bold mb-6">Filters</h2>

				{/* Category Filter */}
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

				{/* Price Range Filter */}
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
			</div>

			{/* Category Card (Second Filter) */}
			<div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
				<h2 className="text-xl font-bold mb-6 text-gray-800">Cayryoy</h2>

				{/* Category Radio Buttons */}
				<div className="space-y-2 mb-6">
					{categories.map((category) => (
						<label
							key={category}
							className="flex items-center cursor-pointer group">
							<input
								type="radio"
								name="category2"
								value={category}
								checked={selectedCategory === category}
								onChange={(e) => onCategoryChange(e.target.value)}
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
							/>
							<span className="ml-2 text-sm text-gray-700 group-hover:font-medium">
								{category}
							</span>
						</label>
					))}
				</div>

				{/* Price Input */}
				<div>
					<h3 className="text-base font-semibold mb-3 text-gray-800">Price</h3>
					<input
						type="number"
						value={priceRange[1]}
						onChange={(e) =>
							onPriceChange([priceRange[0], parseInt(e.target.value) || 0])
						}
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Enter max price"
					/>
				</div>
			</div>
		</div>
	);
}
