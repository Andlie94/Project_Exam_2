"use client";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="relative h-[550px] w-full">
      <Image
        src="https://images.unsplash.com/photo-1610731191056-b1014f6cb4a3?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Boat house in northern Europe in a calm body of water the water reflecting the house and the surrounding nature"
        width={2074}
        height={1826}
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 right-0 bottom-0 left-0">
        <div
          className="w-full h-full bg-[#022C39]"
          style={{ opacity: 0.5 }}
        ></div>
      </div>
      <div className="absolute top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-3xl md:text-5xl font-bold">
          Explore Your Next Adventure
        </h1>
        <p className="mt-4 text-lg md:text-2xl">
          Discover unique stays and unforgettable experiences around the world
        </p>
        <div className="w-full max-w-md mt-6"></div>
      </div>
    </div>
  );
}
