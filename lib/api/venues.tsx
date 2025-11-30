export const API_BASE = "https://v2.api.noroff.dev";
export const X_NOROFF_API_KEY = "b47c1d2a-a0ba-4ff7-ac9b-339bb69dabe5";

export interface VenuesData {
  name: string;               
  description: string;        
  price: number;              
  maxGuests: number;          
  media?: {                   
    url: string;
    alt?: string;
  }[];
  meta: {
    wifi?: boolean;
    parking?: boolean;
    breakfast?: boolean;
    pets?: boolean;
  };
  location: {
    address: string;
    country: string;
  };
  dateFrom?: string;           
  dateTo?: string;             
}

export async function createVenues(venueData: VenuesData) {
    const token = localStorage.getItem("token");
  if (!token) throw new Error("User is not authenticated");
    try { const response = await fetch(`${API_BASE}/holidaze/venues`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-Api-Key": X_NOROFF_API_KEY,
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(venueData),
    });

    if (!response.ok) {
      throw new Error("Failed to create venue");
    }

    const result = await response.json();
    return result.data; 
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating venue:", error.message);
    } else {
      console.error("Unexpected error creating venue:", error);
    }
    throw error;
  }
}

export async function updateVenues(id: string, venueData: VenuesData) {
    const token = localStorage.getItem("token");
  if (!token) throw new Error("User is not authenticated");
  try {
    const response = await fetch(`${API_BASE}/holidaze/venues/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-Api-Key": X_NOROFF_API_KEY,
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(venueData),
    });

    if (!response.ok) {
      throw new Error("Failed to update venue");
    }

    const result = await response.json();
    return result.data; 
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error updating venue with id ${id}:`, error.message);
    } else {
      console.error(`Unexpected error updating venue with id ${id}:`, error);
    }
    throw error;
  }
}

export async function DeleteVenues(id: string) {
    const token = localStorage.getItem("token");
  if (!token) throw new Error("User is not authenticated");
  try {
    const response = await fetch(`${API_BASE}/holidaze/venues/${id}`, {
      method: "DELETE",
      headers: {
        "X-Noroff-Api-Key": X_NOROFF_API_KEY,
        "Authorization": `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete venue");
    }

    return true; 
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error deleting venue with id ${id}:`, error.message);
    } else {
      console.error(`Unexpected error deleting venue with id ${id}:`, error);
    }
    throw error;
  }
}

export async function fetchVenueCreated(name: string) {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(
      `${API_BASE}/holidaze/profiles/${name}/venues`,
      {
        headers: token
          ? {
              'Content-Type': 'application/json',
              'X-Noroff-Api-Key': X_NOROFF_API_KEY,
              Authorization: `Bearer ${token}`,
            }
          : {},
      }
    );

    if (!response.ok) throw new Error('Failed to fetch venue');

    const result = await response.json();
    return result.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error fetching venue with name ${name}:`, error.message);
    } else {
      console.error(`Unexpected error fetching venue with name ${name}:`, error);
    }
    throw error;
  }
}
