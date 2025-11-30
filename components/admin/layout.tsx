"use client";
import { useRouter } from "next/navigation";
import { fetchProfile } from "../../lib/api/profile";
import { UserUpcomingBookings } from "./upcoming";
import { useState, useEffect } from "react";
import { Loading } from "../ui/loading";
import { PencilIcon } from "@heroicons/react/24/outline";


import {
  UserVenueList,
} from "@/components/admin/UserVenue";
import { MakeANewVenue } from "@/components/admin/forms";
import Image from "next/image";

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
  venueManager: boolean;
  _count: {
    bookings: number;
  };
}

export default function AccountInformation() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"venues" | "addVenue" | "orders">(
    "venues"
  );

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("token");
      const userDataString = localStorage.getItem("User");

      if (!token || !userDataString) {
        return;
      }
      try {
        const userData = JSON.parse(userDataString);
        const name = userData.name;
        const result = await fetchProfile(token, name);
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
    <div className="w-full mx-auto p-6">
      {profile.banner?.url && profile.banner.url !== "string" && (
        <Image
          src={profile.banner.url}
          alt="Profile banner"
          width={900}
          height={192}
          className="w-full h-48 object-cover rounded-lg mb-6"
        />
      )}

      <div className="relative w-40 mx-auto lg:ml-10 -mt-28 mb-4">
        {profile.avatar?.url && profile.avatar.url !== "string" ? (
          <Image
            src={profile.avatar.url}
            alt={profile.name}
            width={160}
            height={160}
            className="relative z-50 w-40 h-40 rounded-full object-cover border-4 border-white"
          />
        ) : (
          <div className="relative z-50 w-40 h-40 rounded-full bg-[#02B2DE] flex items-center justify-center border-4 border-white"></div>
        )}

        <button
          onClick={() => setShowEditForm(true)}
          className="absolute top-0 right-0 w-10 h-10 bg-[#02B2DE] hover:bg-[#0299c4] rounded-full flex items-center justify-center text-white text-xl shadow-lg z-50 transition-colors"
          title="Edit profile images"
        >
          <PencilIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile user info */}
      <div className="text-center lg:hidden">
        <h2>{profile.name}</h2>
        <p>{profile.email}</p>
        <p className="text-[#414141]">Venue Manager ✅</p>
        <p className="">Bookings: {profile._count.bookings}</p>
      </div>

      <div className="h-px w-full bg-[#414141] my-4 block lg:hidden"></div>

      <div className="text-[#414141] gap-6 flex flex-row text-2xl sm:text-3xl ml-0 md:ml-10 text-center lg:ml-80">
        <button onClick={() => setActiveTab("addVenue")}>ADD VENUE</button>
        <button onClick={() => setActiveTab("venues")}>MY VENUES</button>
        <button onClick={() => setActiveTab("orders")}>MY BOOKINGS</button>
      </div>

      <div className="h-px w-full bg-[#414141] my-4"></div>

      <div className="flex mb-10 w-full">
        <div className="pr-6 mr-6 hidden lg:block">
          <h2 className="text-2xl font-bold text-[#414141] mb-2 ml-10">
            {profile.name}
          </h2>
          <p className="text-[#414141] ml-10">{profile.email}</p>
          <p className="text-[#414141] ml-10">Venue Manager ✅</p>
          <p className="ml-10">Bookings: {profile._count.bookings}</p>
        </div>

        <div className="w-px bg-[#414141] hidden lg:block"></div>

        <div className="flex-1 flex justify-center">
          {activeTab === "addVenue" && <MakeANewVenue />}
          {activeTab === "venues" && (
            <UserVenueList profileName={profile.name} />
          )}
          {activeTab === "orders" && (
            <UserUpcomingBookings profileName={profile.name} />
          )}
        </div>
      </div>
    </div>
  );
}
