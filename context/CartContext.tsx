"use client";

import {
    CartItem,
    cartReducer,
    initialCartState,
} from "@/reducers/cartReducer";
import { Product } from "@/types";
import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useState,
} from "react";

interface CartContextType {
	cart: CartItem[];
	addToCart: (product: Product) => void;
	removeFromCart: (productId: string) => void;
	updateQuantity: (productId: string, quantity: number) => void;
	clearCart: () => void;
	cartCount: number;
	cartTotal: number;
	likes: Product[];
	addLike: (product: Product) => void;
	removeLike: (productId: string) => void;
	isLiked: (productId: string) => boolean;
	toggleLike: (product: Product) => void;
	likesCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(cartReducer, initialCartState);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		const savedCart = localStorage.getItem("cart");
		if (savedCart) {
			try {
				const parsed = JSON.parse(savedCart);
				if (Array.isArray(parsed)) {
					dispatch({ type: "SET_CART", payload: parsed });
				}
			} catch (error) {
				console.error("Failed to parse cart from localStorage:", error);
			}
		}

		const savedLikes = localStorage.getItem("likes");
		if (savedLikes) {
			try {
				const parsed = JSON.parse(savedLikes);
				if (Array.isArray(parsed)) {
					dispatch({ type: "SET_LIKES", payload: parsed });
				}
			} catch (error) {
				console.error("Failed to parse likes from localStorage:", error);
			}
		}
	}, []);

	useEffect(() => {
		if (mounted) {
			localStorage.setItem("cart", JSON.stringify(state.cart));
		}
	}, [state.cart, mounted]);

	useEffect(() => {
		if (mounted) {
			localStorage.setItem("likes", JSON.stringify(state.likes));
		}
	}, [state.likes, mounted]);

	const addToCart = (product: Product) => {
		dispatch({ type: "ADD_TO_CART", payload: product });
	};

	const removeFromCart = (productId: string) => {
		dispatch({ type: "REMOVE_FROM_CART", payload: productId });
	};

	const updateQuantity = (productId: string, quantity: number) => {
		dispatch({ type: "UPDATE_QUANTITY", payload: { id: productId, quantity } });
	};

	const clearCart = () => {
		dispatch({ type: "CLEAR_CART" });
	};

	const cartCount = useMemo(
		() => state.cart.reduce((total, item) => total + item.quantity, 0),
		[state.cart]
	);

	const cartTotal = useMemo(
		() =>
			state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
		[state.cart]
	);

	const addLike = (product: Product) => {
		dispatch({ type: "ADD_LIKE", payload: product });
	};

	const removeLike = (productId: string) => {
		dispatch({ type: "REMOVE_LIKE", payload: productId });
	};

	const isLiked = (productId: string) => {
		return state.likes.some((item) => item.id === productId);
	};

	const toggleLike = (product: Product) => {
		if (isLiked(product.id)) {
			removeLike(product.id);
		} else {
			addLike(product);
		}
	};

	const likesCount = useMemo(() => state.likes.length, [state.likes]);

	return (
		<CartContext.Provider
			value={{
				cart: state.cart,
				addToCart,
				removeFromCart,
				updateQuantity,
				clearCart,
				cartCount,
				cartTotal,
				likes: state.likes,
				addLike,
				removeLike,
				isLiked,
				toggleLike,
				likesCount,
			}}>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
}
