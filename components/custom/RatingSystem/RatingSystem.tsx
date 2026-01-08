"use client";

import { Star } from "lucide-react";
import { useState } from "react";

interface RatingSystemProps {
	currentRating: number;
	totalRatings: number;
	userRating?: number;
	onRatingSubmit: (rating: number, comment: string) => void;
}

export default function RatingSystem({
	currentRating,
	totalRatings,
	userRating,
	onRatingSubmit,
}: RatingSystemProps) {
	const [hoveredRating, setHoveredRating] = useState(0);
	const [selectedRating, setSelectedRating] = useState(userRating || 0);
	const [comment, setComment] = useState("");
	const [showForm, setShowForm] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleStarClick = (rating: number) => {
		setSelectedRating(rating);
		if (!showForm) {
			setShowForm(true);
		}
	};

	const handleSubmit = async () => {
		if (selectedRating === 0) return;

		setIsSubmitting(true);
		await onRatingSubmit(selectedRating, comment);
		setIsSubmitting(false);
		setShowForm(false);
		setComment("");
	};

	const handleCancel = () => {
		setShowForm(false);
		setSelectedRating(userRating || 0);
		setComment("");
	};

	return (
		<div className="bg-white rounded-lg p-6 shadow-sm">
			<h2 className="text-xl font-semibold text-gray-800 mb-4">
				Customer Reviews
			</h2>

			<div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
				<div className="text-center">
					<div className="text-4xl font-bold text-gray-800">
						{currentRating.toFixed(1)}
					</div>
					<div className="flex items-center justify-center gap-1 mt-2">
						{[...Array(5)].map((_, i) => (
							<Star
								key={i}
								className={`w-4 h-4 ${
									i < Math.floor(currentRating)
										? "text-yellow-400 fill-yellow-400"
										: "text-gray-300"
								}`}
							/>
						))}
					</div>
					<div className="text-sm text-gray-600 mt-1">
						{totalRatings} {totalRatings === 1 ? "review" : "reviews"}
					</div>
				</div>

				<div className="flex-1">
					<div className="space-y-2">
						{[5, 4, 3, 2, 1].map((star) => {
							const percentage = totalRatings > 0 ? 20 : 0;
							return (
								<div key={star} className="flex items-center gap-2">
									<span className="text-sm text-gray-600 w-4">{star}</span>
									<Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
									<div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
										<div
											className="h-full bg-yellow-400 rounded-full transition-all"
											style={{ width: `${percentage}%` }}
										/>
									</div>
									<span className="text-sm text-gray-600 w-8">
										{percentage}%
									</span>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			<div>
				<h3 className="text-lg font-semibold text-gray-800 mb-3">
					{userRating ? "Your Rating" : "Rate this product"}
				</h3>

				<div className="flex items-center gap-2 mb-4">
					{[1, 2, 3, 4, 5].map((star) => (
						<button
							key={star}
							type="button"
							onClick={() => handleStarClick(star)}
							onMouseEnter={() => setHoveredRating(star)}
							onMouseLeave={() => setHoveredRating(0)}
							className="focus:outline-none transition-transform hover:scale-110"
							disabled={isSubmitting}>
							<Star
								className={`w-8 h-8 transition-colors ${
									star <= (hoveredRating || selectedRating)
										? "text-yellow-400 fill-yellow-400"
										: "text-gray-300"
								}`}
							/>
						</button>
					))}
					{selectedRating > 0 && (
						<span className="ml-2 text-gray-600 font-medium">
							{selectedRating} out of 5
						</span>
					)}
				</div>

				{showForm && (
					<div className="space-y-4 animate-in fade-in duration-200">
						<div>
							<label
								htmlFor="review-comment"
								className="block text-sm font-medium text-gray-700 mb-2">
								Share your experience (optional)
							</label>
							<textarea
								id="review-comment"
								value={comment}
								onChange={(e) => setComment(e.target.value)}
								placeholder="Tell us what you think about this product..."
								className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0C5BA0] focus:border-transparent resize-none"
								rows={4}
								disabled={isSubmitting}
							/>
						</div>

						<div className="flex gap-3">
							<button
								onClick={handleSubmit}
								disabled={selectedRating === 0 || isSubmitting}
								className="px-6 py-2 bg-[#0C5BA0] text-white rounded-md hover:bg-[#094A85] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">
								{isSubmitting ? (
									<span className="flex items-center gap-2">
										<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
										Submitting...
									</span>
								) : (
									"Submit Review"
								)}
							</button>
							<button
								onClick={handleCancel}
								disabled={isSubmitting}
								className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">
								Cancel
							</button>
						</div>
					</div>
				)}

				{userRating && !showForm && (
					<div className="text-sm text-gray-600 mt-2">
						Thanks for your review! You can update it anytime.
					</div>
				)}
			</div>
		</div>
	);
}
