import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    setDoc,
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

export async function deleteProduct(productId: string) {
    const productDocRef = doc(db, "products", productId);

    await deleteDoc(productDocRef);
}

export async function importFakeStoreProducts(): Promise<number> {
    const response = await fetch("https://fakestoreapi.com/products");

    if (!response.ok) {
        throw new Error("Failed to fetch FakeStore products.");
    }

    const fakeStoreProducts = (await response.json()) as Array<
        Omit<Product, "id"> & {id: number | string }
    >;

    await Promise.all(
        fakeStoreProducts.map((product) => {
            const productDocRef = doc(db, "products", String(product.id));
            const { id, ...productData } = product;

            return setDoc(productDocRef, productData);
        })
    );

    return fakeStoreProducts.length;
}