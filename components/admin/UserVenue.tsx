"use client";
import React, { useEffect, useState } from "react";
import { fetchVenueCreated } from "../../lib/api/venues";
import Image from "next/image";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { DeleteButton, EditButton } from "../ui/button";
import { EditVenueForm } from "@/components/admin/forms";
import { CloseButton } from "../ui/button";

interface Venue {
  id: string;
  name: string;
  description?: string;
  price?: number;
  maxGuests?: number;
  created?: string;
  media?: { url: string; alt?: string }[];
  location?: { address?: string; country?: string };
  dateFrom?: string;
  dateTo?: string;
}

export function UserVenueList({ profileName }: { profileName: string }) {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [openIds, setOpenIds] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchVenueCreated(profileName);
        setVenues(Array.isArray(result) ? result : []);
      } catch (err) {
        setError("Could not load venues");
        console.error(err);
      }
    };
    load();
  }, [profileName]);

  if (error) return <div>{error}</div>;

  return (
    <div className="w-full max-w-5xl mx-auto p-3 bg-[#036B8D] rounded-lg shadow-lg mt-3 md:mt-8">
      <h2 className="text-xl font-bold text-white mb-6 mt-3 text-center">
        MY LISTINGS
      </h2>
      <div className="space-y-3">
        {venues.map((venue) => {
          const isOpen = openIds.includes(venue.id);
          const isEditing = editingId === venue.id;

          return (
            <div key={venue.id} className="rounded-lg">
              <button
                className="flex items-center justify-between w-full p-2 bg-[#02B2DE] rounded text-white sm:text-sm md:text-base"
                onClick={() =>
                  setOpenIds((ids) =>
                    isOpen
                      ? ids.filter((id) => id !== venue.id)
                      : [...ids, venue.id]
                  )
                }
              >
                <h3 className="font-bold text-lg sm:text-base md:text-lg">
                  {venue.name}
                </h3>
                {isOpen ? (
                  <ChevronUpIcon className="w-4 h-4" />
                ) : (
                  <ChevronDownIcon className="w-4 h-4" />
                )}
              </button>

              {isOpen && (
                <div className="flex flex-col gap-3 p-3 bg-[#036B8D] text-white rounded-b-lg sm:p-2">
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex-1 space-y-1">
                      <h4 className="font-bold text-xl sm:text-lg">
                        {venue.name}
                      </h4>
                      <p>
                        Created:{" "}
                        {venue.created
                          ? new Date(venue.created).toLocaleDateString()
                          : "Unknown"}
                      </p>
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
                    <div className="flex-col justify-end">
                      {venue.media?.[0]?.url && (
                        <Image
                          src={venue.media[0].url}
                          alt={venue.media[0].alt || venue.name}
                          width={250}
                          height={100}
                          className="object-cover max-w-full h-auto"
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <DeleteButton
                      venueId={venue.id}
                      onDeleted={() => {
                        setVenues((prev) =>
                          prev.filter((v) => v.id !== venue.id)
                        );
                      }}
                    />
                    <EditButton
                      onClick={() => {
                        setEditingId(isEditing ? null : venue.id);
                      }}
                    />
                  </div>

                  {isEditing && (
                    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
                      <div className="bg-[#036B8D] p-5 rounded-lg max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-lg relative text-[#414141]">
                        <div className="flex justify-end">
                          <CloseButton onClick={() => setEditingId(null)} />
                        </div>
                        <EditVenueForm
                          venue={{
                            ...venue,
                            description: venue.description ?? "",
                            price:
                              typeof venue.price === "number" ? venue.price : 0,
                            maxGuests:
                              typeof venue.maxGuests === "number"
                                ? venue.maxGuests
                                : 0,
                            meta: {},
                            location: {
                              address: venue.location?.address ?? "",
                              country: venue.location?.country ?? "",
                            },
                          }}
                          onUpdated={() => {
                            setEditingId(null);
                            fetchVenueCreated(profileName).then((res) =>
                              setVenues(Array.isArray(res) ? res : [])
                            );
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
