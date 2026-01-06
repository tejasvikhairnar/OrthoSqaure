"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { DatePicker } from "@/components/ui/date-picker";
import { Search, X } from "lucide-react"; // Import icons


export function InvoiceFilters({ onFilterChange }) {
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState(undefined);
  const [toDate, setToDate] = useState(undefined);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange({ search, fromDate, toDate });
  };

  const handleClear = () => {
    setSearch("");
    setFromDate(undefined);
    setToDate(undefined);
    onFilterChange({ search: "", fromDate: undefined, toDate: undefined });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-end">
      <div className="flex-1 min-w-[150px]">
        <label htmlFor="search" className="sr-only">Search</label>
        <Input
          id="search"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        {/* <DatePicker date={fromDate} setDate={setFromDate} placeholder="From date" />
        <DatePicker date={toDate} setDate={setToDate} placeholder="To date" /> */}
      </div>
      <Button type="submit" className="w-full sm:w-auto">
        <Search className="mr-2 h-4 w-4" /> Search
      </Button>
      <Button type="button" variant="outline" onClick={handleClear} className="w-full sm:w-auto">
        <X className="mr-2 h-4 w-4" /> Clear
      </Button>
    </form>
  );
}