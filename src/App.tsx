import Home from "./pages/Home";
import { ShoppingCart } from "./components/ShoppingCart";

function App() {
  return (
    <div className="app-page">
      <header className="app-header">
        <h1>Fake Store</h1>
        <p>Browse products, filter by category, and manage your cart.</p>
      </header>

      <div className="container pb-5">
        <Home />
        <ShoppingCart />
      </div>
    </div>
  );
}

export default App;