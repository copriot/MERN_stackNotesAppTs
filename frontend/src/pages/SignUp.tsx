import React, { useState } from "react";
import { BaseURL } from "../api/index";
import { useSignUp } from "../hooks/useSignUp";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { signup, loading, error } = useSignUp();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
      />

      <button type="submit" disabled={loading || !email || !password}>
        {loading ? "Signing up..." : "Register"}
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SignUp;
