"use client";

import React, { useState } from "react";
import { Settings, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function MedicinesCollectionReportPage() {
  const [clinic, setClinic] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [medicineName, setMedicineName] = useState("");

  // Mock data matching the image
  const reportData = [
    { id: 1, clinic: "Nerul", doctor: "Dr.Riddhi Rathi", medicine: "Acecloran Plus", price: "60.00", qty: "1", discount: "5.78", collection: "54.22" },
    { id: 2, clinic: "ELECTRONIC CITY", doctor: "Dr.Akhil Nair", medicine: "Acerate-SP", price: "160.00", qty: "1", discount: "13.06", collection: "146.94" },
    { id: 3, clinic: "Nerul", doctor: "Dr.Neha S", medicine: "Acerate-SP", price: "160.00", qty: "1", discount: "48.90", collection: "111.10" },
    { id: 4, clinic: "GOREGAON East", doctor: "Dr.Prajakta Durgawale", medicine: "agidine", price: "205.00", qty: "3", discount: "61.03", collection: "553.97" },
    { id: 5, clinic: "VADODARA", doctor: "Dr.Khushbu Ranva", medicine: "agidine", price: "205.00", qty: "2", discount: "-9.94", collection: "419.94" },
    { id: 6, clinic: "Virar", doctor: "Dr.RUCHI BHANSALI", medicine: "agidine", price: "205.00", qty: "4", discount: "32.02", collection: "787.98" },
    { id: 7, clinic: "Camp,pune", doctor: "Dr.Anagha Patil Chavan", medicine: "Amokat CV 625", price: "223.00", qty: "1", discount: "114.00", collection: "109.00" },
    { id: 8, clinic: "Andheri East (takshila)", doctor: "Dr.Riddhi Rathi", medicine: "Amoxybest-CV 625", price: "122.00", qty: "1", discount: "18.90", collection: "103.10" },
    { id: 9, clinic: "Andheri West (Juhu)", doctor: "Dr.Tejal shah", medicine: "Amoxybest-CV 625", price: "122.00", qty: "10", discount: "171.68", collection: "1048.32" },
    { id: 10, clinic: "Aundh", doctor: "Dr.Anagha Patil Chavan", medicine: "Amoxybest-CV 625", price: "122.00", qty: "14", discount: "165.58", collection: "1542.42" },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-4">
        <Settings className="w-5 h-5 text-red-500 animate-spin-slow" />
        <h1 className="text-lg font-bold text-red-500 uppercase tracking-wide">
          MEDICINES COLLECTION REPORT
        </h1>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Select value={clinic} onValueChange={setClinic}>
              <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700">
                <SelectValue placeholder="-- Select Clinic --" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nerul">Nerul</SelectItem>
                <SelectItem value="electronic-city">ELECTRONIC CITY</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Input
              placeholder="Doctor Name"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
            />
          </div>
           <div className="flex-1">
            <Input
              type="text"
              placeholder="06-12-2025" // Placeholder matching image design usually implies date input behavior
               onFocus={(e) => (e.target.type = "date")}
               onBlur={(e) => (e.target.type = "text")}
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
            />
          </div>
           <div className="flex-1">
            <Input
              type="text"
              placeholder="23-12-2025"
               onFocus={(e) => (e.target.type = "date")}
               onBlur={(e) => (e.target.type = "text")}
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="w-full md:w-1/4">
                 <Input
                placeholder="Medicines Name"
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                />
            </div>
             <Button className="bg-[#D35400] hover:bg-[#A04000] text-white px-8 font-medium shadow-sm transition-all w-full md:w-auto">
              Search
            </Button>
        </div>
      </div>

       {/* Total Summary */}
       <div className="flex justify-end">
           <div className="text-gray-700 dark:text-gray-300 font-medium">
               Total : 288707.18
           </div>
       </div>

      {/* Table */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-t-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-[#E8F8F5] dark:bg-gray-800">
            <TableRow className="hover:bg-[#E8F8F5] dark:hover:bg-gray-700/50 border-gray-200 dark:border-gray-700">
              <TableHead className="font-bold text-gray-700 dark:text-gray-300 w-[60px]">Sr No.</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Clinic Name</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Doctor Name</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Medicines Name</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Price</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Qty</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Total Discount</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Total Collection</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reportData.map((item, index) => (
              <TableRow key={item.id} className="border-gray-200 dark:border-gray-700 dark:hover:bg-gray-800/50">
                <TableCell className="dark:text-gray-300">{index + 1}</TableCell>
                <TableCell className="dark:text-gray-300">{item.clinic}</TableCell>
                 <TableCell className="dark:text-gray-300">{item.doctor}</TableCell>
                <TableCell className="dark:text-gray-300">{item.medicine}</TableCell>
                <TableCell className="dark:text-gray-300">{item.price}</TableCell>
                <TableCell className="dark:text-gray-300">{item.qty}</TableCell>
                <TableCell className="dark:text-gray-300">{item.discount}</TableCell>
                <TableCell className="dark:text-gray-300">{item.collection}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer / Pagination Placeholder */}
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
