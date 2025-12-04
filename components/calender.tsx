"use client";
import { DivideIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface VenueCalendarProps {
  venueId: string;
  dateRange: [Date | null, Date | null];
  setDateRange: (range: [Date | null, Date | null]) => void;
}

interface Booking {
  dateFrom: string;
  dateTo: string;
}

export default function VenueCalendar({
  venueId,
  dateRange,
  setDateRange,
}: VenueCalendarProps) {
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [startDate, endDate] = Array.isArray(dateRange)
    ? dateRange
    : [null, null];

  useEffect(() => {
    async function fetchVenueAndBookings() {
      try {
        const res = await fetch(
          `https://v2.api.noroff.dev/holidaze/venues/${venueId}?_bookings=true`
        );
        if (!res.ok) throw new Error("Failed to fetch venue");
        const result = await res.json();
        const venue = result.data;
        const bookings = venue.bookings || [];
        const dates: Date[] = [];
        bookings.forEach((booking: Booking) => {
          const from = new Date(booking.dateFrom);
          const to = new Date(booking.dateTo);
          for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
            dates.push(new Date(d.getFullYear(), d.getMonth(), d.getDate()));
          }
        });
        setBookedDates(dates);
      } catch {
        setBookedDates([]);
      }
    }
    fetchVenueAndBookings();
  }, [venueId]);

  return (
    <DatePicker
      selectsRange
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => setDateRange(update as [Date | null, Date | null])}
      excludeDates={bookedDates}
      placeholderText="dd.mm.yyyy"
      dateFormat="dd.MM.yyyy"
      className="w-full rounded-md bg-white px-4 py-3 text-base text-green placeholder:text-[#8C929F] focus:outline-none"
      calendarClassName="bg-green border border-green/10 rounded-lg"
      popperClassName="z-50"
    />
  );
}
