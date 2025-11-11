"use client";
import React, { useState, useCallback } from "react";
import { InputSearch, DateTo, DateFrom } from "./ui/input";

interface SearchProductProps {
  Search: (term: string) => void;
}

export function SearchProduct({ Search }: SearchProductProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const searchProducts = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value;
      setSearchTerm(term);
      Search(term);
    },
    [Search]
  );

  return (
    <div className="max-w-md mx-auto mb-8">
      <InputSearch value={searchTerm} onChange={searchProducts} />
    </div>
  );
}

interface DatePickerProps {
  onDateSearch: (fromDate: string, toDate: string) => void;
}

export function DatePicker({ onDateSearch }: DatePickerProps) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleSearch = () => {
    onDateSearch(fromDate, toDate);
  };

  return (
    <div className="flex flex-col gap-4 justify-center">
      <div>
        <label className="block text-sm mb-1">
          <p className="text-white">From</p>
        </label>
        <DateFrom
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm mb-1 text-[#FFFFF]">
          {" "}
          <p className="text-white">To</p>
        </label>
        <DateTo value={toDate} onChange={(e) => setToDate(e.target.value)} />
      </div>
      <div className="flex justify-end">
        <button className="secundary-button w-24" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}
