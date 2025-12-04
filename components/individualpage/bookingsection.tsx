"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchProductById } from "../../lib/api/product";
import VenueCalendar from "../calender";
import { DefaultButton } from "../ui/button";
import { createBooking } from "../../lib/api/profile";

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
      setError("Du må velge dato og antall gjester.");
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
    } catch (err) {
      setError("Kunne ikke opprette booking. Prøv igjen.");
      setBooking(false);
    }
  };

  if (!venue) return <div className="p-4">Laster...</div>;

  return (
    <div className="p-4 flex justify-center  mt-8 mb-8">
      <div className="flex flex-col md:flex-row md:items-end gap-4 max-w-lg w-full justify-center">
        <div className="flex flex-1">
          <VenueCalendar
            venueId={venue.id}
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
        </div>
        <div className="flex flex-col w-40">
          <label className="font-semibold mb-2">Antall gjester:</label>
          <input
            type="number"
            min={1}
            max={venue.maxGuests}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full rounded-md bg-white px-4 py-3 text-base text-green placeholder:text-[#8C929F] focus:outline-none"
            placeholder={`1-${venue.maxGuests}`}
          />
        </div>
        <div className="flex flex-col justify-end">
          <DefaultButton
            type="button"
            text={booking ? "Booking..." : "Book nå"}
            onClick={handleCheckout}
          />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
