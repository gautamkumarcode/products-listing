"use client";

import { CheckCircle, Home, Package } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
	const searchParams = useSearchParams();
	const orderNumber = searchParams.get("order") || "ORD-UNKNOWN";

	return (
		<div className="min-h-screen bg-gray-100">
			<main className="container mx-auto px-4 py-16">
				<div className="max-w-2xl mx-auto">
					<div className="bg-white rounded-lg p-8 md:p-12 shadow-sm text-center">
						<div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
							<CheckCircle className="w-12 h-12 text-green-600" />
						</div>

						<h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
							Order Placed Successfully!
						</h1>

						<p className="text-gray-600 mb-8">
							Thank you for your order. We've received your order and will begin
							processing it shortly.
						</p>

						<div className="bg-gray-50 rounded-lg p-6 mb-8">
							<div className="flex items-center justify-center gap-2 mb-2">
								<Package className="w-5 h-5 text-[#0C5BA0]" />
								<span className="text-sm font-medium text-gray-600">
									Order Number
								</span>
							</div>
							<p className="text-2xl font-bold text-[#0C5BA0]">{orderNumber}</p>
						</div>

						<div className="space-y-4 text-left mb-8">
							<div className="flex items-start gap-3">
								<div className="w-2 h-2 bg-[#0C5BA0] rounded-full mt-2" />
								<div>
									<p className="font-semibold text-gray-800">
										Order Confirmation
									</p>
									<p className="text-sm text-gray-600">
										You will receive an order confirmation email with details of
										your order.
									</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-2 h-2 bg-[#0C5BA0] rounded-full mt-2" />
								<div>
									<p className="font-semibold text-gray-800">
										Shipping Updates
									</p>
									<p className="text-sm text-gray-600">
										We'll send you shipping updates and tracking information
										once your order is dispatched.
									</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<div className="w-2 h-2 bg-[#0C5BA0] rounded-full mt-2" />
								<div>
									<p className="font-semibold text-gray-800">
										Expected Delivery
									</p>
									<p className="text-sm text-gray-600">
										Your order will be delivered within 5-7 business days.
									</p>
								</div>
							</div>
						</div>

						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link
								href="/"
								className="inline-flex items-center justify-center gap-2 bg-[#0C5BA0] text-white px-6 py-3 rounded-md hover:bg-[#094A85] transition-colors font-medium">
								<Home className="w-5 h-5" />
								Back to Home
							</Link>
							<Link
								href="/"
								className="inline-flex items-center justify-center gap-2 bg-white text-[#0C5BA0] border-2 border-[#0C5BA0] px-6 py-3 rounded-md hover:bg-gray-50 transition-colors font-medium">
								Continue Shopping
							</Link>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default function SuccessPage() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen bg-gray-100 flex items-center justify-center">
					<div className="w-8 h-8 border-4 border-[#0C5BA0] border-t-transparent rounded-full animate-spin" />
				</div>
			}>
			<SuccessContent />
		</Suspense>
	);
}
