import { API_BASE } from "./config";
export async function fetchProducts() {
  try {
    const response = await fetch(`${API_BASE}/holidaze/venues?sort=created&sortOrder=desc`);
    if (!response.ok) throw new Error("Failed to fetch products");

    const result = await response.json();
    return result.data; 
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching products:", error.message);
    } else {
      console.error("Unexpected error fetching products:", error);
    }
    throw error;
  }
}

export async function fetchProductById(id: string) {
  try {
    const response = await fetch(`${API_BASE}/holidaze/venues/${id}`);
    if (!response.ok) throw new Error("Failed to fetch product");

    const result = await response.json();
    return result.data; 
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error fetching product with id ${id}:`, error.message);
    } else {
      console.error(`Unexpected error fetching product with id ${id}:`, error);
    }
    throw error;
  }
}