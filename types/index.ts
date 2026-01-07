export interface Product {
	id: string;
	title: string;
	price: number;
	category: string;
	brand: string;
	image: string;
	images?: string[];
	description?: string;
	rating?: number;
}
