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
      <div className="flex justify-between items-center h-full pt-10 pb-10 mr-20 ml-20 grid-cols-1 sm:grid-cols-3">
        <div className="bg-[#02B2DE] text-[#ffff] rounded-lg p-6 shadow-md h-100 w-90 mx-auto bg-shadow-lg">
          <h3 className="text-4xl font-bold pb-5">Rating System</h3>
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
        <div className="bg-[#02B2DE] text-[#ffff] rounded-lg p-6 shadow-md h-100 w-90 mx-auto bg-shadow-lg">
          <h3 className="text-4xl font-bold pb-5">Rating System</h3>
          <p className="text-sm mb-6">
            Want to list your cabin, apartment, or property? Create an account
            as a <strong>Venue Manager</strong> using your Noroff email
            (noroff.no or stud.noroff.no). You'll be able to add and edit
            listings, manage bookings, and have full control over your venue.
          </p>
          <div className="flex justify-center items-center gap-6 mb-6">
            <UserIcon className="h-8 w-8 text-[#ffff] fill-[#036B8D]" />
            <LockClosedIcon className="h-8 w-8 text-[#ffff] fill-[#036B8D]" />
            <BuildingStorefrontIcon className="h-8 w-8 text-[#ffff] fill-[#036B8D]" />
            <PencilIcon className="h-8 w-8 text-[#ffff] fill-[#036B8D]" /> 
            <CalendarIcon className="h-8 w-8 text-[#ffff] fill-[#036B8D]" />
          </div>
        </div>
        <div className="bg-[#02B2DE] text-[#ffff] rounded-lg p-6 shadow-md h-100 w-90 mx-auto bg-shadow-lg">
          <h3 className="text-4xl font-bold pb-5">Rating S</h3>
          <p className="text-sm mb-6">
            To book accommodation, you need to create an account using your{" "}
            <strong>Noroff email</strong> (noroff.no or stud.noroff.no). <br />
            This ensures secure and verified student access, allowing you to
            make bookings and enjoy all our services.
          </p>

          <div className="flex justify-center items-center gap-6 mb-6">
            <EnvelopeIcon className="h-8 w-8 text-[#ffff] fill-[#036B8D]" />
            <LockClosedIcon className="h-8 w-8 text-[#ffff] fill-[#036B8D]" />
            <UserIcon className="h-8 w-8 text-[#ffff] fill-[#036B8D]" />
          </div>
        </div>
      </div>
    </div>
  );
}
