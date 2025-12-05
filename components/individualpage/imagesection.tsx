"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchProductById } from "../../lib/api/product";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface venue {
  id: string;
  media: Array<{ url: string; alt: string }>;
}

function useImageCarousel(product: venue | null) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = product?.media || [];
  const showArrows = images.length > 1;
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  return {
    images,
    currentIndex,
    setCurrentIndex,
    showArrows,
    handlePrev,
    handleNext,
  };
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

  const { images, currentIndex, showArrows, handlePrev, handleNext } =
    useImageCarousel(product);
  if (!product || !images || images.length === 0) return null;

  return (
    <div className="py-12 px-4 md:px-16 lg:px-32 xl:px-48 flex flex-col items-center">
      <div className="relative w-full">
        <Image
          src={images[currentIndex].url}
          alt={images[currentIndex].alt || product.id}
          width={1200}
          height={600}
          className="w-full h-48 md:h-64 lg:h-96 object-cover rounded-lg"
        />
        {showArrows && (
          <>
            <button
              onClick={handlePrev}
              className="absolute top-1/2 h-full -translate-y-1/2 bg-[#02B2DE] hover:bg-[#036B8D] hover:text-[#F5F5F5] text-white p-4 cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 h-full -translate-y-1/2 bg-[#02B2DE] hover:bg-[#036B8D] hover:text-[#F5F5F5] text-white p-4 cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </>
        )}
      </div>
      {showArrows && (
        <div className="hidden md:flex gap-2 mt-4">
          {images.slice(0, 4).map((img, idx) => (
            <Image
              key={idx}
              src={img.url}
              alt={img.alt || `Thumbnail ${idx + 1}`}
              width={40}
              height={24}
              className="rounded border-2 object-cover w-40 h-16"
            />
          ))}
        </div>
      )}
    </div>
  );
}
