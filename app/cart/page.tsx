"use client";
import React from "react";
import { Loading, LoadingGlobal, LoadingSkeleton } from "../../components/ui/loading";
import {Error } from '../../components/ui/message';

export default function CartPage() {
  return (
    <>
      <Loading />
      <LoadingGlobal />
      <LoadingSkeleton />
        <Error text="This is a sample error message!" />

      <button className="button-primary">Add to Cart</button>
        <button className="secundary-button">Continue Shopping</button>
    </>
  );
}