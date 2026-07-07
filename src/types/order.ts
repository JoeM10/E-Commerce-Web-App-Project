import type { CartItem } from "./product";
import type { Timestamp } from "firebase/firestore";

export interface Order {
    id: string;
    userId: string;
    userEmail: string | null;
    items: CartItem[];
    totalPrice: number;
    totalItems: number;
    createdAt: Timestamp | null;
}