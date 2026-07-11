import { describe, expect, jest, test } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/jest-globals";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import type { User } from "firebase/auth";
import type { ReactNode } from "react";

jest.mock("react-router", () => ({
    Link: ({
        to,
        children,
        ...props
    }: {
        to: string;
        children: React.ReactNode;
    }) => (
        <a href={to} {...props}>
            {children}
        </a>
    ),
}));

import { NavBar } from "../components/NavBar";
import { cartReducer } from "../features/cart/cartSlice";

function renderNavBar(
    currentUser: User | null = null,
    onLogout?: () => Promise<void>
) {
    const store = configureStore({
        reducer: {
            cart: cartReducer,
        },
    });

    render(
        <Provider store={store}>
            <NavBar
                currentUser={currentUser}
                onLogout={onLogout}
            />
        </Provider>
    );
}

describe("NavBar", () => {
    test("renders the navigation links", () => {
        renderNavBar();

        expect(
            screen.getByRole("link", { name: /fake store/i })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("link", { name: /home/i })
        ).toBeInTheDocument();

        expect(
            screen.getByRole("link", { name: /shopping cart/i })
        ).toBeInTheDocument();
    });

    test("calls onLogout when the use clicks Logout", () => {
        const currentUser = {
            email: "student@example.com",
        } as User;

        const mockLogout = jest.fn(async () => {});

        renderNavBar(currentUser, mockLogout);

        expect(
            screen.getByText(/signed in as: student@example.com/i)
        ).toBeInTheDocument();

        fireEvent.click(
            screen.getByRole("button", { name: /logout/i })
        );

        expect(mockLogout).toHaveBeenCalledTimes(1);
    });
});