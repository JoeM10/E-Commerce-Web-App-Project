import { useQuery  } from "@tanstack/react-query";
import { getAllProducts } from "../services/fakeStoreApi";

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/150";

function Home() {
    const {
        data: products,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["products"],
        queryFn: getAllProducts,
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
                            event.currentTarget.src = PLACEHOLDER_IMAGE;
                        }}
                    />
                    <button>Add to Cart</button>
                </div>
            ))}
        </main>
    );
}

export default Home;