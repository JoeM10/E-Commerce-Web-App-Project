import { useState } from "react";
import { useQuery  } from "@tanstack/react-query";
import { getAllProducts, getCategories, getProductsByCategory } from "../services/fakeStoreApi";
import { useAppDispatch } from "../app/hooks";
import { addToCart } from "../features/cart/cartSlice";

const PLACEHOLDER_IMAGE = "https://placehold.co/150x150?text=No+Image";

function Home() {
    const dispatch = useAppDispatch();

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
        isLoading: categoriesLoading,
        isError: categoriesIsError,
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
        <main className="section-card">
            <div className="section-header">
                <h2>Products</h2>
            </div>

            <div className="category-controls">
                <label htmlFor="category" className="form-label">Choose a category: </label>

                {categoriesLoading && <p className="text-muted">Loading categories...</p>}
                {categoriesIsError && <p className="text-danger">Failed to load categories.</p>}

                <select
                    id="category"
                    value={selectedCategory}
                    onChange={(event) => setSelectedCategory(event.target.value)}
                    disabled={categoriesLoading || categoriesIsError}
                >
                    <option value="all">All Products</option>

                    {categories?.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className="product-grid">
                {products?.map((product) => (
                    <article className="product-card" key={product.id}>
                        <h3>{product.title}</h3>
                        <img
                            src={product.image}
                            alt={product.title}
                            width="150"
                            onError={(event) => {
                                event.currentTarget.onerror = null;
                                event.currentTarget.src = PLACEHOLDER_IMAGE;
                            }}
                        />
                        <p className="product-price">${product.price.toFixed(2)}</p>
                        <p className="product-category">{product.category}</p>
                        <p className="product-description">{product.description}</p>
                        <p className="product-rating">Rating: {product.rating.rate}</p>
                        <button
                            onClick={() => dispatch(addToCart(product))}
                            className="btn btn-primary w-100"
                        >
                            Add to Cart
                        </button>
                    </article>
                ))}
            </div>
        </main>
    );
}

export default Home;