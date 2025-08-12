import { useState } from "react";
import { BaseURL } from "../api";
import { useAuthContext } from "./useAuthContext";
export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext() as any;
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await BaseURL.post("/user/login", { email, password });

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log("Login successful:", response.data);
        dispatch({ type: "LOGIN", payload: response.data });
      }
    } catch (error: any) {
      setError(error.response?.data?.error || "Login failed");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };
  return { login, loading, error };
};
