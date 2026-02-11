import { useState } from "react";
import { login, type User } from "../api/auth";
import { useNavigate } from "react-router";
import { useAuth } from "../components/AuthProvider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    setError("");

    try {
      // const result = await login(email, password);
      //   if (result?.password == password) {
      //   } else {
      //     setError("password wrong");
      //   }
      await auth.loginUser(email, password);
      // console.log({ result });

      // const res = await fetch("/users/me", { credentials: "include" });
      // setUser(await res.json());
      // setUser(result);
      navigate("/sensors");
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
