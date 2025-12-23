"use client";

import React, { useState } from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ViewTodaysConfirmedAppointments() {
  const [patientName, setPatientName] = useState("");
  const [patientNo, setPatientNo] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // Placeholder for search logic
    console.log("Searching for:", { patientName, patientNo });
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
        <Settings className="w-5 h-5 text-red-500 animate-spin-slow" />
        <h1 className="text-lg font-bold text-red-500 uppercase tracking-wide">
          CONSULTATION ADD TREATMENT
        </h1>
      </div>

      {/* Search Section */}
      <div className="flex flex-col md:flex-row gap-4 items-end mb-6">
        <div className="w-full md:w-1/3">
          <Input
            placeholder="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 dark:text-gray-100"
          />
        </div>
        <div className="w-full md:w-1/3">
          <Input
            placeholder="Patient No."
            value={patientNo}
            onChange={(e) => setPatientNo(e.target.value)}
            className="w-full bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 dark:text-gray-100"
          />
        </div>
        <div>
          <Button
            onClick={handleSearch}
            className="bg-[#D35400] hover:bg-[#A04000] text-white px-8 font-medium shadow-sm transition-all"
          >
            Search
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-t-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-[#E8F8F5] dark:bg-gray-800">
            <TableRow className="hover:bg-[#E8F8F5] dark:hover:bg-gray-700/50 border-gray-200 dark:border-gray-700">
              <TableHead className="text-center font-bold text-gray-700 dark:text-gray-300 w-[100px]">Sr. No.</TableHead>
              <TableHead className="text-center font-bold text-gray-700 dark:text-gray-300">Patient No</TableHead>
              <TableHead className="text-center font-bold text-gray-700 dark:text-gray-300">Patient Name</TableHead>
              <TableHead className="text-center font-bold text-gray-700 dark:text-gray-300">Mobile No</TableHead>
              <TableHead className="text-center font-bold text-gray-700 dark:text-gray-300">Doctors</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.length > 0 ? (
              results.map((item, index) => (
                <TableRow key={index} className="text-center border-gray-200 dark:border-gray-700 dark:hover:bg-gray-800/50">
                  <TableCell className="dark:text-gray-300">{index + 1}</TableCell>
                  <TableCell className="dark:text-gray-300">{item.patientNo}</TableCell>
                  <TableCell className="dark:text-gray-300">{item.patientName}</TableCell>
                  <TableCell className="dark:text-gray-300">{item.mobileNo}</TableCell>
                  <TableCell className="dark:text-gray-300">{item.doctor}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent dark:hover:bg-transparent">
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-gray-500 dark:text-gray-400 font-medium"
                >
                  No Record Available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
