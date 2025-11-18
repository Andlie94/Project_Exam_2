"use client";
import React from "react";
import Image from "next/image";
import { DatePicker } from "../searchfunction";

export default function HeroSection() {
  const handleDateSearch = (fromDate: string, toDate: string) => {
    console.log("Searching for dates:", fromDate, "to", toDate);
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
      <div className="absolute top-[50%] md:top-[45%] left-[50%] md:left-[25%] transform -translate-x-1/2 -translate-y-1/2 w-[70%] max-w-xs md:max-w-sm lg:max-w-md rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-[#02B2DE] opacity-50"></div>
        <div className="relative z-10 px-1.5 md:px-3 pt-1.5 pb-0 md:pt-2 md:pb-1 text-xs md:text-sm">
          <h1 className="text-xs md:text-base lg:text-xl font-bold text-center text-white mb-1 md:mb-2">
            Find a date to stay with us
          </h1>
          <div className="flex flex-col gap-0.5 md:gap-1 scale-75 md:scale-90 lg:scale-100 origin-top">
            <DatePicker onDateSearch={handleDateSearch} />
          </div>
        </div>
      </div>
    </div>
  );
}
