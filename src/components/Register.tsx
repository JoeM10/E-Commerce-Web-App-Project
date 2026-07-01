import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

type RegisterProps = {
  email: string;
  password: string;
};

const Register = ({ email, password }: RegisterProps) => {
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    try {
      setError(null);
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration successful!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <button
        className="btn btn-success w-100"
        type="button"
        onClick={handleRegister}
      >
        Register
      </button>
      {error && <p className="text-danger small mb-0 mt-1">{error}</p>}
    </>
  );
};

export default Register;
