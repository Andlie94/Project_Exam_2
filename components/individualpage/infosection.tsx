"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchProductById } from "../../lib/api/product";
import { StarIcon, HandThumbDownIcon } from "@heroicons/react/24/outline";

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

export default function InfoIndividual() {
  const params = useParams();
  const [venue, setVenue] = useState<Venue | null>(null);

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

  if (!venue) return null;

  const cleanZ = venue.name.replace(/z{3,}/gi, "");

  return (
    <div className="md:px-16 lg:px-32 xl:px-48 text-center md:text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT SIDE */}
        <div>
          <div className="flex flex-col md:flex-row md:items-baseline text-center md:text-left gap-2 md:gap-4 mb-6">
            <h2 className="text-[#414141] font-bold text-xl md:text-2xl lg:text-4xl">
              {cleanZ}
            </h2>
            <h3 className="text-[#414141] text-sm md:text-base">
              {venue.location.city}, {venue.location.country}
            </h3>
          </div>

          <p className="text-[#414141] hidden md:block">{venue.description}</p>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:ml-auto md:max-w-md text-[#414141] flex flex-col items-center md:items-start">
          {/* TAGS */}
          <div className="mb-4 flex flex-wrap gap-2 justify-center md:justify-start -mt-10 md:mt-0 cursor-pointer">
            {venue.meta.wifi && (
              <span className="bg-[#FFFFFF] border-2 text-[#02B2DE] border-[#02B2DE] rounded px-3 py-2 text-xs">WiFi</span>
            )}
            {venue.meta.breakfast && (
              <span className="bg-[#FFFFFF] border-2 text-[#02B2DE] border-[#02B2DE] rounded px-3 py-2 text-xs">Breakfast</span>
            )}
            {venue.meta.pets && (
              <span className="bg-[#FFFFFF] border-2 text-[#02B2DE] border-[#02B2DE] rounded px-3 py-2 text-xs">Pets</span>
            )}
          </div>

          {/* INFO */}
          <div className="flex flex-row md:flex-col gap-4 md:gap-2 ml-6 md:ml-0">
            <p className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-1">
              <span>Rating:</span>
              <span className="flex items-center gap-1">
                {venue.rating && venue.rating > 0 ? (
                  Array.from({ length: Math.round(venue.rating) }).map(
                    (_, i) => (
                      <StarIcon
                        key={i}
                        className="h-4 w-4 text-[#02B2DE] fill-[#02B2DE]"
                      />
                    )
                  )
                ) : (
                  <HandThumbDownIcon className="h-4 w-4 text-[#02B2DE]" />
                )}
              </span>
            </p>

            <p>Max Guests: {venue.maxGuests}</p>
            <p>Price: {venue.price}</p>
          </div>

          {/* Description for mobile */}
          <p className="text-[#414141] block md:hidden mt-4 mx-2">
            {venue.description}
          </p>
        </div>
      </div>
    </div>
  );
}
