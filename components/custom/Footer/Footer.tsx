import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-[#002B60] text-white mt-auto">
			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
					<div>
						<h3 className="text-lg font-semibold mb-4">Filters</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/?category=All"
									className="text-white hover:text-blue-200 transition-colors text-sm">
									All
								</Link>
							</li>
							<li>
								<Link
									href="/?category=Electronics"
									className="text-white hover:text-blue-200 transition-colors text-sm">
									Electronic
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-lg font-semibold mb-4">About Us</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/about"
									className="text-white hover:text-blue-200 transition-colors text-sm">
									About Us
								</Link>
							</li>
							<li>
								<Link
									href="/contact"
									className="text-white hover:text-blue-200 transition-colors text-sm">
									Contact
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-lg font-semibold mb-4">Follow Us</h3>
						<div className="flex gap-3">
							<a
								href="https://facebook.com"
								target="_blank"
								rel="noopener noreferrer"
								className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors">
								<Facebook className="w-5 h-5" />
							</a>
							<a
								href="https://twitter.com"
								target="_blank"
								rel="noopener noreferrer"
								className="w-10 h-10 bg-blue-400 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors">
								<Twitter className="w-5 h-5" />
							</a>
							<a
								href="https://instagram.com"
								target="_blank"
								rel="noopener noreferrer"
								className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-full flex items-center justify-center transition-colors">
								<Instagram className="w-5 h-5" />
							</a>
						</div>
					</div>
				</div>

				<div className="border-t border-white/20 pt-6">
					<p className="text-sm text-white">© 2024 American</p>
				</div>
			</div>
		</footer>
	);
}
