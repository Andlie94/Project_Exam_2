"use client";
import React, { useState } from "react";
import {
  InputTitle,
  InputDescription,
  InputPrice,
  InputMaxGuests,
  InputCountry,
  InputUrlImage,
  DateFrom,
  DateTo,
} from "../ui/input";
import { createVenues, VenuesData } from "../../lib/api/venues";

interface MakeANewVenueProps {
  onCreated?: () => void; // callback til parent når venue er opprettet
}

export function MakeANewVenue({ onCreated }: MakeANewVenueProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const venueData: VenuesData = {
      name: title,
      description,
      price: Number(price) || 0,
      maxGuests: Number(maxGuests) || 0,
      media: [
        {
          url: imageUrl || "",
          alt: description || "",
        },
      ],
      meta: {
        wifi: true,
        breakfast: false,
        pets: false,
        parking: true,
      },
      location: {
        address: address || "",
        country: country || "",
      },
      dateFrom,
      dateTo,
    };

    try {
      console.log("Sending venue data to API:", venueData);
      await createVenues(venueData);

      alert("Venue created successfully!"); // her kan du bruke toast eller annen notif

      // Reset form
      setTitle("");
      setDescription("");
      setPrice("");
      setMaxGuests("");
      setCountry("");
      setAddress("");
      setImageUrl("");
      setDateFrom("");
      setDateTo("");

      // Kall callback for parent, f.eks. gå tilbake til MY VENUES
      if (onCreated) onCreated();
    } catch (error) {
      console.error("Error creating venue:", error);
      alert("Error creating venue");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-[#036B8D] p-4 rounded-lg w-full max-w-2xl"
    >
      <InputTitle value={title} onChange={(e) => setTitle(e.target.value)} />
      <InputDescription
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <InputPrice value={price} onChange={(e) => setPrice(e.target.value)} />
      <InputMaxGuests
        value={maxGuests}
        onChange={(e) => setMaxGuests(e.target.value)}
      />
      <InputCountry value={country} onChange={(e) => setCountry(e.target.value)} />
      <InputUrlImage value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      <DateFrom value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
      <DateTo value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
      <div>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg p-2 w-full"
          required
        />
      </div>
      <button type="submit" className="button-primary">
        Create Venue
      </button>
    </form>
  );
}