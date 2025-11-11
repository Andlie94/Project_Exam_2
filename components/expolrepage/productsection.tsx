"use client";
import { useState, useEffect } from "react";
import { fetchProducts } from "../../lib/api/product";
import { ProductCard } from "../ui/card";
import { SearchProduct } from "../searchfunction";

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

export default function ProductSection() {
  const [products, setProducts] = useState<venue[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }
    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    if (!searchTerm.trim()) return true;
    const searchLower = searchTerm.toLowerCase().trim();
    return product.name.toLowerCase().includes(searchLower);
  });

  return (
    <div className="py-12 px-8 md:px-16 lg:px-32 xl:px-48 bg-[#02B2DE]">
      <SearchProduct Search={setSearchTerm} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20 max-w-6xl mx-auto mt-10">
        {filteredProducts.map((venue) => (
          <ProductCard key={venue.id} product={venue} />
        ))}
      </div>
    </div>
  );
}
