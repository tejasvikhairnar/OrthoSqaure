"use client";

import React, { useState } from "react";
import { Settings, FileSpreadsheet } from "lucide-react";
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

export default function ContactDetailsPage() {
  const [name, setName] = useState("");

  // Mock data matching the image
  const contacts = [
    { id: 1, name: "APP DENTAL EQUIPMENTS", mobile: "9385854891" },
    { id: 2, name: "ORTHODENTCO", mobile: "9944223424" },
    { id: 3, name: "VINAYAGA", mobile: "7550066982" },
    { id: 4, name: "BHASKAR", mobile: "9094828083" },
    { id: 5, name: "MASOOD LASER UNIT", mobile: "9884313950" },
    { id: 6, name: "porter app", mobile: "8855401658" },
    { id: 7, name: "thanisandra water tanker", mobile: "9702057226" },
    { id: 8, name: "Mahek", mobile: "7700011473" },
    { id: 9, name: "mamta", mobile: "9067895507" },
    { id: 10, name: "unicorn lab", mobile: "7405707611" },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-4">
        <Settings className="w-5 h-5 text-red-500 animate-spin-slow" />
        <h1 className="text-lg font-bold text-red-500 uppercase tracking-wide">
          CONTACT DETAILS
        </h1>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 w-full md:w-1/3"
        />

        <Button className="bg-[#D35400] hover:bg-[#A04000] text-white px-8 font-medium shadow-sm transition-all w-full md:w-auto">
          Search
        </Button>
      </div>

      {/* Table */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-t-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-[#E8F8F5] dark:bg-gray-800">
            <TableRow className="hover:bg-[#E8F8F5] dark:hover:bg-gray-700/50 border-gray-200 dark:border-gray-700">
              <TableHead className="font-bold text-gray-700 dark:text-gray-300 w-[80px]">Sr. No.</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Name</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300 text-right pr-12">Mobile No</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.map((contact, index) => (
              <TableRow key={contact.id} className="border-gray-200 dark:border-gray-700 dark:hover:bg-gray-800/50">
                <TableCell className="dark:text-gray-300">{index + 1}</TableCell>
                <TableCell className="dark:text-gray-300 uppercase">{contact.name}</TableCell>
                <TableCell className="dark:text-gray-300 text-right pr-12">{contact.mobile}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-2">
        <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700">
          <FileSpreadsheet className="w-8 h-8" />
        </Button>
        <div className="text-xs text-blue-500 hover:underline cursor-pointer">
          12345678910... &gt;&gt;
        </div>
      </div>
    </div>
  );
}
