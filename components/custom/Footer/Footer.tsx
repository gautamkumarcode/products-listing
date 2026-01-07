import {
	Facebook,
	Instagram,
	Linkedin,
	Mail,
	Phone,
	Twitter,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="bg-[#0C5BA0] text-white mt-auto">
			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
					<div>
						<h3 className="text-lg font-semibold mb-4">About Us</h3>
						<p className="text-blue-100 text-sm leading-relaxed mb-4">
							Your trusted online shopping destination for quality products at
							competitive prices. We offer a wide range of electronics,
							clothing, and more.
						</p>
						<div className="flex items-center gap-2 text-blue-100 text-sm mb-2">
							<Mail className="w-4 h-4" />
							<span>support@shop.com</span>
						</div>
						<div className="flex items-center gap-2 text-blue-100 text-sm">
							<Phone className="w-4 h-4" />
							<span>+91 1800-123-4567</span>
						</div>
					</div>

					<div>
						<h3 className="text-lg font-semibold mb-4">Quick Links</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/"
									className="text-blue-100 hover:text-white transition-colors text-sm">
									Home
								</Link>
							</li>
							<li>
								<Link
									href="/"
									className="text-blue-100 hover:text-white transition-colors text-sm">
									Products
								</Link>
							</li>
							<li>
								<Link
									href="/cart"
									className="text-blue-100 hover:text-white transition-colors text-sm">
									Cart
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-blue-100 hover:text-white transition-colors text-sm">
									About Us
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-blue-100 hover:text-white transition-colors text-sm">
									Contact
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-lg font-semibold mb-4">Customer Service</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="#"
									className="text-blue-100 hover:text-white transition-colors text-sm">
									Help Center
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-blue-100 hover:text-white transition-colors text-sm">
									Track Order
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-blue-100 hover:text-white transition-colors text-sm">
									Returns & Refunds
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-blue-100 hover:text-white transition-colors text-sm">
									Shipping Info
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-blue-100 hover:text-white transition-colors text-sm">
									FAQs
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-lg font-semibold mb-4">Follow Us</h3>
						<p className="text-blue-100 text-sm mb-4">
							Stay connected with us on social media for updates, offers, and
							more.
						</p>
						<div className="flex gap-3">
							<a
								href="https://facebook.com"
								target="_blank"
								rel="noopener noreferrer"
								className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
								aria-label="Facebook">
								<Facebook className="w-5 h-5" />
							</a>
							<a
								href="https://twitter.com"
								target="_blank"
								rel="noopener noreferrer"
								className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
								aria-label="Twitter">
								<Twitter className="w-5 h-5" />
							</a>
							<a
								href="https://instagram.com"
								target="_blank"
								rel="noopener noreferrer"
								className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
								aria-label="Instagram">
								<Instagram className="w-5 h-5" />
							</a>
							<a
								href="https://linkedin.com"
								target="_blank"
								rel="noopener noreferrer"
								className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
								aria-label="LinkedIn">
								<Linkedin className="w-5 h-5" />
							</a>
						</div>
					</div>
				</div>

				<div className="border-t border-white/20 pt-6">
					<div className="flex flex-col md:flex-row justify-between items-center gap-4">
						<p className="text-blue-100 text-sm text-center md:text-left">
							© {currentYear} Shop Online. All rights reserved.
						</p>
						<div className="flex gap-6">
							<Link
								href="#"
								className="text-blue-100 hover:text-white transition-colors text-sm">
								Privacy Policy
							</Link>
							<Link
								href="#"
								className="text-blue-100 hover:text-white transition-colors text-sm">
								Terms of Service
							</Link>
							<Link
								href="#"
								className="text-blue-100 hover:text-white transition-colors text-sm">
								Cookie Policy
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
