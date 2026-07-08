import { useState } from "react";
import { createProduct, importFakeStoreProducts } from "../services/productServices";

export function ProductForm() {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isImporting, setIsImporting] = useState(false);

    async function handleCreateProduct() {
        await createProduct({
            title,
            price: Number(price),
            description,
            category,
            image,
            rating: {
                rate: 0,
                count: 0,
            },
        });

        setTitle("");
        setPrice("");
        setDescription("");
        setCategory("");
        setImage("");
        setSuccessMessage("Product created successfully!");
    }

    async function handleImportFakeStoreProducts() {
        try {
            setIsImporting(true);
            setSuccessMessage("");

            const importedCount = await importFakeStoreProducts();

            setSuccessMessage(`${importedCount} FakeStore products imported successfully!`);
        } catch (error) {
            console.error("FakeStore import failed:", error);
            setSuccessMessage("Failed to import FakeStore products.");
        } finally {
            setIsImporting(false);
        }
    }

    return (
        <section className="section-card product-form-card">
            <div className="section-header">
                <h2>Create Product</h2>
                <p>Add a new product to your Firestore product collection.</p>
            </div>

            {successMessage && (
                <p className="alert alert-success">{successMessage}</p>
            )}

            <div className="row g-3">
                <div className="col-12">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input
                        id="title"
                        className="form-control"
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="Example: Wireless Keyboard"
                    />
                </div>

                <div className="col-12 col-md-6">
                    <label htmlFor="price" className="form-label">
                        Price
                    </label>
                    <input
                        id="price"
                        className="form-control"
                        type="number"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                        placeholder="Example: 49.99"
                    />
                </div>

                <div className="col-12 col-md-6">
                    <label htmlFor="category" className="form-label">
                        Category
                    </label>
                    <input
                        id="category"
                        className="form-control"
                        type="text"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        placeholder="Example: electronics"
                    />
                </div>

                <div className="col-12">
                    <label htmlFor="image" className="form-label">
                        Image URL
                    </label>
                    <input
                        id="image"
                        className="form-control"
                        type="text"
                        value={image}
                        onChange={(event) => setImage(event.target.value)}
                        placeholder="https://placehold.co/150x150?text=Product"
                    />
                </div>

                <div className="col-12">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        id="description"
                        className="form-control"
                        rows={4}
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Write a short product description."
                    />
                </div>

                <div className="col-12 d-flex flex-wrap gap-2">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleCreateProduct}
                    >
                        Create Product
                    </button>

                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={handleImportFakeStoreProducts}
                        disabled={isImporting}
                    >
                        {isImporting ? "Importing..." : "Import FakeStore Products"}
                    </button>
                </div>
            </div>
        </section>
    );
}