import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

type LoginProps = {
  email: string;
  password: string;
};

const Login = ({ email, password }: LoginProps) => {
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <button className="btn btn-primary w-100" type="button" onClick={handleLogin}>
        Login
      </button>
      {error && <p className="text-danger small mb-0 mt-1">{error}</p>}
    </>
  );
};

export default Login;
