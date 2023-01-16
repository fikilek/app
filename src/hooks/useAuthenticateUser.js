import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebaseConfig/fbConfig";

export const useAuthenticateUser = () => {
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const [success, setSuccess] = useState(false);
	const [user, setUser] = useState(null)

	const authenticateUser = async userCredentials => {
		console.log(`authenticateUser`, userCredentials)
		const { email, password } = userCredentials;
		try {
			setIsPending(true);
			setError(null);
			setSuccess(false);
			const result = await signInWithEmailAndPassword(auth, email, password);
			if (!result) {
				throw new Error("User signin failed");
			}
			console.log(`result.user`, result.user);
			setUser(result.user)
			setIsPending(false);
			setError(null);
			setSuccess(true);
		} catch (err) {
			setIsPending(false);
			setError(err.message);
			setSuccess(false);
			// console.log(`signin err`, err.message)
		}
	
	};

	return { authenticateUser, error, isPending, success, user };
};
