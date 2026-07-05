import type { CartItem } from "./product";

export interface Order {
    id: string;
    userId: string;
    userEmail: string | null;
    items: CartItem[];
    totalPrice: number;
    totalItems: number;
    createdAt: unknown;
}