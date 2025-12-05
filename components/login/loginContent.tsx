"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { InputEmail, InputPassword } from "@/components/ui/input";
import { loginUser } from "@/lib/api/auth";
import { Error } from "@/components/ui/message";
import { LoadingGlobal } from "@/components/ui/loading";


export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
    const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false);
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        Promise.resolve().then(() => {
          setAlreadyLoggedIn(true);
          setTimeout(() => {
            router.push("/");
          }, 4000);
        });
      }
    }, [router]);
  
    if (alreadyLoggedIn) {
      return (
        <div className="text-[#FFFFFF] text-center text-xl bg-[#026B8D] rounded-sm flex items-center justify-center min-h-screen">
          <p>You are already logged in. Redirecting</p>
      <div className=" animate-bounce">.</div>
      <div className="animate-bounce">.</div>
      <div className="animate-bounce">.</div>
        </div>
      );
    }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (email.trim() === "" || password.trim() === "") {
      setError("All fields are required");
      return;
    }
    if (!email.endsWith("@stud.noroff.no")) {
      setError("Email must be a stud.noroff.no email");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      setLoading(true);
      const userData = await loginUser(email, password);
      localStorage.setItem("token", userData.accessToken);
      localStorage.setItem("User", JSON.stringify(userData));

      setTimeout(() => {
        setLoading(false);
        window.location.href = "/";
      }, 1000);
    } catch (err: unknown) {
      setLoading(false);

      const errorMessage =
        err && typeof err === "object" && "message" in err
          ? (err as { message: string }).message
          : String(err);

      const lowerMessage = errorMessage.toLowerCase();

      if (lowerMessage.includes("invalid credentials")) {
        setError("Email and password do not match");
      } else if (lowerMessage.includes("not found")) {
        setError("User does not exist");
      } else {
        setError(errorMessage);
      }
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/img/Earth_blue.png')" }}
    >
      {loading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-opacity-70 backdrop-blur-md">
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

        <div className="w-full max-w-sm mx-auto space-y-4">
          <InputEmail
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputPassword
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Error text={error} />}
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
