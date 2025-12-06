"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchProductById } from "../../lib/api/product";
import VenueCalendar from "../calender";
import { DefaultButton } from "../ui/button";
import { createBooking } from "../../lib/api/profile";
import { Error } from "../ui/message";

interface Venue {
  id: string;
  name: string;
  price: number;
  maxGuests: number;
  rating: number;
  description: string;
  location: { city: string; country: string };
  meta: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  };
}

export default function Booking() {
  const params = useParams();
  const router = useRouter();

  const [venue, setVenue] = useState<Venue | null>(null);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [guests, setGuests] = useState(1);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [startDate, endDate] = dateRange;

  useEffect(() => {
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

  const handleCheckout = async () => {
    if (venue === null) return;

    if (startDate === null || endDate === null || guests === null) {
      setError("You must select a date and number of guests.");
      setTimeout(() => setError(null), 3000);
      return;
    }

    setBooking(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      await createBooking(token, {
        venueId: venue.id,
        dateFrom: startDate.toISOString(),
        dateTo: endDate.toISOString(),
        guests,
      });

      router.push("/user");
    } catch (error) {
      setError("coud not create booking. Please try again.");
      setBooking(false);
    }
  };
  if (venue === null) return null;

return (
  <div className="p-4 flex justify-center mt-8 mb-8">
    <div className="flex flex-col max-w-lg w-full">
      <div className="flex flex-col md:flex-row md:items-end gap-4 w-full">
        <div className="flex flex-row gap-4 w-full sm:flex-1">
          <div className="flex flex-1 min-w-[180px] flex-col">
            <label className="mb-2 text-xs font-semibold text-[#414141]">
              Choose date:
            </label>
            <VenueCalendar
              venueId={venue.id}
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
          </div>

          <div className="flex flex-col flex-1 min-w-[140px]">
            <label className="mb-2 text-xs font-semibold text-[#414141]">
              Guests
            </label>
            <input
              type="number"
              min={1}
              max={venue.maxGuests}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full rounded-md bg-white px-4 py-3 text-base placeholder:text-[#8C929F] focus:outline-none h-12 lg:h-12"
              placeholder={`1-${venue.maxGuests}`}
            />
          </div>
        </div>

        <div className="w-full flex flex-col justify-end sm:w-auto sm:ml-4">
          <DefaultButton
            type="button"
            text={booking ? "BOOKING..." : "BOOK NOW"}
            onClick={handleCheckout}
          />
        </div>
      </div>
      {error && (
        <div className="w-full mt-4">
          <Error text={error} />
        </div>
      )}
    </div>
  </div>
);
}
