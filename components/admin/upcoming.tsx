import { useEffect, useState } from "react";
import { fetchUpcomingBookings } from "../../lib/api/profile";

interface Booking {
  id: string;
  venue?: {
    id: string;
    name: string;
  };
  dateFrom?: string;
  dateTo?: string;
}
export function UserUpcomingBookings({ profileName }: { profileName: string }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadBookings = async () => {
      setLoading(true);
      try {
        const token =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (!token || !profileName) {
          setError("Mangler brukerdata eller token");
          setLoading(false);
          return;
        }

        const result = await fetchUpcomingBookings(token, profileName);
        console.log("API response:", result);
        if (Array.isArray(result)) {
          setBookings(
            result.map((booking) => ({
              ...booking,
              id: String(booking.id),
              venue: booking.venue
                ? {
                    ...booking.venue,
                    id: String(booking.venue.id),
                  }
                : undefined,
            }))
          );
        } else {
          setBookings([]);
        }
      } catch (err) {
        setError("Could not load bookings");
        console.error(err);
      }
      setLoading(false);
    };
    loadBookings();
  }, [profileName]);

  if (loading) return <div className="text-white">Laster bookinger...</div>;
  if (error) return <div className="text-white">{error}</div>;

  return (
    <div className="w-full md:w-lvh p-4 bg-[#036B8D] rounded-lg shadow-lg mt-4 md:mt-10">
      <h2 className="text-2xl font-bold text-white mb-8 mt-4 text-center">
        UPCOMING BOOKINGS
      </h2>
      <div className="space-y-4">
        {bookings.length === 0 ? (
          <div className="p-4 bg-[#02B2DE] rounded text-white text-center">
            <p>No upcoming bookings found.</p>
          </div>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking.id}
              className="p-4 bg-[#02B2DE] rounded text-white"
            >
              <h3 className="font-bold text-xl">Booking ID: {booking.id}</h3>
              <p className="text-sm">
                Venue: {booking.venue?.name || "Unknown Venue"}
              </p>
              <p className="text-sm">
                Date From:{" "}
                {booking.dateFrom
                  ? new Date(booking.dateFrom).toLocaleDateString()
                  : "Unknown"}
              </p>
              <p className="text-sm">
                Date To:{" "}
                {booking.dateTo
                  ? new Date(booking.dateTo).toLocaleDateString()
                  : "Unknown"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
