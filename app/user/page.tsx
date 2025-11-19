"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AccountInformation from "../../components/user/accountInformation";

export default function UserPage() {
return (
    <div>
        <AccountInformation />
    </div>
  );
}
