import { ShoppingCart } from "../components/ShoppingCart";
import { Link } from "react-router";

export function CartPage() {
    return (
        <main>
            <ShoppingCart />

            <div>
                <Link to="/">
                    <button className="btn btn-primary ms-2">Home</button>
                </Link>
            </div>
        </main>
    );
}