"use client";
import React, { useState, useEffect } from "react";
import { fetchProducts } from "../../lib/api/product";
import { ProductCard } from "../ui/card";
import Link from "next/link";

interface venue {
  id: string;
  name: string;
  price: number;
  maxGuests: number;
  rating: number;
  description: string;
  media: Array<{ url: string; alt: string }>;
  location: { city: string; country: string };
  meta: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  };
}

export function PopulareStays() {
  const [products, setProducts] = useState<venue[]>([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        const sortedByRating = data.sort(
          (highRating: venue, lowRating: venue) =>
            lowRating.rating - highRating.rating
        );
        setProducts(sortedByRating);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }
    loadProducts();
  }, []);

  return (
    <div className="py-12 px-8 md:px-16 lg:px-32 xl:px-48">
      <h2 className=" text-[#FFFFFF] mb-5">This Week’s Featured Places</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.slice(0, 3).map((venue) => (
          <Link
            key={venue.id}
            href={`/individual/${venue.id}`}
            className="block"
          >
            <ProductCard key={venue.id} product={venue} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export function FeaturedPlaces() {
  const [products, setProducts] = useState<venue[]>([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        const sortedByKr = data.sort(
          (highPrice: venue, lowPrice: venue) =>
            lowPrice.price - highPrice.price
        );
        setProducts(sortedByKr);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }
    loadProducts();
  }, []);

  return (
    <div className="py-12 px-8 md:px-16 lg:px-32 xl:px-48">
      <h2 className=" text-[#FFFFFF] mb-5">This Week’s Featured Places</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.slice(0, 3).map((venue) => (
          <Link
            key={venue.id}
            href={`/individual/${venue.id}`}
            className="block"
          >
            <ProductCard key={venue.id} product={venue} />
          </Link>
        ))}
      </div>
    </div>
  );
}
