"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AccountInformation from "../../components/user/accountInformation";
import { LoadingGlobal } from "@/components/ui/loading";


export default function UserPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("token");
      const userDataString = localStorage.getItem("User");

      if (token === null || userDataString === null) {
        router.push("/login");
        return;
      }

      try {
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
        <AccountInformation/>
  );
}