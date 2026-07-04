import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import type { Product } from "../types/product";

const productsCollectionRef = collection(db, "products");

export async function getAllProducts(): Promise<Product[]> {
    const productsSnapshot = await getDocs(productsCollectionRef);

    return productsSnapshot.docs.map((productDoc) => ({
        id: productDoc.id,
        ...productDoc.data(),
    })) as Product[];
}

export async function getCategories(): Promise<string[]> {
    const products = await getAllProducts();

    const categories = products.map((product) => product.category);

    return [...new Set(categories)];
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
    const products = await getAllProducts();

    return products.filter((product) => product.category === category);
}

export async function createProduct(product: Omit<Product, "id">): Promise<string> {
    const productDocRef = await addDoc(productsCollectionRef, product);

    return productDocRef.id;
}

export async function updateProduct(
    productId: string,
    productUpdates: Partial<Omit<Product, "id">>
) {
    const productDocRef = doc(db, "products", productId);

    await updateDoc(productDocRef, productUpdates);
}