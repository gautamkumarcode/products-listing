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
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(cartReducer, initialCartState);
	const [mounted, setMounted] = useState(false);

	// Load cart from localStorage on mount
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
	}, []);

	// Save cart to localStorage whenever it changes
	useEffect(() => {
		if (mounted) {
			localStorage.setItem("cart", JSON.stringify(state.cart));
		}
	}, [state.cart, mounted]);

	// Cart actions
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

	// Memoized calculations
	const cartCount = useMemo(
		() => state.cart.reduce((total, item) => total + item.quantity, 0),
		[state.cart]
	);

	const cartTotal = useMemo(
		() =>
			state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
		[state.cart]
	);

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
