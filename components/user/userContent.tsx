"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AccountInformation from "../../components/user/accountInformation";
import { LoadingGlobal } from "@/components/ui/loading";

interface Profile {
  name: string;
  email: string;
}

export default function UserPage() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("token");
      const userDataString = localStorage.getItem("User");

      if (!token || !userDataString) {
        router.push("/login");
        return;
      }

      try {
        const userData = JSON.parse(userDataString);
        setProfile(userData); 
      } catch (error) {
        console.error(error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [router]);

  if (loading) {
    return <LoadingGlobal />;
  }

  return (
    <div className="">
      <div className="">
        <AccountInformation/>
      </div>
      <div></div>
    </div>
  );
}