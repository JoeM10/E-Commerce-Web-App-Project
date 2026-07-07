import { OrderHistory } from "../components/OrderHistory";
import { Link } from "react-router";

interface OrderHistoryPageProps {
    userId: string;
}

export function OrderHistoryPage({ userId }: OrderHistoryPageProps) {
    return (
        <main>
            <OrderHistory userId={userId} />
        </main>
    );
}