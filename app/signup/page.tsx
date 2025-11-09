"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  InputName,
  InputEmail,
  InputPassword,
  InputConfirmPassword,
} from "../../components/ui/input";
import { Error } from "../../components/ui/message";
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

    if (!email.endsWith("@noroff.no") && !email.endsWith("@stud.noroff.no")) {
      setError("Email must be a Noroff email");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
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
    } catch (err: unknown) {
      setLoading(false);
      const errorMessage = err instanceof Error ? err.message : "Signup failed";

      if (errorMessage.includes("already exists")) {
        setError("User already exists with this email");
      } else if (errorMessage.includes("Invalid")) {
        setError("Invalid input, please check your fields");
      } else {
        setError(errorMessage);
      }

      console.error("Signup error:", err);
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
                     bg-[--background-dark_blue] bg-opacity-70 backdrop-blur-md"
        >
          <LoadingGlobal />
          <h4 className="mt-4 text-[--color-text] p-4 text-center text-xl">
            Creating your account, please wait...
          </h4>
        </div>
      )}

      <form
        onSubmit={handleSignup}
        className="mt-20 mb-20 space-y-6 p-10 sm:p-12 w-full max-w-2xl rounded-xl shadow-lg border border-white border-2 backdrop-blur-sm"
        style={{ backgroundColor: "rgba(3, 107, 141, 0.5)" }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Create an Account
        </h2>

        {error && <Error text={error} />}

        <div className="w-full max-w-sm mx-auto space-y-4">
          <InputName value={name} onChange={(e) => setName(e.target.value)} />
          <InputEmail value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputPassword value={password} onChange={(e) => setPassword(e.target.value)} />
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