import { useState } from "react";
import { login, type User } from "../api/auth";
import { useNavigate } from "react-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    setError("");

    try {
      const result = await login(email, password);
      //   if (result?.password == password) {
      setUser(result);
      //   } else {
      //     setError("password wrong");
      //   }
      navigate("/dashboard");
    } catch (err) {
      setError("User not found");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Log in</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {user && (
        <div>
          <h3>User found</h3>
          <p>Name: {user.email}</p>
          <p>Password: {user.password}</p>
        </div>
      )}
    </div>
  );
}
