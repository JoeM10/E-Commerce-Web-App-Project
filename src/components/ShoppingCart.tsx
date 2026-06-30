import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
    addToCart,
    removeFromCart,
    clearCart,
    decreaseQuantity,
} from "../features/cart/cartSlice";
import { useState, useEffect } from "react";

export function ShoppingCart() {

    const [checkoutMessage, setCheckoutMessage] = useState("");

    const cartItems = useAppSelector((state) => state.cart.items);
    const dispatch = useAppDispatch();
    const totalCartItems: number = cartItems.reduce((total, item) => {
        return total + item.count;
    }, 0);
    const totalCartPrice: number = cartItems.reduce((total, item) => {
        return total + item.price * item.count;
    }, 0);

    useEffect(() => {
        if (cartItems.length > 0){
            setCheckoutMessage("");
            sessionStorage.setItem("cart", JSON.stringify(cartItems));
        } else {
            sessionStorage.removeItem("cart");
        }
    }, [cartItems]);

    if (cartItems.length === 0) {
        return(
            <aside className="section-card cart-section">
                {checkoutMessage && <p className="alert alert-success">{checkoutMessage}</p>}
                <p className="empty-cart">Your cart is empty.</p>
            </aside>
        );
    }

    function handleCheckout() {
        dispatch(clearCart());
        setCheckoutMessage("Checkout successful! Your cart has been cleared.");
    }

    return(
        <aside className="section-card cart-section">
            <h1>Items in Cart:</h1>

            {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                    <img className="cart-item-image" src={item.image} alt={item.title} />

                    <div className="cart-item-details">
                        <h2>{item.title}</h2>
                        <p>Quantity: {item.count}</p>
                        <p className="cart-item-subtotal">
                            Subtotal: ${(item.price * item.count).toFixed(2)}
                        </p>
                    </div>

                    <div className="cart-item-actions">
                        <div className="quantity-controls">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => dispatch(addToCart(item))}
                                >
                                +
                            </button>

                            <button
                                type="button"
                                className="btn btn-warning"
                                onClick={() => dispatch(decreaseQuantity(item.id))}
                                >
                                -
                            </button>
                        </div>

                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => dispatch(removeFromCart(item.id))}
                            >
                            Remove
                        </button>
                    </div>
                </div>
            ))}
            <div className="cart-footer">
                <div>
                    <h3>Total Cart Price: ${totalCartPrice.toFixed(2)}</h3>
                    <p>Total items in cart: {totalCartItems}</p>
                </div>

                <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleCheckout}
                    >
                    Checkout
                </button>
            </div>
        </aside>
    );
}