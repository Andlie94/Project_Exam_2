"use client";
import React, { useEffect, useState } from "react";
import { fetchVenueCreated } from "../../lib/api/venues";
import  Image  from "next/image";

interface Venue {
  id: string;
  name: string;
  description?: string;
  price?: number;
  maxGuests?: number;
  created?: string;
  media?: { url: string; alt?: string }[];
}

export function UserVenueList({ profileName }: { profileName: string }) {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchVenueCreated(profileName);
        setVenues(Array.isArray(result) ? result : []);
      } catch (err) {
        setError("could not load venues");
        console.error(err);
      } 
    };
    load();
  }, [profileName]);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>{profileName}</h2>

      {venues.map((venue) => (
        <div key={venue.id} style={{ marginBottom: "1rem" }}>
          <h3>{venue.name}</h3>

          <p>
            Opprettet:{" "}
            {venue.created
              ? new Date(venue.created).toLocaleDateString()
              : "Ukjent"}
          </p>

          {venue.description && <p>{venue.description}</p>}
          {venue.price !== undefined && <p>Pris: {venue.price}</p>}
          {venue.maxGuests !== undefined && (
            <p>Maks gjester: {venue.maxGuests}</p>
          )}

          {venue.media?.[0]?.url && (
            <Image
              src={venue.media[0].url}
              alt={venue.media[0].alt || venue.name}
              width={120}
              height={120}
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
