import Image from "next/image";
import { StarIcon, HandThumbDownIcon } from "@heroicons/react/24/outline";

interface Product {
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

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const cleanZ = product.name.replace(/z{3,}/gi, "");
  const displayName = cleanZ.length > 15 ? cleanZ.slice(0, 15) + "..." : cleanZ;
  const shortDescription =
    product.description && product.description.length > 0
      ? product.description.slice(0, 150) + "..."
      : "No description available.";

  return (
    <div
      className={`rounded-md overflow-hidden shadow-md bg-[#F5F5F5] cursor-pointer hover:shadow-lg transition-shadow duration-300 h-full flex flex-col`}
    >
      {product.media && product.media[0]?.url && (
        <Image
          src={product.media[0].url}
          alt={product.media[0].alt || product.name}
          width={500}
          height={256}
          className="w-full h-64 p-4 object-cover"
        />
      )}

      <div className="p-4 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-start flex-grow">
        {/*left side*/}
        <div className="min-h-[200px]">
          <h3 className="text-xl font-bold uppercase text-[#414141]">
            {displayName}
          </h3>
          <p className="text-sm text-gray-600">
            {product.location.city} {product.location.country}
          </p>

          <p className="text-base font-semibold mt-2">{product.price} kr</p>
          <p className="text-xs">Capacity: {product.maxGuests}</p>

          <p className="text-[--color-text-2] mt-1 flex items-center gap-1 text-xs">
            Rating:
            {product.rating && product.rating > 0 ? (
              Array.from({ length: Math.round(product.rating) }).map((_, i) => (
                <StarIcon
                  key={i}
                  className="h-4 w-4 text-[#02B2DE] fill-[#02B2DE]"
                />
              ))
            ) : (
              <HandThumbDownIcon className="h-4 w-4 text-[#02B2DE]" />
            )}
          </p>

          <div className="mt-2 flex flex-wrap gap-1 text-xs">
            <p className="text-xs text-[--color-text-2] font-bold uppercase">
              {product.meta.wifi ? "WiFi" : ""}{" "}
              {product.meta.parking ? "Parking" : ""}{" "}
              {product.meta.breakfast ? "Breakfast" : ""}{" "}
              {product.meta.pets ? "Pets" : ""}{" "}
            </p>
          </div>
        </div>
        <div className="hidden md:block w-0.5 bg-[#02B2DE] h-full mx-auto rounded-full" />
        {/*right side*/}
        <div className="text-gray-700 text-xs leading-relaxed">
          <p>{shortDescription}</p>
        </div>
      </div>
    </div>
  );
}
