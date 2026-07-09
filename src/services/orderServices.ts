import {
    addDoc,
    collection,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import type { CartItem } from "../types/product";
import type { Order } from "../types/order";

const ordersCollectionRef = collection(db, "orders");

export async function createOrder(
    userId: string,
    userEmail: string | null,
    items: CartItem[],
    totalPrice: number,
    totalItems: number
) {
    const orderDocRef = await addDoc(ordersCollectionRef, {
        userId,
        userEmail,
        items,
        totalPrice,
        totalItems,
        createdAt: serverTimestamp(),
    });

    return orderDocRef.id;
}

export async function getUserOrders(userId: string): Promise<Order[]> {
    const userOrdersQuery = query(
        ordersCollectionRef,
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
    );

    const orderSnapshot = await getDocs(userOrdersQuery);

    return orderSnapshot.docs.map((orderDoc) => ({
        id: orderDoc.id,
        ...orderDoc.data(),
    })) as Order[];
}