import { useState } from "react";
import { useQuery  } from "@tanstack/react-query";
import { getAllProducts, getCategories, getProductsByCategory } from "../services/fakeStoreApi";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addToCart } from "../features/cart/cartSlice";

const PLACEHOLDER_IMAGE = "https://placehold.co/150x150?text=No+Image";

function Home() {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items)
    const totalCartItems: number = cartItems.reduce((total, item) => {
        return total + item.count;
    }, 0);

    const [selectedCategory, setSelectedCategory] = useState("all")

    const {
        data: products,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["products", selectedCategory],
        queryFn: () => {
            if (selectedCategory === "all") {
                return getAllProducts();
            }

            return getProductsByCategory(selectedCategory);
        },
    });

    const {
        data: categories,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    if (isLoading) {
        return <p>Loading products...</p>;
    }

    if (isError) {
        return <p>{error.message}</p>;
    }

    return(
        <main>
            <h1>Fake Store Products</h1>
            <p>Cart Items: {totalCartItems}</p>

            <label htmlFor="category">Choose a category: </label>

            <select
                id="category"
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
            >
                <option value="all">All Products</option>

                {categories?.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>

            {products?.map((product) => (
                <div key={product.id}>
                    <h2>{product.title}</h2>
                    <p>${product.price}</p>
                    <p>{product.category}</p>
                    <p>{product.description}</p>
                    <p>Rating: {product.rating.rate}</p>
                    <img
                        src={product.image}
                        alt={product.title}
                        width="150"
                        onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = PLACEHOLDER_IMAGE;
                        }}
                    />
                    <button onClick={() => dispatch(addToCart(product))}>
                        Add to Cart
                    </button>
                </div>
            ))}
        </main>
    );
}

export default Home;