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
            <main>
                {checkoutMessage && <p>{checkoutMessage}</p>}
                <p>Your cart is empty.</p>
            </main>
        );
    }

    function handleCheckout() {
        dispatch(clearCart());
        setCheckoutMessage("Checkout successful! Your cart has been cleared.");
    }

    return(
        <main>
            <h1>Items in Cart:</h1>
            <p>Total items in cart: {totalCartItems}</p>

            {cartItems.map((item) => (
                <div key={item.id}>
                    <h2>{item.title}</h2>
                    <img src={item.image} alt={item.title} width="100" />
                    <p>Quantity: {item.count}</p>
                    <div className="plus-minus-buttons">
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
                    <p>${(item.price * item.count).toFixed(2)}</p>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => dispatch(removeFromCart(item.id))}
                    >
                        Remove
                    </button>
                </div>
            ))}

            <h3>Total Cart Price: ${totalCartPrice.toFixed(2)}</h3>
            <button
                type="button"
                className="btn btn-success"
                onClick={handleCheckout}
            >
                Checkout
            </button>
        </main>
    );
}