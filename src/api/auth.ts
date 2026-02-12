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

const API_URL = import.meta.env.VITE_API_URL;

export async function login(email: string, password: string) {
  console.log("API_URL = " + API_URL);

  const res = await fetch(API_URL + "users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Invalid credentials");
  }

  return res.json();
}

export async function checkCookies() {
  try {
    const response = await fetch(API_URL + "users/me", {
      credentials: "include",
    });
    if (!response.ok) {
      return null;
    }
    return response.json();
  } catch (error) {
    return null;
  }
}

export async function logout() {
  try {
    const response = await fetch(API_URL + "users/logout", {
      credentials: "include",
    });
    return response.json();
  } catch (error) {
    throw new Error("Logout failed");
  }
}

export async function register(email: string, password: string) {
  try {
    const response = await fetch(API_URL + "users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  } catch (error) {
    throw new Error("Register failed");
  }
}
