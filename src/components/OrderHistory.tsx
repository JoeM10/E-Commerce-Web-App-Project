import { useEffect, useState } from "react";
import { getUserOrders } from "../services/orderServices";
import type { Order } from "../types/order";
import { Link } from "react-router";

interface OrderHistoryProps {
    userId: string;
}

export function OrderHistory({ userId }: OrderHistoryProps) {
    const [orders, setOrders] = useState<Order[]> ([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    useEffect(() => {
        async function loadOrders() {
            const userOrders = await getUserOrders(userId);
            setOrders(userOrders);
        }

        loadOrders();
    }, [userId]);

    return (
        <section>
            <div className="d-flex justify-content-between">
                <h2>Order History</h2>
                <div className="d-flex justify-content-end">
                    <Link to="/">
                        <button className="btn btn-primary ms-2">Home</button>
                    </Link>
                </div>
            </div>
            <p>Your Orders:</p>

            {orders.length === 0 && <p>No orders found.</p>}

            {orders.map((order) => (
                <article key={order.id} className="section-card">
                    <h3>Order ID: {order.id}</h3>

                    <p>
                        Date:{" "}
                        {order.createdAt
                            ? order.createdAt.toDate().toLocaleDateString()
                            : "Date unavailable"}
                    </p>

                    <p>Total Items: {order.totalItems}</p>
                    <p>Total Price: ${order.totalPrice}</p>

                    {selectedOrder?.id !== order.id && (
                        <button
                            type="button"
                            onClick={() => setSelectedOrder(order)}
                        >
                            View Details
                        </button>
                    )}

                    {selectedOrder?.id === order.id && (
                        <section>
                            <h4>Order Details</h4>
                            <p>Total Price: ${order.totalPrice.toFixed(2)}</p>

                            <h5>Products</h5>

                            {order.items.map((item) => (
                                <div key={item.id}>
                                    <p>{item.title}</p>
                                    <p>Quantity: {item.count}</p>
                                    <p>Price Each: ${item.price.toFixed(2)}</p>
                                    <p>Subtotal: ${(item.price * item.count).toFixed(2)}</p>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={() => setSelectedOrder(null)}
                            >
                                Close Details
                            </button>
                        </section>
                    )}
                </article>
            ))}

        </section>
    );
}