export const API_BASE = "https://v2.api.noroff.dev";
export const X_NOROFF_API_KEY = "b47c1d2a-a0ba-4ff7-ac9b-339bb69dabe5";

export interface UpdateProfileData {
  avatar?: {
    url: string;
    alt?: string;
  };
  banner?: {
    url: string;
    alt?: string;
  };
  venueManager?: boolean;
  bio?: string;
}

export async function fetchProfile(token: string, name: string) {
  try {
    const response = await fetch(`${API_BASE}/holidaze/profiles/${name}?_venues=true&_bookings=true`, {
      headers: {
        "X-Noroff-Api-Key": X_NOROFF_API_KEY,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }

    const result = await response.json();
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching profile:", error.message);
    } else {
      console.error("Unexpected error fetching profile:", error);
    }
    throw error;
  }
}

export async function updateProfile(token: string, name: string, profileData: UpdateProfileData) {
  try {
    const response = await fetch(`${API_BASE}/holidaze/profiles/${name}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-Api-Key": X_NOROFF_API_KEY,
        Authorization: `Bearer ${token}`,
      },   
      body: JSON.stringify(profileData),
    });

   if (!response.ok) {
  const errorData = await response.json();
  throw new Error(errorData.message || "Failed to update profile");
    }

    const result = await response.json();
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error updating profile:", error.message);
    } else {
      console.error("Unexpected error updating profile:", error);
    }
    throw error;
  }
}