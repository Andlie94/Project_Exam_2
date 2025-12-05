"use client";
import { useState, useEffect } from "react";
import ProductImage from "@/components/individualpage/imagesection";
import InfoIndividual from "@/components/individualpage/infosection";
import { LoadingGlobal } from "@/components/ui/loading";
import Booking from "@/components/individualpage/bookingsection";

export default function IndividualPage() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setTimeout(() => setIsLoggedIn(!!token), 0);
    }

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingGlobal />;

  return (
    <div>
      <ProductImage />
      <InfoIndividual />
      {isLoggedIn && <Booking />}
    </div>
  );
}
