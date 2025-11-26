'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loading } from '@/components/ui/loading';
import { fetchProfile } from '@/lib/api/profile';

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
}

export default function AdminPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem('token');
      const userDataString = localStorage.getItem('User');

      if (!token || !userDataString) {
        router.push('/login');
        return;
      }

      try {
        const userData = JSON.parse(userDataString);
        const name = userData.name;
        const result = await fetchProfile(token, name);

        if (!result.data.venueManager) {
          router.push('/login');
          return;
        }

        setProfile(result.data);
      } catch (error) {
        console.error('Failed to load profile:', error);
      }
    };

    loadProfile();
  }, [router]);

  if (!profile) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-16 px-4">
      <h1 className="text-4xl font-bold text-white mb-6">
        Venue Manager Dashboard
      </h1>
      <p className="text-lg text-white mb-8 text-center max-w-xl">
        Welcome! Here you can manage your venues, view bookings, and add new
        venues.
      </p>
      <button
        className="bg-[#02B2DE] text-white font-semibold py-3 px-8 rounded-lg shadow hover:bg-[#0299c7] transition"
        onClick={() => alert('Add Venue functionality coming soon!')}
      >
        Add Venue
      </button>
    </div>
  );
}
