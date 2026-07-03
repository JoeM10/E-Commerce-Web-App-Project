import { useState } from "react";
import { createProduct } from "../services/productServices";

export function ProductForm() {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

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


    return (
        <section>
            <h2>Create Product</h2>

            {successMessage && <p>{successMessage}</p>}

            <div>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
            </div>

            <div>
                <label htmlFor="price">Price</label>
                <input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                />
            </div>

            <div>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
            </div>

            <div>
                <label htmlFor="category">Category</label>
                <input
                    id="category"
                    type="text"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                />
            </div>

            <div>
                <label htmlFor="image">Image URL</label>
                <input
                    id="image"
                    type="text"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                />
            </div>

            <button onClick={handleCreateProduct}>Create Product</button>
        </section>
    );
}