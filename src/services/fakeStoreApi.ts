import type { Product } from "../types/product";

const BASE_URL = "https://fakestoreapi.com";

export async function getAllProducts(): Promise<Product[]> {
    const response = await fetch(`${BASE_URL}/products`);

    if (!response.ok) {
        throw new Error("Failed to fetch products.");
    }

    return response.json();
}

export async function getCategories(): Promise<string[]> {
    const response = await fetch(`${BASE_URL}/products/categories`);

    if (!response.ok) {
        throw new Error("Failed to fetch categories.");
    }

    return response.json();
}

export async function getProductsByCategory(
    category: string
): Promise<Product[]> {
    const response = await fetch(`${BASE_URL}/products/category/${category}`);

    if (!response.ok) {
        throw new Error("Failed to fetch products by category.");
    }

    return response.json();
}