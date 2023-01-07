import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebaseConfig/fbConfig";
import useAuthContext from "./useAuthContext";

export const useSignin = () => {
	const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext();

	const signin = async (userCredentials) => {
		const { email, password } = userCredentials;
		try {
			setIsPending(true);
			setError(null);
			const result = await signInWithEmailAndPassword(auth, email, password);
			if (!result) {
				throw new Error("User signin failed");
			}
      // console.log(`result`, result.user);
      const { user } = result

      dispatch({ type: "SIGNIN", payload: user });
			setIsPending(false);
			setError(null);
    } catch (err) {
      setIsPending(false);
      setError(err.message)
      // console.log(`signin err`, err.message)
    }
	};

	return { signin, error, isPending };
};
