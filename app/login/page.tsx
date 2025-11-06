'use client';
import React from "react";
import { InputEmail, InputPassword } from "../../components/ui/input";

function handleLogin(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
}

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/img/Earth_blue.png')" }}
    >
      <form
        className="space-y-6 p-10 -mt-24 sm:p-12 w-full max-w-2xl rounded-xl shadow-lg border border-white border-opacity-30 bg-[rgba(3,107,141,0.3)] backdrop-blur-md"
        onSubmit={handleLogin}
      >
        <h2 className="text-4xl font-bold mb-6 text-center text-white">
          Login
        </h2>

        <div className="w-full max-w-sm mx-auto space-y-4">
          <InputEmail />
          <InputPassword />
        </div>

        <button className="secundary-button mt-4 py-3 px-16 text-lg mx-auto block">
          Login
        </button>

        <p className="text-center text-[var(--color-text)]">
          Dont have an account?{" "}
          <a href="/signup" className="font-semibold hover:underline text-[var(--color-text)]">
            Register here
          </a>
        </p>
      </form>
    </div>
  );
}