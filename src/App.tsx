import Home from "./pages/Home";
import { ShoppingCart } from "./components/ShoppingCart";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth } from "./firebaseConfig";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="app-page">
      <header className="app-header">
        <h1>Fake Store</h1>
        <p>Browse products, filter by category, and manage your cart.</p>
        <div className="mt-3">
          {currentUser ? (
            <div className="auth-info d-flex flex-wrap align-items-center gap-2">
              <span>Signed in as: {currentUser.email}</span>
              <button
                className="btn btn-outline-light btn-sm"
                onClick={async () => {
                  try {
                    await signOut(auth);
                  } catch (err) {
                    console.error("Sign out error:", err);
                  }
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <form
              className="auth-forms row g-2 align-items-start"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="col-12 col-md-4">
                <input
                  className="form-control"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-4">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="col-12 col-md-auto">
                <Login email={email} password={password} />
              </div>
              <div className="col-12 col-md-auto">
                <Register email={email} password={password} />
              </div>
            </form>
          )}
        </div>
      </header>

      <div className="container pb-5">
        <Home />
        <ShoppingCart />
      </div>
    </div>
  );
}

export default App;
