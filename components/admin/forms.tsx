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
import { createVenues, VenuesData, updateVenues } from "../../lib/api/venues";

interface MakeANewVenueProps {
  onCreated?: () => void;
}

export function MakeANewVenue({ onCreated }: MakeANewVenueProps) {
  const [wifi, setWifi] = useState(false);
  const [breakfast, setBreakfast] = useState(false);
  const [pets, setPets] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [country, setCountry] = useState("");
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
        wifi,
        breakfast,
        pets,
      },
      location: {
        address: "",
        country: country || "",
      },
      dateFrom,
      dateTo,
    };

    try {
      console.log("Sending venue data to API:", venueData);
      await createVenues(venueData);
      alert("Venue created successfully!"); // bytte med message

      setTitle("");
      setDescription("");
      setPrice("");
      setMaxGuests("");
      setCountry("");
      setImageUrl("");
      setDateFrom("");
      setDateTo("");
      setWifi(false);
      setBreakfast(false);
      setPets(false);

      if (onCreated) onCreated();
    } catch (error) {
      console.error("Error creating venue:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-[#036B8D] p-4 rounded-lg w-full max-w-xl"
    >
      <h2 className=" text-[#FFFFFF] text-center text-2xl font-bold mt-6">
        ADD NEW LISTING
      </h2>
      <InputTitle value={title} onChange={(e) => setTitle(e.target.value)} />

      <InputPrice value={price} onChange={(e) => setPrice(e.target.value)} />
      <InputMaxGuests
        value={maxGuests}
        onChange={(e) => setMaxGuests(e.target.value)}
      />
      <InputCountry
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <InputUrlImage
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <div className="flex flex-row justify-center gap-4">
        <DateFrom
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
        />
        <DateTo value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
      </div>
      <InputDescription
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex flex-row gap-2 justify-center">
        <button
          type="button"
          className="secundary-button flex items-center gap-2 pl-3 pr-3"
          onClick={() => setWifi((prev) => !prev)}
          aria-pressed={wifi}
          style={{
            backgroundColor: wifi ? "#02B2DE" : "#FFFFFF",
            color: wifi ? "#FFFFFF" : "#02B2DE",
          }}
        >
          <p>Wifi</p>
        </button>
        <button
          type="button"
          className="secundary-button flex items-center gap-2 transition-all pl-2 pr-2"
          onClick={() => setBreakfast((prev) => !prev)}
          aria-pressed={breakfast}
          style={{
            backgroundColor: breakfast ? "#02B2DE" : "#FFFFFF",
            color: breakfast ? "#FFFFFF" : "#02B2DE",
          }}
        >
          <p>Breakfast</p>
        </button>
        <button
          type="button"
          className="secundary-button flex items-center gap-2 pl-2 pr-2"
          onClick={() => setPets((prev) => !prev)}
          aria-pressed={pets}
          style={{
            backgroundColor: pets ? "#02B2DE" : "#FFFFFF",
            color: pets ? "#FFFFFF" : "#02B2DE",
          }}
        >
          <p>Pets</p>
        </button>
      </div>
      <div className="flex justify-center ">
        <button type="submit" className="secundary-button p-2">
          Create Venue
        </button>
      </div>
    </form>
  );
}

interface EditVenueFormProps {
  venue: VenuesData & { id: string };
  onUpdated?: () => void;
}

export function EditVenueForm({ venue, onUpdated }: EditVenueFormProps) {
  const [wifi, setWifi] = useState(venue.meta?.wifi || false);
  const [breakfast, setBreakfast] = useState(venue.meta?.breakfast || false);
  const [pets, setPets] = useState(venue.meta?.pets || false);
  const [title, setTitle] = useState(venue.name || "");
  const [description, setDescription] = useState(venue.description || "");
  const [price, setPrice] = useState(venue.price?.toString() || "");
  const [maxGuests, setMaxGuests] = useState(venue.maxGuests?.toString() || "");
  const [country, setCountry] = useState(venue.location?.country || "");
  const [imageUrl, setImageUrl] = useState(venue.media?.[0]?.url || "");
  const [dateFrom, setDateFrom] = useState(venue.dateFrom || "");
  const [dateTo, setDateTo] = useState(venue.dateTo || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedVenue: VenuesData = {
      ...venue,
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
        wifi,
        breakfast,
        pets,
      },
      location: {
        address: "",
        country: country || "",
      },
      dateFrom,
      dateTo,
    };

    try {
      await updateVenues(venue.id, updatedVenue);
      if (onUpdated) onUpdated();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-[#036B8D] p-4 rounded-lg w-full max-w-xl"
    >
      <h2 className=" text-[#FFFFFF] text-center text-2xl font-bold mt-6">
        EDIT LISTING
      </h2>
      <InputTitle value={title} onChange={(e) => setTitle(e.target.value)} />
      <InputPrice value={price} onChange={(e) => setPrice(e.target.value)} />
      <InputMaxGuests
        value={maxGuests}
        onChange={(e) => setMaxGuests(e.target.value)}
      />
      <InputCountry
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <InputUrlImage
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <div className="flex flex-row justify-center gap-4">
        <DateFrom
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
        />
        <DateTo value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
      </div>
      <InputDescription
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex flex-row gap-2 justify-center">
        <button
          type="button"
          className="secundary-button flex items-center gap-2 pl-3 pr-3"
          onClick={() => setWifi((prev) => !prev)}
          aria-pressed={wifi}
          style={{
            backgroundColor: wifi ? "#02B2DE" : "#FFFFFF",
            color: wifi ? "#FFFFFF" : "#02B2DE",
          }}
        >
          <p>Wifi</p>
        </button>
        <button
          type="button"
          className="secundary-button flex items-center gap-2 transition-all pl-2 pr-2"
          onClick={() => setBreakfast((prev) => !prev)}
          aria-pressed={breakfast}
          style={{
            backgroundColor: breakfast ? "#02B2DE" : "#FFFFFF",
            color: breakfast ? "#FFFFFF" : "#02B2DE",
          }}
        >
          <p>Breakfast</p>
        </button>
        <button
          type="button"
          className="secundary-button flex items-center gap-2 pl-2 pr-2"
          onClick={() => setPets((prev) => !prev)}
          aria-pressed={pets}
          style={{
            backgroundColor: pets ? "#02B2DE" : "#FFFFFF",
            color: pets ? "#FFFFFF" : "#02B2DE",
          }}
        >
          <p>Pets</p>
        </button>
      </div>
      <div className="flex justify-center ">
        <button type="submit" className="secundary-button p-2">
          Update Venue
        </button>
      </div>
    </form>
  );
}
