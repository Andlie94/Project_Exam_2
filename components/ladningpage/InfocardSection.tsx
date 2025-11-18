"use client";
import {
  StarIcon,
  HandThumbDownIcon,
  LockClosedIcon,
  EnvelopeIcon,
  UserIcon,
  BuildingStorefrontIcon,
  PencilIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
export default function InfoCardSection() {
  const stars = 5;

  return (
    <div className="text-center text-[#ffff]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-10 pb-10 px-4 md:px-20">
        <div className="bg-[#02B2DE] text-[#ffff] rounded-lg p-4 shadow-md">
          <h3 className="text-2xl font-bold pb-3">Rating System</h3>
          <p className="flex flex-wrap justify-center items-center gap-1 text-sm">
            Our products are rated using a simple star system{" "}
            {Array.from({ length: stars }).map((_, i) => (
              <StarIcon key={i} className="h-4 w-4 text-[#ffff] fill-[#ffff]" />
            ))}{" "}
            — five stars mean excellent quality, while fewer stars or{" "}
            <HandThumbDownIcon className="h-4 w-4 text-[#ffff] fill-amber-50" />{" "}
            indicate products that didn&apos;t meet expectations, helping you
            shop with confidence.
          </p>
        </div>
        <div className="bg-[#02B2DE] text-[#ffff] rounded-lg p-4 shadow-md">
          <h3 className="text-2xl font-bold pb-3">Venue Manager</h3>
          <p className="text-xs mb-4">
            Want to list your cabin, apartment, or property? Create an account
            as a <strong>Venue Manager</strong> using your Noroff email
            (noroff.no or stud.noroff.no). You will be able to add and edit
            listings, manage bookings, and have full control over your venue.
          </p>
          <div className="flex justify-center items-center gap-4 mb-4">
            <UserIcon className="h-6 w-6 text-[#ffff]" />
            <LockClosedIcon className="h-6 w-6 text-[#ffff]" />
            <BuildingStorefrontIcon className="h-6 w-6 text-[#ffff]" />
            <PencilIcon className="h-6 w-6 text-[#ffff]" />
            <CalendarIcon className="h-6 w-6 text-[#ffff]" />
          </div>
        </div>
        <div className="bg-[#02B2DE] text-[#ffff] rounded-lg p-4 shadow-md">
          <h3 className="text-2xl font-bold pb-3">Want to Book?</h3>
          <p className="text-xs mb-4">
            To book accommodation, you need to create an account using your{" "}
            <strong>Noroff email</strong> (noroff.no or stud.noroff.no). <br />
            This ensures secure and verified student access, allowing you to
            make bookings and enjoy all our services.
          </p>

          <div className="flex justify-center items-center gap-4 mb-4">
            <EnvelopeIcon className="h-6 w-6 text-[#ffff]" />
            <LockClosedIcon className="h-6 w-6 text-[#ffff]" />
            <UserIcon className="h-6 w-6 text-[#ffff]" />
          </div>
        </div>
      </div>
    </div>
  );
}
