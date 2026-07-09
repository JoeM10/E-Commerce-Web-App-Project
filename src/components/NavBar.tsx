import type { User } from "firebase/auth";
import { Link } from "react-router";
import { useAppSelector } from "../app/hooks";

interface NavBarProps {
    currentUser?: User | null;
    onLogout?: () => Promise<void>;
}

export function NavBar({ currentUser, onLogout }: NavBarProps) {
    const totalCartItems = useAppSelector((state) =>
        state.cart.items.reduce((total, item) => total + item.count, 0)
    )

    return (
        <nav className="navbar navbar-expand navbar-light bg-light px-3 mb-4">
        <Link to="/" className="navbar-brand">
            Fake Store
        </Link>

        <div className="navbar-nav">
            <Link to="/" className="nav-link">
            Home
            </Link>

            <Link to="/create-product" className="nav-link">
            Create Product
            </Link>


            <Link to="/order-history" className="nav-link">
            Order History
            </Link>

            <Link to="/profile" className="nav-link">
                Profile
            </Link>

            <Link
                to="/cart"
                className="nav-link position-relative"
                aria-label="Shopping Cart"
            >
                <span aria-hidden="true">🛒</span>

                {totalCartItems > 0 && (
                    <span className="position-absolute top-50 start-100 translate-middle badge rounded-pill bg-danger">
                        {totalCartItems}
                    </span>
                )}
            </Link>
        </div>

        {currentUser && (
            <div className="navbar-user ms-auto d-flex align-items-center gap-2">
                <span className="navbar-text navbar-user-email">
                    Signed in as: {currentUser.email}
                </span>

                <button
                    type="button"
                    className="btn btn-outline-danger btn-sm navbar-logout-button"
                    onClick={onLogout}
                >
                    Logout
                </button>
            </div>
        )}
        </nav>
    );
}