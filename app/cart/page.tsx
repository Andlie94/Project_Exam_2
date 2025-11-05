"use client";
import React from "react";
import { Loading, LoadingGlobal, LoadingSkeleton } from "../../components/ui/loading";

export default function CartPage() {
  return (
    <>
      <Loading />
      <LoadingGlobal />
      <LoadingSkeleton />

      <button className="button-primary">Add to Cart</button>
        <button className="secundary-button">Continue Shopping</button>
    </>
  );
}