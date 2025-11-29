"use client";
import React, { useEffect, useState } from "react";
import { fetchVenueCreated } from "../../lib/api/venues";
import Image from "next/image";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { DeleteButton, EditButton } from "../ui/button";

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
  const [openIds, setOpenIds] = useState<string[]>([]);

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
    <div className=" w-full md:w-lvh p-4 bg-[#036B8D] rounded-lg shadow-lg mt-4 md:mt-10">
      <h2 className="text-2xl font-bold text-white mb-8 mt-4 text-center">
        MY LISTINGS
      </h2>
      <div className="space-y-4">
        {venues.map((venue) => {
          const isOpen = openIds.includes(venue.id);
          return (
            <div key={venue.id} className="rounded-lg">
              <button
                className="flex items-center justify-between w-full p-3 bg-[#02B2DE] rounded text-white"
                onClick={() =>
                  setOpenIds((ids) =>
                    isOpen
                      ? ids.filter((id) => id !== venue.id)
                      : [...ids, venue.id]
                  )
                }
              >
                <h3 className="font-bold text-xl">{venue.name}</h3>
                {isOpen ? (
                  <ChevronUpIcon className="w-5 h-5" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5" />
                )}
              </button>
              {isOpen && (
                <div className="flex flex-row gap-4 p-4 bg-[#036B8D] text-white rounded-b-lg sm:p-3 sm:gap-3">
                  <div className="flex-1 space-y-1">
                    <h4 className="font-bold text-2xl sm:text-xl">
                      {venue.name}
                    </h4>
                    <div className="flex flex-row gap-1 text-sm">
                      <p>
                        Created:{" "}
                        {venue.created
                          ? new Date(venue.created).toLocaleDateString()
                          : "Unknown"}
                      </p>
                    </div>
                    {venue.description && (
                      <p className="text-sm">{venue.description}</p>
                    )}
                    {venue.price !== undefined && (
                      <p className="text-sm">Price: {venue.price}</p>
                    )}
                    {venue.maxGuests !== undefined && (
                      <p className="text-sm">Max guests: {venue.maxGuests}</p>
                    )}
                  </div>
                  <div className=" flex-col justify-end">
                    {venue.media?.[0]?.url && (
                        <Image
                          src={venue.media[0].url}
                          alt={venue.media[0].alt || venue.name}
                          width={170}
                          height={150}
                          className="object-cover"
                        />
                    )}
                  <div className=" gap-2 mt-4 flex">
                    <DeleteButton venueId={venue.id} onDeleted={() => {
                      setVenues((prevVenues) => prevVenues.filter((v) => v.id !== venue.id));
                    }} />
                    <EditButton/>
                  </div>
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
