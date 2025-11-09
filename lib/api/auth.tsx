export const API_BASE = "https://v2.api.noroff.dev";
export const X_NOROFF_API_KEY = "b47c1d2a-a0ba-4ff7-ac9b-339bb69dabe5";

export interface LoginData {
  name: string;
  email: string;
  accessToken: string;
  venueManager: boolean;
  avatar?: {
    url: string;
    alt?: string;
  };
  banner?: {
    url: string;
    alt?: string;
  };
  bio?: string;
}

export interface LoginResponse {
  data: LoginData;
  meta?: Record<string, unknown>;
}

export async function loginUser(email: string, password: string): Promise<LoginData> {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": X_NOROFF_API_KEY,
    },
    body: JSON.stringify({ email, password }),
  });

  const result: LoginResponse = await response.json();

  if (!response.ok) {
    throw new Error(result?.data ? "Unexpected login error" : "Invalid credentials");
  }

  return result.data;
}

export async function fetchSignUp(
  email: string,
  password: string,
  name: string,
  venueManager: boolean
): Promise<LoginData> {
  const response = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": X_NOROFF_API_KEY,
    },
    body: JSON.stringify({ email, password, name, venueManager }),
  });

  const result = await response.json();
  console.log("Signup API result:", result);

  if (!response.ok) {
    const errorMessage =
      result.errors?.[0]?.message ||
      result.message ||
      "Signup failed — check console for details";
    throw new Error(errorMessage);
  }

  return result.data;
}