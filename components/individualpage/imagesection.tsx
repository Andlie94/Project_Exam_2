"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchProductById } from "../../lib/api/product";
import Image from "next/image";

interface venue {
  id: string;
  media: Array<{ url: string; alt: string }>;
}

export default function ProductImage() {
  const params = useParams();
  const [product, setProduct] = useState<venue | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const id = params.id as string;
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    loadProduct();
  }, [params.id]);

  if (!product) return null;

  return (
    <div className="py-12 px-4 md:px-16 lg:px-32 xl:px-48">
      {product.media && product.media[0]?.url && (
        <Image
          src={product.media[0].url}
          alt={product.media[0].alt || product.id}
          width={1200}
          height={600}
          className="w-full h-48 md:h-64 lg:h-96 object-cover rounded-lg"
        />
      )}
    </div>
  );
}
