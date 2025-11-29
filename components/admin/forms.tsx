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
import {
  createVenues,
  VenuesData,
  updateVenues,
  fetchVenueCreated,
} from "../../lib/api/venues";

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
      <InputCountry
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <InputUrlImage
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <DateFrom
        value={dateFrom}
        onChange={(e) => setDateFrom(e.target.value)}
      />
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

export function UpdateVenue({
  venueId,
  showForm,
  setShowForm,
}: {
  venueId: string;
  showForm: boolean;
  setShowForm: (show: boolean) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  React.useEffect(() => {
    const loadVenue = async () => {
      try {
        const venue = await fetchVenueCreated(venueId);
        setTitle(venue.name || "");
        setDescription(venue.description || "");
        setPrice(venue.price?.toString() || "");
        setMaxGuests(venue.maxGuests?.toString() || "");
        setCountry(venue.location?.country || "");
        setAddress(venue.location?.address || "");
        setImageUrl(venue.media?.[0]?.url || "");
        setDateFrom(venue.dateFrom || "");
        setDateTo(venue.dateTo || "");
      } catch {
        setError("Kunne ikke hente venue-data");
      } finally {
        setLoading(false);
      }
    };
    loadVenue();
  }, [venueId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
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
      await updateVenues(venueId, venueData);
      alert("Venue oppdatert!");
      setShowForm(false);
    } catch {
      setError("Kunne ikke oppdatere venue");
    } finally {
      setSaving(false);
    }
  };

  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-[#036B8D] backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#036B8D] p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#F5F5F5]">Update Venue</h2>
          <button
            onClick={() => setShowForm(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        {loading && <div className="text-white">Laster venue-data...</div>}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {!loading && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#F5F5F5] mb-3">Title</h3>
              <InputTitle
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#F5F5F5] mb-3">
                Description
              </h3>
              <InputDescription
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#F5F5F5] mb-3">Price</h3>
              <InputPrice
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#F5F5F5] mb-3">
                Max Guests
              </h3>
              <InputMaxGuests
                value={maxGuests}
                onChange={(e) => setMaxGuests(e.target.value)}
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#F5F5F5] mb-3">Country</h3>
              <InputCountry
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#F5F5F5] mb-3">Image</h3>
              <InputUrlImage
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#F5F5F5] mb-3">
                Date From
              </h3>
              <DateFrom
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#F5F5F5] mb-3">Date To</h3>
              <DateTo
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#F5F5F5] mb-3">Address</h3>
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-[#ffffff] border border-gray-300 rounded-lg p-2 w-full"
                required
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="secundary-button flex-1"
              >
                <p>Save</p>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
