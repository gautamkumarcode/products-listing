export interface Product {
	id: string;
	title: string;
	price: number;
	category: string;
	image: string;
	images?: string[];
	description?: string;
	rating?: number;
}
