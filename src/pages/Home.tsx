import {
    deleteProduct,
    getAllProducts,
    getCategories,
    getProductsByCategory,
    updateProduct,
} from "../services/productServices";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "../app/hooks";
import { addToCart } from "../features/cart/cartSlice";
import { Link } from "react-router";
import type { Product } from "../types/product";

const PLACEHOLDER_IMAGE = "https://placehold.co/150x150?text=No+Image";

function Home() {
    const dispatch = useAppDispatch();

    const queryClient = useQueryClient();

    const [selectedCategory, setSelectedCategory] = useState("all")
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isSavingProduct, setIsSavingProduct] = useState(false);

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

    async function handleUpdateProduct() {
        if (!selectedProduct || isSavingProduct) {
            return;
        }
        try {
            setIsSavingProduct(true);


            await updateProduct(selectedProduct.id, {
                title: selectedProduct.title,
                price: selectedProduct.price,
                description: selectedProduct.description,
                category: selectedProduct.category,
                image: selectedProduct.image,
            });
    
            await queryClient.invalidateQueries({ queryKey: ["products"] });
            await queryClient.invalidateQueries({queryKey: ["categories"] });
    
            setSelectedProduct(null);
        } finally {
            setIsSavingProduct(false);
        }
    }

    async function handleDeleteProduct(productId: string) {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product? This cannot be undone."
        );

        if (!confirmDelete) {
            return;
        }

        await deleteProduct(productId);

        await queryClient.invalidateQueries({ queryKey: ["products"] });
        await queryClient.invalidateQueries({ queryKey: ["categories"] });

        setSelectedProduct(null);
    }

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
            
            {selectedProduct && (
                <section>
                    <h2>Editing Product</h2>

                    <div>
                        <label htmlFor="editTitle">Title</label>
                        <input
                            id="editTitle"
                            type="text"
                            value={selectedProduct.title}
                            onChange={(event) =>
                                setSelectedProduct({
                                    ...selectedProduct,
                                    title: event.target.value,
                                })
                            }
                        />
                    </div>

                    <div>
                        <label htmlFor="editPrice">Price</label>
                        <input
                            id="editPrice"
                            type="number"
                            value={selectedProduct.price}
                            onChange={(event) =>
                                setSelectedProduct({
                                    ...selectedProduct,
                                    price: Number(event.target.value),
                                })
                            }
                        />
                    </div>

                    <div>
                        <label htmlFor="editDescription">Description</label>
                        <textarea
                            name="Edit Description"
                            id="editDescription"
                            value={selectedProduct.description}
                            onChange={(event) =>
                                setSelectedProduct({
                                    ...selectedProduct,
                                    description: event.target.value,
                                })
                            }
                        />
                    </div>

                    <div>
                        <label htmlFor="editCategory">Category</label>
                        <input
                            id="editCategory"
                            type="text"
                            value={selectedProduct.category}
                            onChange={(event) =>
                                setSelectedProduct({
                                    ...selectedProduct,
                                    category: event.target.value,
                                })
                            }
                        />
                    </div>

                    <div>
                        <label htmlFor="editImage">Image URL</label>
                        <input
                            id="editImage"
                            type="text"
                            value={selectedProduct.image}
                            onChange={(event) =>
                                setSelectedProduct({
                                    ...selectedProduct,
                                    image: event.target.value,
                                })
                            }
                        />
                    </div>

                    <button
                        onClick={handleUpdateProduct}
                        disabled={isSavingProduct}
                        className="btn btn-success mt-2"
                    >
                        {isSavingProduct ? "Saving..." : "Save Changes"}
                    </button>

                    <button
                        onClick={() => setSelectedProduct(null)}
                        className="btn btn-outline-secondary mt-2 ms-2"
                    >
                        Cancel Editing
                    </button>

                    <button
                        onClick={() => handleDeleteProduct(selectedProduct.id)}
                        className="btn btn-danger mt-2 ms-2"
                    >
                        Delete Product
                    </button>
                </section>
            )}

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
                        <button
                            onClick={() => setSelectedProduct(product)}
                            className="btn btn-secondary w-100 mt-2"
                        >
                            Edit Product
                        </button>
                    </article>
                ))}
            </div>
            
            <Link to="/create-product">
                <button className="btn bg-warning">Create Product</button>
            </Link>

            <Link to="/order-history">
                <button className="btn btn-info ms-2">Order History</button>
            </Link>
        </main>
    );
}

export default Home;