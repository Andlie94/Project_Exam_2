"use client";
import React, { useEffect, useState } from "react";
import { fetchVenueCreated } from "../../lib/api/venues";

interface Venue {
  id: string;
  name: string;
  description?: string;
  price?: number;
  maxGuests?: number;
  created?: string;
  media?: { url: string; alt?: string }[];
}

export function UserVenue({ venueId }: { venueId: string }) {
  const [venue, setVenue] = useState<Venue | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchVenueCreated(venueId);
        setVenue(result);
      } catch (err) {
        setError("fnot found venue");
        console.error(err);
      }
    };
    load();
  }, [venueId]);

  if (error) return <div>{error}</div>;
  if (!venue) return <div>No venue found</div>;

  return (
    <div>
      <div key={venue.id}>
        <h3>{venue.name}</h3>
        <p>
          Created:{" "}
          {venue.created
            ? new Date(venue.created).toLocaleDateString()
            : "Ukjent"}
        </p>
        {venue.description && <p>{venue.description}</p>}
        {venue.price && <p>Pris: {venue.price}</p>}
        {venue.maxGuests && <p>Maks gjester: {venue.maxGuests}</p>}
        {venue.media && venue.media[0]?.url && (
          <img
            src={venue.media[0].url}
            alt={venue.media[0].alt || venue.name}
            style={{ width: 100, height: 100, objectFit: "cover" }}
          />
        )}
      </div>
    </div>
  );
}
