export const API_BASE = "https://v2.api.noroff.dev";
export const X_NOROFF_API_KEY = "b47c1d2a-a0ba-4ff7-ac9b-339bb69dabe5";

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