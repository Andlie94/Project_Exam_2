'use client';
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

function CheckAdminToken() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token"); // liten t
    console.log("Token from localStorage:", token);

    if (!token) {
      router.push("/login"); 
    }
  }, [router]);

  return null;
}

export default function UserPage() {
  return (
    <div>
      <h1>User Page</h1>
      <CheckAdminToken />
    </div>
  );
}