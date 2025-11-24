"use client";
import React from "react";
import AccountInformation from "../../components/user/accountInformation";
import Bookings from "../../components/user/bookings";

export default function UserPage() {
  return (
    <div>
      <AccountInformation />
      <Bookings />
    </div>
  );
}
