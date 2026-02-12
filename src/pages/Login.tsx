import { useState } from "react";
import { login, register, type User } from "../api/auth";
import { useNavigate } from "react-router";
import { useAuth } from "../components/AuthProvider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();

    setError("");

    try {
      await auth.loginUser(email, password);
      navigate("/sensors");
    } catch (err) {
      console.error(err);

      setError("User not found");
    }
  };

  const handleRegister = async (e: React.MouseEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await register(email, password);
      setMessage("user registered");
    } catch (err) {
      console.error(err);
      setError("Register error");
    }
  };

  return (
    <div>
      <form>
        <label htmlFor="email">Email</label>
        <br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div>
          <button onClick={(e) => handleLogin(e)}>Log in</button>
          <button onClick={(e) => handleRegister(e)}>Register</button>
        </div>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
}
