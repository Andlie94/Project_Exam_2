"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  InputName,
  InputEmail,
  InputPassword,
  InputConfirmPassword,
} from "../../components/ui/input";
import { fetchSignUp } from "../../lib/api/auth";
import { LoadingGlobal } from "../../components/ui/loading";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [venueManager, setVenueManager] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      setLoading(true);

      const userData = await fetchSignUp(email, password, name, venueManager);
      console.log("Signup success:", userData);
      setTimeout(() => {
        setLoading(false);
        router.push("/login");
      }, 3000);
    } catch (error) {
      console.error(" Signup error:", error);
      setError("Signup failed. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/img/Earth_blue.png')" }}
    >
      {loading && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center 
                  bg-[--background-dark_blue] bg-opacity-70 
                  backdrop-blur-md"
        >
          <LoadingGlobal />
        </div>
      )}

      <form
        onSubmit={handleSignup}
        className="mt-20 mb-20 space-y-6 p-10 sm:p-12 sm-mt-20 w-full max-w-2xl rounded-xl shadow-lg border border-white border-2 backdrop-blur-sm"
        style={{ backgroundColor: "rgba(3, 107, 141, 0.5)" }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Create an Account
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="w-full max-w-sm mx-auto space-y-4">
          <InputName value={name} onChange={(e) => setName(e.target.value)} />
          <InputEmail
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputPassword
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputConfirmPassword
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="flex items-center space-x-2 text-white">
            <input
              type="checkbox"
              id="venueManager"
              checked={venueManager}
              onChange={(e) => setVenueManager(e.target.checked)}
            />
            <label htmlFor="venueManager">Register as Venue Manager</label>
          </div>
        </div>

        <button
          className="secundary-button mt-4 py-3 px-16 text-lg mx-auto block"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
