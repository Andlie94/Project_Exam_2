"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchProductById } from "../../lib/api/product";

interface Venue {
  id: string;
  name: string;
  price: number;
  maxGuests: number;
  description: string;
  media: Array<{ url: string; alt: string }>;
}

function loginToBuy() {
  if (typeof window === "undefined") return false;
  const token = localStorage.getItem("token");
  console.log("Token:", token);
  if (!token) {
    return false;
  }
  return true;
}

export default function Booking() {
  const params = useParams();
  const router = useRouter();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsClient(true), 0);

    const loadVenue = async () => {
      try {
        const id = params.id as string;
        const data = await fetchProductById(id);
        setVenue(data);
      } catch (error) {
        console.error("Failed to fetch venue:", error);
      }
    };

    loadVenue();
  }, [params.id]);

  const addToCart = () => {
    if (!venue) return;

    const existingCart = localStorage.getItem("cart");
    const cart = existingCart ? JSON.parse(existingCart) : [];

    cart.push({
      id: venue.id,
      name: venue.name,
      price: venue.price,
      maxGuests: venue.maxGuests,
      media: venue.media,
      description: venue.description,
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    router.push("/cart");
  };

  if (!venue) return null;

  // Don't show button if not logged in or not on client side
  if (!isClient || !loginToBuy()) return null;

  return (
    <div className="md:px-16 lg:px-32 xl:px-48">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div></div>
        <div className="md:ml-auto md:max-w-md flex justify-center md:justify-start">
          <button
            onClick={addToCart}
            className="button-primary py-2 px-4 rounded-lg font-bold text-white transition-all hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
