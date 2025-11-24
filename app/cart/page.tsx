"use client";
import CartProduct from "../../components/cart/product";
import { Loading } from "../../components/ui/loading";
import { useState, useEffect } from "react";

export default function CartPage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
        <CartProduct />
      </div>
    </div>
  );
}
