import { describe, expect, jest, test } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/jest-globals";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import type { ReactNode } from "react";
import {
    getAllProducts,
    getCategories,
} from "../services/productServices";

jest.mock("react-router", () => ({
    Link: ({
        to,
        children,
        ...props
    }: {
        to: string;
        children: ReactNode;
    }) => (
        <a href={to} {...props}>
            {children}
        </a>
    ),
}));

jest.mock("../services/productServices", () => ({
    getAllProducts: jest.fn(),
    getCategories: jest.fn(),
    getProductsByCategory: jest.fn(),
    updateProduct: jest.fn(),
    deleteProduct: jest.fn(),
}));

jest.mock("../services/orderServices", () => ({
    createOrder: jest.fn(),
}));

jest.mock("../firebaseConfig", () => ({
    auth: {
        currentUser: null,
    },
    db: {},
}));

import Home from "../pages/Home";
import { ShoppingCart } from "../components/ShoppingCart";
import { cartReducer } from "../features/cart/cartSlice";
import type { Product } from "../types/product";

describe("Cart integration", () => {
    test("updates the cart when a product is added", async () => {
        mockedGetAllProducts.mockResolvedValue([testProduct]);
        mockedGetCategories.mockResolvedValue(["electronics"]);

        const store = configureStore({
            reducer: {
                cart: cartReducer,
            },
            preloadedState: {
                cart: {
                    items: [],
                },
            },
        });

        const queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                },
            },
        });

        render(
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <Home />
                    <ShoppingCart />
                </QueryClientProvider>
            </Provider>
        );

        const addToCartButton = await screen.findByRole("button", {
            name: /add to cart/i,
        });

        fireEvent.click(addToCartButton);

        expect(
            screen.getByRole("heading", { name: /items in cart/i })
        ).toBeInTheDocument();

        expect(screen.getByText(/quantity: 1/i)).toBeInTheDocument();
    });
});

const testProduct: Product = {
    id: "product-1",
    title: "Wireless Keyboard",
    price: 49.99,
    description: "A compact wireless keyboard.",
    category: "electronics",
    image: "keyboard.jpg",
    rating: {
        rate: 4.5,
        count: 100,
    },
};

const mockedGetAllProducts = jest.mocked(getAllProducts);
const mockedGetCategories = jest.mocked(getCategories);