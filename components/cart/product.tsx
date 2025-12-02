"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createBooking } from "../../lib/api/profile";
import { BookingDateInput, InputGuests } from "../../components/ui/input";
import { Error } from "../ui/message";
import { DefaultButton } from "../ui/button";

interface CartItem {
  id: string;
  name: string;
  price: number;
  maxGuests: number;
  media: Array<{ url: string; alt: string }>;
  dateFrom?: string;
  dateTo?: string;
  guests?: number;
}

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const existingCart = localStorage.getItem("cart");
    if (existingCart) {
      const parsedCart = JSON.parse(existingCart);
      setTimeout(() => setCart(parsedCart), 0);
    }
  }, []);

  const updateCartItem = (id: string, updates: Partial<CartItem>) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    let errorMessage = "";
    const missingAll = cart.filter(
      (item) => !item.dateFrom && !item.dateTo && !item.guests
    );
    const onlyDates = cart.filter(
      (item) => item.dateFrom && item.dateTo && !item.guests
    );
    const onlyGuests = cart.filter(
      (item) => !item.dateFrom && !item.dateTo && item.guests
    );
    const missingall = cart.filter(
      (item) => !item.dateFrom || !item.dateTo || !item.guests
    );

    if (missingAll.length > 0) {
      errorMessage = "Please fill in both dates and guests";
    } else if (onlyDates.length > 0) {
      errorMessage = "Please select number of guests for your Booking";
    } else if (onlyGuests.length > 0) {
      errorMessage =
        "Please select both check-in and check-out dates for your Booking";
    } else if (missingall.length > 0) {
      errorMessage = "Please fill in all the Fiealds to book a night with us.";
    }
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    setBooking(true);
    setError(null);

    try {
      for (const item of cart) {
        await createBooking(token, {
          venueId: item.id,
          dateFrom: item.dateFrom!,
          dateTo: item.dateTo!,
          guests: item.guests!,
        });
      }

      clearCart();
      router.push("/user");
    } catch (err) {
      setError(
  err && typeof err === "object" && "message" in err
    ? String((err as { message: string }).message)
    : "Failed to create booking"
);
      setBooking(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 md:px-16 lg:px-32 xl:px-48">
      {cart.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-[#414141] mb-6">Your cart is empty</p>
          <DefaultButton
            type="button"
            text="Browse Venues"
            onClick={() => router.push("/explore")}
          />
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col items-end">
              <div className="border-2 border-[#02B2DE] bg-[#036B8D] rounded-lg p-4 md:p-6 w-full md:w-[500px]">
                <div className="flex flex-row items-center justify-between">
                  <div className="flex flex-col items-start flex-1 text-white">
                    <h2 className="text-xl md:text-2xl font-bold mb-2">
                      {item.name.replace(/z{3,}/gi, "")}
                    </h2>
                    <span className="text-xl font-bold mb-2 block">
                      {item.price} kr/night
                    </span>
                    <span>
                      Capacity: {item.maxGuests} max guests
                    </span>
                  </div>
                  <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden ml-4 flex items-start justify-end">
                    <Image
                      src={item.media[0]?.url || "/placeholder.jpg"}
                      alt={item.media[0]?.alt || item.name}
                      fill
                      className="object-cover"
                    />
                    <div className="secondary absolute top-2 right-2">
                      <button onClick={() => removeFromCart(item.id)}>
                        {" "}
                        delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 mt-4 w-full md:w-[500px] items-center">
                <div className="flex gap-2 w-full justify-center items-center">
                  <BookingDateInput
                    dateFrom={item.dateFrom || ""}
                    dateTo={item.dateTo || ""}
                    onChange={(field, value) =>
                      updateCartItem(item.id, { [field]: value })
                    }
                  />
                </div>
                <InputGuests
                  min={1}
                  max={item.maxGuests}
                  value={item.guests || ""}
                  onChange={(e) =>
                    updateCartItem(item.id, {
                      guests: parseInt(e.target.value),
                    })
                  }
                  placeholder="Guests"
                />
              </div>
            </div>
          ))}
          <div className="bg-[#F5F5F5] rounded-lg p-6 md:p-8 mt-8 flex flex-col items-center">
            {error && <Error text={error} />}
            <div className="flex flex-row gap-4 w-full justify-center">
              <DefaultButton
                type="button"
                text="Clear Cart"
                onClick={clearCart}
              />
              <DefaultButton
                type="submit"
                text={booking ? "Booking..." : "Checkout"}
                onClick={handleCheckout}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
