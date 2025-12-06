"use client";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function HeroSection() {
  return (
    <div className="relative h-[720px] w-full">
      <Image
        src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="view over a greek old town with white buildings and the ocean in the background covered in sunset light"
        width={1920}
        height={1080}
        quality={80}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 right-0 bottom-0 left-0">
        <div className="w-full h-full bg-[#022C39]" style={{ opacity: 0.5 }}></div>
      </div>
      <div className="absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-3xl md:text-5xl font-bold">Welcome to Holidaze</h1>
        <p className="mt-4 text-lg md:text-2xl">One page to guide them all, one click to find them</p>
      </div>
      <div className="absolute top-[90%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-auto rounded-lg overflow-hidden">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#02B2DE] opacity-50"></div>
        <div className="relative z-10 flex justify-center items-center">
          <ChevronDownIcon className="w-12 text-white animate-bounce" />
        </div>
      </div>
    </div>
  );
}
