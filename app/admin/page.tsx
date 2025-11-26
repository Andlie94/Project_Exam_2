'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loading } from '@/components/ui/loading';
import { fetchProfile } from '@/lib/api/profile';
import AccountInformation from '@/components/admin/layout';

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
    <div className="">
      <AccountInformation />
    </div>
  );
}
