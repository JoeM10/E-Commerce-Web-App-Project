import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { createUserProfile } from "../services/userService";

type RegisterProps = {
	email: string;
	password: string;
};

const Register = ({ email, password }: RegisterProps) => {
	const [error, setError] = useState<string | null>(null);

	const handleRegister = async () => {
		try {
			setError(null);
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;

			await createUserProfile({
				uid: user.uid,
				email: user.email,
				displayName: "",
				address: "",
			});
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
