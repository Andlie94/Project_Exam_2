"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { InputEmail, InputPassword } from "../../components/ui/input";
import { loginUser } from "../../lib/api/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password");
      return;
    }

try {
  const userData = await loginUser(email, password);
      console.log("Login success:", userData);

  localStorage.setItem("token", userData.accessToken);
  localStorage.setItem("User", JSON.stringify(userData));

  if (userData.venueManager) {
    router.push("/admin");
  } else {
    router.push("/user");
  }

} catch (err) {
  if (err instanceof Error) {
    console.error("Login error:", err.message);
    setError(err.message);
      } else {
        console.error("Unknown login error:", err);
        setError("Login failed due to an unknown error");
      }
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/img/Earth_blue.png')" }}
    >
      <form
        onSubmit={handleLogin}
        className="space-y-6 p-10 sm:p-12 w-full max-w-2xl rounded-xl shadow-lg border border-white border-2"
        style={{ backgroundColor: "rgba(3, 107, 141, 0.5)" }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Login to Your Account
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="w-full max-w-sm mx-auto space-y-4">
          <InputEmail value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputPassword value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

<button
  className="secundary-button mt-4 py-3 px-16 text-lg mx-auto block"
  type="submit"
>
  Login
</button>

        <p className="text-center text-[var(--color-text)]">
          Don’t have an account?{" "}
          <a href="/signup" className="font-semibold hover:underline text-[var(--color-text)]">
            Register here
          </a>
        </p>
      </form>
    </div>
  );
}