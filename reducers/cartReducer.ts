import { Product } from "@/types";

export interface CartItem extends Product {
	quantity: number;
}

export interface CartState {
	cart: CartItem[];
}

export type CartAction =
	| { type: "ADD_TO_CART"; payload: Product }
	| { type: "REMOVE_FROM_CART"; payload: string }
	| { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
	| { type: "CLEAR_CART" }
	| { type: "SET_CART"; payload: CartItem[] };

export const initialCartState: CartState = {
	cart: [],
};

export function cartReducer(state: CartState, action: CartAction): CartState {
	switch (action.type) {
		case "ADD_TO_CART": {
			const existingItem = state.cart.find(
				(item) => item.id === action.payload.id
			);

			if (existingItem) {
				return {
					...state,
					cart: state.cart.map((item) =>
						item.id === action.payload.id
							? { ...item, quantity: item.quantity + 1 }
							: item
					),
				};
			}

			return {
				...state,
				cart: [...state.cart, { ...action.payload, quantity: 1 }],
			};
		}

		case "REMOVE_FROM_CART": {
			return {
				...state,
				cart: state.cart.filter((item) => item.id !== action.payload),
			};
		}

		case "UPDATE_QUANTITY": {
			if (action.payload.quantity <= 0) {
				return {
					...state,
					cart: state.cart.filter((item) => item.id !== action.payload.id),
				};
			}

			return {
				...state,
				cart: state.cart.map((item) =>
					item.id === action.payload.id
						? { ...item, quantity: action.payload.quantity }
						: item
				),
			};
		}

		case "CLEAR_CART": {
			return {
				...state,
				cart: [],
			};
		}

		case "SET_CART": {
			return {
				...state,
				cart: action.payload,
			};
		}

		default:
			return state;
	}
}
