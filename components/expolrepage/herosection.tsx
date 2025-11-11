"use client";
import React from "react";
import Image from "next/image";
import { DatePicker } from "../searchfunction";

export default function HeroSection() {
  const handleDateSearch = (fromDate: string, toDate: string) => {
    console.log("Searching for dates:", fromDate, "to", toDate);
    // Her kan du legge til logikk for å filtrere venues basert på datoer
  };

  return (
    <div className="relative">
      <Image
        src="https://images.unsplash.com/photo-1507501336603-6e31db2be093?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2074"
        alt="view over the ocean with a white classic greece building in the front"
        width={2074}
        height={1826}
        className="w-full h-48 md:h-96 object-cover"
      />
      {/* form section need to be replaced with date picker and location picker */}
      <div className="absolute top-20 md:top-40 left-4 md:left-1/4 transform md:-translate-x-1/2 md:-translate-y-1/2 px-4 md:px-8 py-3 md:py-4 rounded-lg w-11/12 md:w-auto">
        <div className="absolute inset-0 bg-[#02B2DE] opacity-50 rounded-lg"></div>
        <div className="relative z-10">
          <h1 className="text-lg md:text-2xl lg:text-4xl font-bold text-center text-white">
            Find a date to stay with us
          </h1>
          <div className="flex flex-col gap-2 md:gap-4 mt-4 md:mt-10">
            <DatePicker onDateSearch={handleDateSearch} />
          </div>
        </div>
      </div>
    </div>
  );
}
