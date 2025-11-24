"use client";
import { useState, useEffect } from "react";
import { fetchProfileBookings } from "../../lib/api/profile";
import { Loading } from "../ui/loading";

interface Booking {
  id: string;
  dateFrom: string;
  dateTo: string;
  guests: number;
  created: string;
  updated: string;
}

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setBookings(result.data);
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

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (bookings.length === 0) {
    return <div className="text-[#414141] p-4">No bookings yet</div>;
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="bg-white p-4 rounded-lg border border-gray-200"
        >
          <p className="font-bold text-[#414141]">Booking ID: {booking.id}</p>
          <p className="text-[#414141]">
            From: {new Date(booking.dateFrom).toLocaleDateString()}
          </p>
          <p className="text-[#414141]">
            To: {new Date(booking.dateTo).toLocaleDateString()}
          </p>
          <p className="text-[#414141]">Guests: {booking.guests}</p>
        </div>
      ))}
    </div>
  );
}
