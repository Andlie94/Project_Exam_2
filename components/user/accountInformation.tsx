"use client";
import { useRouter } from "next/navigation";
import { fetchProfile } from "../../lib/api/profile";
import { useState, useEffect } from "react";
import { Loading } from "../ui/loading";

interface Profile {
  name: string;
  email: string;
  avatar?: {
    url: string;
    alt?: string;
  };
  banner?: {
    url: string;
    alt?: string;
  };
}

export default function AccountInformation() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("token");
      const userDataString = localStorage.getItem("User");

      if (!token || !userDataString) {
        router.push("/login");
        return;
      }

      try {
        const userData = JSON.parse(userDataString!);
        const name = userData.name;
        const result = await fetchProfile(token!, name);
        setProfile(result.data);
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    };

    loadProfile();
  }, [router]);

  if (!profile) {
    return <Loading />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {profile.banner?.url && profile.banner.url !== "string" && (
        <img
          src={profile.banner.url}
          alt="Profile banner"
          className="w-full h-48 object-cover rounded-lg mb-6"
        />
      )}
      {profile.avatar?.url && profile.avatar.url !== "string" ? (
        <img
          src={profile.avatar.url}
          alt={profile.name}
          className="relative z-50 w-40 h-40 rounded-full object-cover mb-4 -mt-28 mx-auto sm:ml-10 border-4 border-white"
        />
      ) : (
        <div className="relative z-50 w-40 h-40 rounded-full bg-[#02B2DE] flex items-center justify-center mb-4 -mt-28 mx-auto sm:ml-10 border-4 border-white"></div>
      )}
      <div className="text-center sm:hidden">
      <h2>
        {profile.name}
      </h2>
        <p>{profile.email}</p>
        </div>
        <div className="h-px w-full bg-[#414141] my-4 block sm:hidden"></div>
      <h2 className="text-[#414141] text-2xl sm:text-3xl ml-0 sm:ml-10 text-center">
        MY BOOKINGS
      </h2>
      <div className="h-px w-full bg-[#414141] my-4 block sm:hidden"></div>
      <div className="h-px w-full bg-[#414141] my-4 hidden sm:block"></div>
      <div className="flex min-h-screen">
        <div className="pr-6 mr-6 hidden sm:block">
          <h2 className="text-2xl font-bold text-[#414141] mb-2 ml-10">
            {profile.name}
          </h2>
          <p className="text-[#414141] ml-10">{profile.email}</p>
        </div>
        <div className="w-px bg-[#414141] hidden sm:block"></div>
      </div>
    </div>
  );
}
