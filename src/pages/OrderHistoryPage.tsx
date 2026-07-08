import { OrderHistory } from "../components/OrderHistory";

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