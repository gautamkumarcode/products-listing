import { products } from "@/data/products";
import { notFound } from "next/navigation";
import ProductDetailClient from "../../../components/custom/ProductDetails/ProductDetailClient";

interface PageProps {
	params: Promise<{ id: string }>;
}

// Generate static params for all products
export async function generateStaticParams() {
	return products.map((product) => ({
		id: product.id,
	}));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
	const { id } = await params;
	const product = products.find((p) => p.id === id);

	if (!product) {
		return {
			title: "Product Not Found",
		};
	}

	return {
		title: `${product.title} - ${product.brand}`,
		description: product.description,
	};
}

export default async function ProductDetailPage({ params }: PageProps) {
	const { id } = await params;
	const product = products.find((p) => p.id === id);

	if (!product) {
		notFound();
	}

	return <ProductDetailClient product={product} />;
}
