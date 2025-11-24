"use client";
import CartProduct from "../../components/cart/product";
import { useState, useEffect } from "react";

export default function CartPage() {
  type CartItem = {
    id: string;
    name: string;
    price: number;
    maxGuests: number;
    media: Array<{ url: string; alt: string }>;
    dateFrom?: string;
    dateTo?: string;
    guests?: number;
  };
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        const existingCart = localStorage.getItem("cart");
        setCart(existingCart ? JSON.parse(existingCart) : []);
        setUser(localStorage.getItem("token"));
      }, 0);
    }
  }, []);

  if (cart.length === 0) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
          <h2 className="text-xl text-[#414141] mb-6">Your cart is empty</h2>
          <p className="mb-4 text-[#414141]">
            You need to be logged in to book a venue.
          </p>
          <button
            onClick={() => (window.location.href = "/explore")}
            className="button-primary px-6 py-3 rounded-lg"
          >
            Browse Venues
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-8 text-[#414141]">Summary</h1>
        <CartProduct />
      </div>
    </div>
  );
}
