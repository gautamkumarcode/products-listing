"use client";

import React, { createContext, useContext, useState } from "react";

interface SearchContextType {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	selectedCategory: string;
	setSelectedCategory: (category: string) => void;
	selectedBrands: string[];
	setSelectedBrands: (brands: string[]) => void;
	priceRange: [number, number];
	setPriceRange: (range: [number, number]) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
	const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

	return (
		<SearchContext.Provider
			value={{
				searchQuery,
				setSearchQuery,
				selectedCategory,
				setSelectedCategory,
				selectedBrands,
				setSelectedBrands,
				priceRange,
				setPriceRange,
			}}>
			{children}
		</SearchContext.Provider>
	);
}

export function useSearch() {
	const context = useContext(SearchContext);
	if (context === undefined) {
		throw new Error("useSearch must be used within a SearchProvider");
	}
	return context;
}
