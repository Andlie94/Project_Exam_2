"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  fetchAdminVenueBookings,
  AdminVenueBooking,
} from "../../lib/api/venues";

interface VenueBookingsProps {
  name: string;
}

export default function VenueBookings({ name }: VenueBookingsProps) {
  const [bookings, setBookings] = useState<AdminVenueBooking[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    if (!name) {
      return;
    }

    const getBookings = async () => {
      try {
        const result = await fetchAdminVenueBookings(name);
        setBookings(result);
      } catch {
        setError("Could not fetch bookings.");
      }
    };
    getBookings();
  }, [name]);

  if (error) return <p>{error}</p>;
  if (!bookings.length) return <p>No upcoming bookings</p>;

  return (
    <div className="w-full md:w-lvh p-4 bg-[#036B8D] rounded-lg shadow-lg mt-4 md:mt-10">
      <h2 className="text-2xl font-bold text-white mb-8 mt-4 text-center">
        Upcoming Bookings
      </h2>
      <div className="space-y-4">
        {bookings.map((booking, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="rounded-lg bg-[#02B2DE] text-white">
              <button
                className="flex items-center justify-between w-full p-4 rounded text-white bg-[#02B2DE]"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
              >
                <h3 className="font-bold text-xl">{booking.venue.name}</h3>
                {isOpen ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </button>
              {isOpen && (
                <div className="flex flex-row items-center justify-between gap-4 p-4 bg-[#036B8D] rounded-b-lg">
                  <div className="flex-1 space-y-2">
                    <p>
                      From {new Date(booking.dateFrom).toLocaleDateString()} -
                      To: {new Date(booking.dateTo).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Customer:</strong> {booking.customer.name}
                    </p>
                  </div>
                  <div className="flex-col justify-end">
                    {booking.venue.media[0]?.url && (
                      <Image
                        src={booking.venue.media[0].url}
                        alt={booking.venue.media[0].alt || booking.venue.name}
                        width={170}
                        height={150}
                        className="object-cover rounded"
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
