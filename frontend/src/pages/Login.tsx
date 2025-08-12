import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, loading, error } = useLogin();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Sign In</h3>
      <label htmlFor="">Email:</label>
      <input type="email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" disabled={loading}>
        Login
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
