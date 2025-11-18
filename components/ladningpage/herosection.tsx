"use client";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="relative">
      <Image
        src="https://images.unsplash.com/photo-1507501336603-6e31db2be093?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2074"
        alt="view over the ocean with a white classic greece building in the front"
        width={2074}
        height={1826}
        className="w-full h-60 md:h-120 object-cover"
      />
      <div className="absolute top-[40%] left-[35%] sm:left-[20%] md:top-[40%] md:left-[35%] transform -translate-x-1/2 -translate-y-1/2 w-auto rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-[#02B2DE] opacity-50"></div>
        <div className="relative z-10 px-4 md:px-8 py-3 md:py-4">
          <h1 className="text-lg md:text-2xl lg:text-4xl font-bold text-center text-white">
            Find a date to stay with us
          </h1>
          <p className="text-center text-white sm:text-2xl">Discover your perfect stay with us today.</p>
        </div>
      </div>
    </div>
  );
}
