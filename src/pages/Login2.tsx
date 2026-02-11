import { useState } from "react";
import { getUserByEmail, type User } from "../api/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");

    try {
      const result = await getUserByEmail(email);
      setUser(result);
    } catch (err) {
      setError("User not found");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Find user</button>
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
};

export default Login;
