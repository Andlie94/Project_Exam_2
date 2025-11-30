import { error } from "console";

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
    const response = await fetch(
      `${API_BASE}/holidaze/profiles/${name}?_venues=true&_bookings=true`,
      {
        headers: {
          "X-Noroff-Api-Key": X_NOROFF_API_KEY,
          Authorization: `Bearer ${token}`,
        },
      }
    );

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

export async function updateProfile(
  token: string,
  name: string,
  profileData: UpdateProfileData
) {
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

export async function fetchProfileBookings(token: string, name: string) {
  try {
    const response = await fetch(
      `${API_BASE}/holidaze/profiles/${name}/bookings?_venue=true`,
      {
        headers: {
          "X-Noroff-Api-Key": X_NOROFF_API_KEY,
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch bookings");
    }

    const result = await response.json();
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching bookings:", error.message);
    } else {
      console.error("Unexpected error fetching bookings:", error);
    }
    throw error;
  }
}

export interface CreateBookingData {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
}

export async function createBooking(
  token: string,
  bookingData: CreateBookingData
) {
  try {
    const response = await fetch(`${API_BASE}/holidaze/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-Api-Key": X_NOROFF_API_KEY,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create booking");
    }

    const result = await response.json();
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating booking:", error.message);
    } else {
      console.error("Unexpected error creating booking:", error);
    }
    throw error;
  }
}

interface Booking {
  id: number;
  dateFrom: string;
  dateTo: string;
  venue: {
    id: number;
    name: string;
  };
}
export async function fetchUpcomingBookings(
  token: string,
  name: string
): Promise<Booking[]> {
  try {
    const response = await fetch(
      `${API_BASE}/holidaze/profiles/${name}/bookings`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Noroff-Api-Key": X_NOROFF_API_KEY,
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch upcoming bookings");
    }

    const result = await response.json();
    console.log("API response for upcoming bookings:", result);
    return result.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching upcoming bookings:", error.message);
    } else {
      console.error("Unexpected error fetching upcoming bookings:", error);
    }
    throw error;
  }
}
