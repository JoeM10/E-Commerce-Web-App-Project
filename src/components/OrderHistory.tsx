import { useEffect, useState } from "react";
import { getUserOrders } from "../services/orderServices";
import type { Order } from "../types/order";

interface OrderHistoryProps {
    userId: string;
}

export function OrderHistory({ userId }: OrderHistoryProps) {
    const [orders, setOrders] = useState<Order[]> ([]);

    useEffect(() => {
        async function loadOrders() {
            const userOrders = await getUserOrders(userId);
            setOrders(userOrders);
        }

        loadOrders();
    }, [userId]);

    return (
        <section>
            <h2>Order History</h2>
            <p>Your Orders:</p>

            {orders.length === 0 && <p>No orders found.</p>}
        </section>
    );
}