"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  StarIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/outline";
import { fetchProfileBookings } from "../../lib/api/profile";

interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  venue?: {
    name?: string;
    rating?: number;
    price?: number;
    media?: { url: string; alt?: string }[];
  };
}

export default function ProfileBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [openIds, setOpenIds] = useState<string[]>([]);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const userDataString = localStorage.getItem("User");
        if (token === null || userDataString === null) {
          setBookings([]);
          return;
        }
        const userData = JSON.parse(userDataString);
        const result = await fetchProfileBookings(token, userData.name);
        setBookings(result.data || []);
      } catch (error) {
        setBookings([]);
      }
    };

    loadBookings();

    const handleStorage = () => loadBookings();
    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  if (bookings.length === 0) {
    return <div className="text-[#414141] p-4">No bookings yet</div>;
  }

  return (
    <div className="w-full max-w-full mx-auto h-min p-4 bg-[#036B8D] rounded-lg lg:mt-20 lg:ml-5 shadow-lg">
      <h1 className="text-2xl font-bold text-white mb-8 mt-4 text-center">
        YOUR BOOKINGS
      </h1>

      <div className="space-y-4">
        {bookings.map((booking) => {
          const isOpen = openIds.includes(booking.id);

          return (
            <div key={booking.id} className="rounded-lg">
              <button
                className="flex items-center justify-between w-full p-3 bg-[#02B2DE] rounded text-white"
                onClick={() =>
                  setOpenIds((ids) =>
                    isOpen
                      ? ids.filter((id) => id !== booking.id)
                      : [...ids, booking.id]
                  )
                }
              >
                <h3 className="font-bold text-xl">Booking</h3>
                {isOpen ? (
                  <ChevronUpIcon className="w-5 h-5" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5" />
                )}
              </button>

              {isOpen && (
                <div
                  className="
                    flex flex-row gap-4 p-4 bg-[#036B8D] text-white rounded-b-lg
                    sm:p-3 sm:gap-3
                  "
                >
                  <div className="flex-1 space-y-1">
                    <h4 className="font-bold text-2xl sm:text-xl">
                      {booking.venue?.name ?? "Unknown venue"}
                    </h4>

                    <div className="flex flex-row gap-1 text-sm">
                      <p>Date: {booking.dateFrom.slice(0, 10)}</p>
                      <p>-</p>
                      <p>{booking.dateTo.slice(0, 10)}</p>
                    </div>

                    <div className="flex items-center gap-1 mt-2 text-sm">
                      <p>Rating:</p>
                      {booking.venue?.rating && booking.venue.rating > 0 ? (
                        Array.from({
                          length: Math.round(booking.venue.rating),
                        }).map((_, i) => (
                          <StarIcon
                            key={i}
                            className="h-4 w-4 text-[#02B2DE] fill-[#02B2DE]"
                          />
                        ))
                      ) : (
                        <HandThumbDownIcon className="h-4 w-4 text-[#02B2DE]" />
                      )}
                    </div>

                    <p className="text-sm">Price: {booking.venue?.price}</p>
                    <p className="text-sm">Guests: {booking.guests}</p>
                  </div>
                  {booking.venue?.media && booking.venue.media.length > 0 && (
                    <Image
                      src={booking.venue.media[0].url}
                      alt={booking.venue.media[0].alt || "Venue image"}
                      width={128}
                      height={128}
                      className="w-32 h-32 object-cover rounded shadow-md"
                      priority
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
