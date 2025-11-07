'use client';
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function CheckUserToken() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromLogin = searchParams.get("fromLogin");

  useEffect(() => {
    const token = localStorage.getItem("token"); 
    console.log("Token from localStorage:", token);

    if (!token) {
      router.push("/login"); 
      return;
    }

    if (fromLogin) {
      window.location.href = "/user";
    }
  }, [router, fromLogin]);

  return null;
}

export default function UserPage() {
  return (
    <div>
      <CheckUserToken />
      <h1>User Page</h1>
    </div>
  );
}