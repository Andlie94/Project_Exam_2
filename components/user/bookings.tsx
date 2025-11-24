"use client";

import { useState, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { fetchProfileBookings } from "../../lib/api/profile";
import { Loading } from "../ui/loading";

interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId?: string;
}

export default function ProfileBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openIds, setOpenIds] = useState<string[]>([]);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const userDataString = localStorage.getItem("User");

        if (!token || !userDataString) {
          setError("Not authenticated");
          return;
        }

        const userData = JSON.parse(userDataString);
        const result = await fetchProfileBookings(token, userData.name);

        setBookings(result.data || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load bookings"
        );
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  if (loading) return <Loading />;

  if (error) return <div className="text-red-500 p-4">{error}</div>;

  if (bookings.length === 0)
    return <div className="text-[#414141] p-4">No bookings yet</div>;

  return (
    <div className="w-full max-w-full mx-auto h-min p-4 bg-[#036B8D] rounded-lg lg:mt-20 lg:ml-5">
      <h1 className="text-2xl font-bold text-white mb-8 mt-4 text-center">YOUR BOOKINGS</h1>
      <div className="space-y-4">
        {bookings.map((booking) => {
          const isOpen = openIds.includes(booking.id);
          return (
            <div key={booking.id} className="rounded-lg">
              <button
                className="flex items-center justify-between w-full p-2 sm:p-1 bg-[#02B2DE] rounded text-[#ffffff]"
                onClick={() =>
                  setOpenIds((ids) =>
                    isOpen
                      ? ids.filter((id) => id !== booking.id)
                      : [...ids, booking.id]
                  )
                }
                aria-label={isOpen ? "Skjul detaljer" : "Vis detaljer"}
              >
                <h3 className="font-bold text-xl sm:text-lg md:text-2xl">
                  Booking
                </h3>
                {isOpen ? (
                  <ChevronUpIcon className="w-5 h-5 sm:w-4 sm:h-4" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 sm:w-4 sm:h-4" />
                )}
              </button>
              {isOpen && (
                <div className="flex flex-col gap-1 text-[#FFFFFF] bg-[#036B8D] p-2 sm:p-1">
                  <h4 className="text-lg sm:text-base">Booking Details</h4>
                  <p className="text-sm sm:text-xs">Booking ID: {booking.id}</p>
                  <p className="text-sm sm:text-xs">
                    Date from: {booking.dateFrom.slice(0, 10)}
                  </p>
                  <p className="text-sm sm:text-xs">
                    Date to: {booking.dateTo.slice(0, 10)}
                  </p>
                  <p className="text-sm sm:text-xs">Guests: {booking.guests}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}