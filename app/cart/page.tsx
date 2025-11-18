"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loading } from "../../components/ui/loading";

interface CartItem {
  id: string;
  name: string;
  price: number;
  maxGuests: number;
  media: Array<{ url: string; alt: string }>;
  description: string;
}

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load cart from localStorage
    const existingCart = localStorage.getItem("cart");
    if (existingCart) {
      const parsedCart = JSON.parse(existingCart);
      setTimeout(() => setCart(parsedCart), 0);
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const removeFromCart = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen py-12 px-4 md:px-16 lg:px-32 xl:px-48">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-[#414141]">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-[#414141] mb-6">Your cart is empty</p>
          <button
            onClick={() => router.push("/explore")}
            className="button-primary px-6 py-3 rounded-lg"
          >
            Browse Venues
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-[#F5F5F5] rounded-lg p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6"
            >
              {/* Image */}
              <div className="relative w-full md:w-48 h-48 rounded-lg overflow-hidden shrink-0">
                <Image
                  src={item.media[0]?.url || "/placeholder.jpg"}
                  alt={item.media[0]?.alt || item.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-[#414141] mb-2">
                    {item.name.replace(/z{3,}/gi, "")}
                  </h2>
                  <p className="text-[#414141] mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex flex-col md:flex-row gap-4 text-sm text-[#414141]">
                    <span>Max guests: {item.maxGuests}</span>
                    <span className="text-xl font-bold text-[#02B2DE]">
                      {item.price} kr/night
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => router.push(`/individual/${item.id}`)}
                    className="secundary-button px-4 py-2 rounded-lg text-sm"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-800 font-semibold text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Cart Actions */}
          <div className="bg-[#F5F5F5] rounded-lg p-6 md:p-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <p className="text-[#414141] mb-2">
                  Total items: {cart.length}
                </p>
                <p className="text-sm text-[#414141]">
                  Select dates and guests for each venue to continue
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <button
                  onClick={clearCart}
                  className="secundary-button px-6 py-3 rounded-lg"
                >
                  Clear Cart
                </button>
                <button
                  className="button-primary px-6 py-3 rounded-lg"
                  onClick={() => alert("Booking functionality coming soon!")}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}