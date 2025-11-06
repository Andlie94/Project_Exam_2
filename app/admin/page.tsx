"use client";
import React from "react";
import { useRouter } from "next/navigation";

function CheckUserRole() {
  const router = useRouter();

  React.useEffect(() => {
    const userDataString = localStorage.getItem("User");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      if (!userData.venueManager) {
        router.push("/login"); 
      }
    }
  }, [router]);

  return null;
}

function CheckForToken() {
  const router = useRouter();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);

    if (!token) {
      router.push("/login"); 
    }
  }, [router]);

  return null;
}

export default function AdminPage() {
  return <div>Admin Page
    <CheckForToken />
    <CheckUserRole />
  </div>;
}