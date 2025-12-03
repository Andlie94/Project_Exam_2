"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchAdminVenueBookings, AdminVenueBooking } from "../../lib/api/venues";


interface VenueBookingsProps {
  name: string;
}

export default function VenueBookings({ name }: VenueBookingsProps) {
  const [bookings, setBookings] = useState<AdminVenueBooking[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) {
      return;
    }

    const getBookings = async () => {
      try {
        const result = await fetchAdminVenueBookings(name);
        setBookings(result);
      } catch {
        setError("Kunne ikke hente bookings.");
      }
    };
    getBookings();
  }, [name]);

  if (error) return <p>{error}</p>;
  if (!bookings.length) return <p>Ingen kommende bookings</p>;

  return (
    <div>
      {bookings.map((booking, idx) => (
        <div key={idx} className="booking-card">
          <h3>{booking.venue.name}</h3>
          {booking.venue.media[0]?.url && (
            <Image
              src={booking.venue.media[0].url}
              alt={booking.venue.media[0].alt || booking.venue.name}
              width={200}
              height={120}
              style={{ objectFit: "cover" }}
            />
          )}
          <p>
            Fra: {new Date(booking.dateFrom).toLocaleDateString()} - Til: {new Date(booking.dateTo).toLocaleDateString()}
          </p>
          <p>
            <strong>Kunde:</strong> {booking.customer.name} <br />
          </p>
        </div>
      ))}
    </div>
  );
}