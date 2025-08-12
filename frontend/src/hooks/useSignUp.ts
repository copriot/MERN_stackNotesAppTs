import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { BaseURL } from "../api";

export const useSignUp = () => {
  const [error, setError] = useState<string | boolean | any>(false);
  const [loading, setLoading] = useState<boolean | null>(null);
  const { dispatch } = useAuthContext() as any;

  const signup = async (email: string, password: string) => {
    setLoading(true);
    setError(false);

    try {
      const response = await BaseURL.post("/user/signup", { email, password });

      if (response.data) {
        // Save both email and token to localStorage
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log("Signup successful:", response.data);
        dispatch({ type: "LOGIN", payload: response.data });
      }
    } catch (error: any) {
      setError(error.response?.data?.error || "Signup failed");
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };
  return { signup, loading, error };
};
