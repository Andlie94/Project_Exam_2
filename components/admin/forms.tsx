"use client";
import React, { useState } from "react";
export function MakeANewVenue() {
    const [venueName, setVenueName] = useState("");
    const [venueLocation, setVenueLocation] = useState("");
    const [venueCapacity, setVenueCapacity] = useState<number | "">("");
    const [venueDescription, setVenueDescription] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log({
            venueName,
            venueLocation,
            venueCapacity,
            venueDescription,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Venue Name
                </label>
                <input
                    type="text"
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Location
                </label>
                <input
                    type="text"
                    value={venueLocation}
                    onChange={(e) => setVenueLocation(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Capacity
                </label>
                <input
                    type="number"
                    value={venueCapacity}
                    onChange={(e) =>
                        setVenueCapacity(
                            e.target.value === ""
                                ? ""
                                : Math.max(0, parseInt(e.target.value))
                        )
                    }
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                    min={0}
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <textarea
                    value={venueDescription}
                    onChange={(e) => setVenueDescription(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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