"use client";
import { useState, useEffect } from "react";
import ProductImage from "../../../components/individualpage/imagesection";
import InfoIndividual from "../../../components/individualpage/infosection";
import Booking from "../../../components/individualpage/booking";
import { LoadingGlobal } from "../../../components/ui/loading";

export default function IndividualPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingGlobal />;

  return (
    <div>
      <ProductImage />
      <InfoIndividual />
      <Booking />
    </div>
  );
}
