export type User = {
  // _id: string;
  email: string;
  password: string;
};

// export async function getUserByEmail(email: string): Promise<User | null> {
//   const res = await fetch(
//     `http://localhost:3000/users/by-email?email=${encodeURIComponent(email)}`,
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch user");
//   }

//   return res.json();
// }

export async function login(email: string, password: string) {
  const res = await fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error("Invalid credentials");
  }

  return res.json();
}
