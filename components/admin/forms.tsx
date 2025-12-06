"use client";
import React, { useState } from "react";
import {
  InputTitle,
  InputDescription,
  InputPrice,
  InputMaxGuests,
  InputCountry,
  InputUrlImage,
} from "../ui/input";
import { StarIcon } from "@heroicons/react/24/outline";
import { createVenues, VenuesData, updateVenues } from "../../lib/api/venues";
import { SuccessMessage, Error } from "../ui/message";
import { DefaultButton } from "../ui/button";

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
  const [imageUrls, setImageUrls] = useState<string[]>([""]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");

  const handleImageUrlChange = (index: number, value: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
  };

  const addImageField = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const handleSubmit = async (formEvent: React.FormEvent) => {
    formEvent.preventDefault();

    if (Number(price) < 1) {
      setError("Price must be at least 1 kr");
      setTimeout(() => setError(""), 2000);
      return;
    }

    if (title.trim() === "" || price.trim() === "") {
      setError("Title and Price are required");
      setTimeout(() => setError(""), 2000);
      return;
    }

    if (imageUrls.every((url) => url.trim() === "")) {
      setError("At least one image URL is required");
      setTimeout(() => setError(""), 2000);
      return;
    }

    if (country.trim() === "") {
      setError("Country is required");
      setTimeout(() => setError(""), 2000);
      return;
    }

    if (Number(maxGuests) < 1) {
      setError("Max Guests must be at least 1");
      setTimeout(() => setError(""), 2000);
      return;
    }

    const venueData: VenuesData = {
      name: title,
      description,
      price: Number(price),
      maxGuests: Number(maxGuests) || 0,
      media: imageUrls
        .filter((url) => url.trim() !== "")
        .map((url) => ({ url, alt: description || "" })),
      meta: {
        wifi,
        breakfast,
        pets,
      },
      location: {
        address: "",
        country: country || "",
      },
      rating,
    };

    try {
      await createVenues(venueData);

      setShowSuccess(true);
      setTitle("");
      setDescription("");
      setPrice("");
      setMaxGuests("");
      setCountry("");
      setImageUrls([""]);
      setWifi(false);
      setBreakfast(false);
      setPets(false);
      setRating(0);

      if (onCreated) onCreated();
      setTimeout(() => setShowSuccess(false), 1000);
    } catch (error) {
      setError("Error creating venue. Please try again.");
      console.error("Error creating venue:", error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-2 bg-[#036B8D] p-4 rounded-lg w-full max-w-full sm:max-w-xl px-2 sm:px-4 overflow-hide"
      >
        <h2 className=" text-[#FFFFFF] text-center text-2xl font-bold mt-6">
          ADD NEW LISTING
        </h2>
        <InputTitle
          value={title}
          onChange={(newEvent) => setTitle(newEvent.target.value)}
        />
        <InputPrice
          value={price}
          onChange={(newEvent) => setPrice(newEvent.target.value)}
        />
        {imageUrls.map((url, idx) => (
          <InputUrlImage
            key={idx}
            value={url}
            onChange={(newEvent) =>
              handleImageUrlChange(idx, newEvent.target.value)
            }
          />
        ))}
        <button
          type="button"
          className="secundary-button flex items-center gap-2 mt-2 px-4 py-2 rounded-lg shadow-sm border border-[#02B2DE] text-[#02B2DE] bg-white hover:bg-[#E6F7FB] transition-colors duration-150"
          onClick={addImageField}
        >
          <p className="font-medium text-xs"> + Add More Images</p>
        </button>
        <div className=" flex flex-row gap-4">
          <div className="w-1/2">
            <InputMaxGuests
              value={maxGuests}
              onChange={(newEvent) => setMaxGuests(newEvent.target.value)}
            />
          </div>
          <div className="w-1/2">
            <InputCountry
              value={country}
              onChange={(newEvent) => setCountry(newEvent.target.value)}
            />
          </div>
        </div>

        <InputDescription
          value={description}
          onChange={(newEvent) => setDescription(newEvent.target.value)}
        />
        <div className="flex flex-col items-center sm:items-start mt-2">
          <label className="text-white text-sm mb-1">Rating</label>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setRating(i + 1)}
                aria-label={`Set rating to ${i + 1}`}
                className="bg-transparent border-none p-0 m-0"
              >
                <StarIcon
                  className={`h-6 w-6 ${
                    i < rating ? "text-[#02B2DE]" : "text-[#F5F5F5]"
                  }`}
                  fill={i < rating ? "#02B2DE" : "none"}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full justify-between items-center mt-4 gap-2">
          <div className="flex flex-row gap-2">
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
          <div className="w-full flex items-center sm:items-end justify-center sm:justify-end">
            <DefaultButton type="submit" text="Publish" />
          </div>
        </div>
        <div className="text-center">
          {showSuccess && <SuccessMessage text="Venue created successfully!" />}
          {error && <Error text={error} />}
        </div>
      </form>
    </>
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
  const [imageUrls, setImageUrls] = useState<string[]>(
    venue.media?.map((m) => m.url) || [""]
  );
  const [rating, setRating] = useState(venue.rating || 0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleImageUrlChange = (index: number, value: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
  };

  const handleSubmit = async (formEvent: React.FormEvent) => {
    formEvent.preventDefault();

    if (Number(price) < 1) {
      setError("Price must be at least 1 kr");
      setTimeout(() => setError(""), 2000);
      return;
    }

    if (title.trim() === "" || price.trim() === "") {
      setError("Title and Price are required");
      setTimeout(() => setError(""), 2000);
      return;
    }

    if (imageUrls.every((url) => url.trim() === "")) {
      setError("you must have at least one image");
      setTimeout(() => setError(""), 2000);
      return;
    }
    if (country.trim() === "") {
      setError("Country is required");
      setTimeout(() => setError(""), 2000);
      return;
    }

    if (Number(maxGuests) < 1) {
      setError("Max Guests must be at least 1");
      setTimeout(() => setError(""), 2000);
      return;
    }

    const updatedVenue: VenuesData = {
      ...venue,
      name: title,
      description,
      price: Number(price),
      maxGuests: Number(maxGuests) || 0,
      media: imageUrls
        .filter((url) => url.trim() !== "")
        .map((url) => ({ url, alt: description || "" })),
      meta: {
        wifi: wifi || false,
        breakfast: breakfast || false,
        pets: pets || false,
      },
      location: {
        address: "",
        country: country || "",
      },
      rating,
    };

    try {
      await updateVenues(venue.id, updatedVenue);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        if (onUpdated) onUpdated();
      }, 1000);
    } catch (error) {
      setError("Error updating venue. Please try again.");
      console.error(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-2 bg-[#036B8D] p-4 rounded-lg w-full max-w-xl mr-2 ml-2 px-2 sm:px-4"
      >
        <h2 className=" text-[#FFFFFF] text-center text-2xl font-bold">
          EDIT LISTING
        </h2>
        <InputTitle
          value={title}
          onChange={(editEvent) => setTitle(editEvent.target.value)}
        />
        <InputPrice
          value={price}
          onChange={(editEvent) => setPrice(editEvent.target.value)}
        />
        <div className=" flex flex-row gap-4">
          <div className="w-1/2">
            <InputMaxGuests
              value={maxGuests}
              onChange={(editEvent) => setMaxGuests(editEvent.target.value)}
            />
          </div>
          <div className="w-1/2">
            <InputCountry
              value={country}
              onChange={(editEvent) => setCountry(editEvent.target.value)}
            />
          </div>
        </div>
        <p className="text-[#ffffff] -mb-0.5">Add Image URLs:</p>
        {imageUrls.map((url, idx) => (
          <InputUrlImage
            key={idx}
            value={url}
            onChange={(e) => handleImageUrlChange(idx, e.target.value)}
          />
        ))}
        <InputDescription
          value={description}
          onChange={(editEvent) => setDescription(editEvent.target.value)}
        />
        <div className="flex flex-col items-center sm:items-start mt-2">
          <label className="text-white text-sm mb-1">Rating</label>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setRating(i + 1)}
                aria-label={`Set rating to ${i + 1}`}
                className="bg-transparent border-none p-0 m-0 cursor-pointer"
              >
                <StarIcon
                  className={`h-6 w-6 ${
                    i < rating ? "text-[#02B2DE]" : "text-[#F5F5F5]"
                  }`}
                  fill={i < rating ? "#02B2DE" : "none"}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full justify-between items-center mt-4 gap-2">
          <div className="flex flex-row gap-2">
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
          <div className="w-full flex items-center sm:items-end justify-center sm:justify-end">
            <DefaultButton type="submit" text="Update Venue" />
          </div>
        </div>
        <div className="text-center">
          {showSuccess && <SuccessMessage text="Venue updated" />}
          {error && <Error text={error} />}
        </div>
      </form>
    </>
  );
}
