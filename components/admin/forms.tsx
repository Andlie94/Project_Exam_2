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

export function MakeANewVenue() {
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

    const response = await createVenues(venueData);

    console.log("Response from API:", response);

    alert("Venue created successfully!");

    setTitle("");
    setDescription("");
    setPrice("");
    setMaxGuests("");
    setCountry("");
    setAddress("");
    setImageUrl("");
    setDateFrom("");
    setDateTo("");
  } catch (error) {
    console.error("Error creating venue:", error);
    alert("Error creating venue");
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          className="bg-[#ffffff] border border-gray-300 rounded-lg p-2 w-full"
          required
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Create Venue
      </button>
    </form>
  );
}

export function UpdateVenue() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Update Venue</h2>
      <InputTitle value={title} onChange={(e) => setTitle(e.target.value)} />
      <InputDescription value={description} onChange={(e) => setDescription(e.target.value)} />
      <InputPrice value={price} onChange={(e) => setPrice(e.target.value)} />
      <InputMaxGuests value={maxGuests} onChange={(e) => setMaxGuests(e.target.value)} />
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
          className="bg-[#ffffff] border border-gray-300 rounded-lg p-2 w-full"
          required
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded-md"
      >
        Update Venue
      </button>
    </form>
  );
}