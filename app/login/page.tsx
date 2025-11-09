"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { InputEmail, InputPassword } from "../../components/ui/input";
import { loginUser } from "../../lib/api/auth";
import { LoadingGlobal } from "../../components/ui/loading";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      const userData = await loginUser(email, password);
      console.log("Login success:", userData);

      localStorage.setItem("token", userData.accessToken);
      localStorage.setItem("User", JSON.stringify(userData));

      setTimeout(() => {
        setLoading(false);
        if (userData.venueManager) {
          router.push("/admin");
        } else {
          router.push("/user");
        }
      }, 3000);

    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        setError(err.message);
        console.error("Login error:", err.message);
      } else {
        setError("Login failed due to an unknown error");
        console.error("Unknown login error:", err);
      }
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/img/Earth_blue.png')" }}
    >

{loading && (
  <div className="absolute inset-0 z-50 flex items-center justify-center 
                  bg-[--background-dark_blue] bg-opacity-70 
                  backdrop-blur-md">
    <LoadingGlobal />
  </div>
)}

      <form
        onSubmit={handleLogin}
        className="space-y-6 p-10 sm:p-12 w-full max-w-2xl rounded-xl shadow-lg border border-white border-2 backdrop-blur-sm"
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
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-[var(--color-text)]">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="font-semibold hover:underline text-[var(--color-text)]"
          >
            Register here
          </a>
        </p>
      </form>
    </div>
  );
}