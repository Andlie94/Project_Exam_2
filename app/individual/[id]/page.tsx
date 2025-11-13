"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchProductById } from "../../../lib/api/product";
import React from "react";
import Image from "next/image";

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

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<venue | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        const id = params.id as string;
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="py-12 px-8 md:px-16 lg:px-32 xl:px-48">
         {product.media && product.media[0]?.url && (
              <Image
                src={product.media[0].url}
                alt={product.media[0].alt || product.name}
                width={500}
                height={256}
                className="w-full h-64 p-4 object-cover"
              />
            )}
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: {product.price} kr</p>
      <p>Max Guests: {product.maxGuests}</p>
    </div>
  );
}