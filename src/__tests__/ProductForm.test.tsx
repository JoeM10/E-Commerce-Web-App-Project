import { describe, expect, jest, test } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/jest-globals";

import { ProductForm } from "../components/ProductForm";

jest.mock("../services/productServices", () => ({
    createProduct: jest.fn(),
    importFakeStoreProducts: jest.fn(),
}));

describe("ProductForm", () => {
    test("renders the product creation form", () => {
        render(<ProductForm />);

        expect(
            screen.getByRole("heading", { name: /create product/i })
        ).toBeInTheDocument();

        expect(screen.getByLabelText(/title/i)).toBeInTheDocument();

        expect(
            screen.getByRole("button", { name: /create product/i })
        ).toBeInTheDocument()
    });

    test("updates the title field when the user types", () => {
        render(<ProductForm />);

        const titleInput = screen.getByLabelText(/title/i);

        fireEvent.change(titleInput, {
            target: { value: "Wireless Keyboard" },
        });

        expect(titleInput).toHaveValue("Wireless Keyboard");
    });
});