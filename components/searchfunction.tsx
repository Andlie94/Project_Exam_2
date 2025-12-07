"use client";
import React, { useState } from "react";
import { InputSearch } from "./ui/input";
import { DefaultButton } from "./ui/button";

interface SearchProductProps {
  Search: (term: string) => void;
}

export function SearchProduct({ Search }: SearchProductProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (venue: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(venue.target.value);
  };

  const handleSearchClick = () => {
    Search(searchTerm);
  };

  return (
    <div className=" flex flex-col max-w-md mx-auto mb-8 gap-2">
      <div>
        <InputSearch value={searchTerm} onChange={handleInputChange} />
      </div>
      <div className="flex items-center justify-end">
        <DefaultButton text="Search" onClick={handleSearchClick} />
      </div>
    </div>
  );
}
