import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, Product } from "../../types/product";

type CartState = {
    items: CartItem[];
};

const savedCart: string | null = sessionStorage.getItem("cart");

const initialState: CartState = {
    items: savedCart ? JSON.parse(savedCart) : [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product>) => {
            const product = action.payload;

            const existingItem = state.items.find((item) => item.id === product.id);

            if (existingItem) {
                existingItem.count += 1;
            } else {
                state.items.push({
                    ...product,
                    count: 1,
                });
            }
        },

        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },

        clearCart: (state) => {
            state.items = [];
        },

        decreaseQuantity: (state, action: PayloadAction<number>) => {

            const existingItem = state.items.find((item) => item.id === action.payload);

            if (existingItem && existingItem.count > 1) {
                existingItem.count -= 1;
            } else {
                state.items = state.items.filter((item) => item.id !== action.payload);
            }
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    clearCart,
    decreaseQuantity,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;