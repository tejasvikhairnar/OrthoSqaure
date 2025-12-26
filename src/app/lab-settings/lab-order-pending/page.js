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

export default function LabOrderPending() {
  const [clinic, setClinic] = useState("");
  const [patientName, setPatientName] = useState("");
  const [startDate, setStartDate] = useState("11-12-2025");
  const [endDate, setEndDate] = useState("26-12-2025");

  // Mock data for Lab Order Pending
  const tableData = [
    { id: 1, clinicName: "bandra west", patientName: "Anil Shinde", mobile: "9892598092", treatment: "CROWN - PFM", toothNo: "11,12,21,22", date: "26-Dec-2025" },
    { id: 2, clinicName: "bandra west", patientName: "Prisha Parekh", mobile: "8425842261", treatment: "CROWN - PFM", toothNo: "47", date: "26-Dec-2025" },
    { id: 3, clinicName: "bandra west", patientName: "Manish Bandi", mobile: "9821455290", treatment: "CROWN - PFM", toothNo: "15,16,17", date: "26-Dec-2025" },
    { id: 4, clinicName: "bandra west", patientName: "haresh patel", mobile: "7821441355", treatment: "CROWN - PFM", toothNo: "14,15,16,17", date: "26-Dec-2025" },
    { id: 5, clinicName: "bandra west", patientName: "lavina almeida", mobile: "9819386319", treatment: "CROWN - PFM", toothNo: "44,45,46,47", date: "26-Dec-2025" },
    { id: 6, clinicName: "bandra west", patientName: "jyoti moorjani", mobile: "9769399920", treatment: "COMPLETE DENTURES - CLASSIC", toothNo: "Single Arch Lower", date: "26-Dec-2025" },
    { id: 7, clinicName: "bandra west", patientName: "ashok balani", mobile: "9821225925", treatment: "CROWN - PFM", toothNo: "45,46,47", date: "25-Dec-2025" },
    { id: 8, clinicName: "bandra west", patientName: "viral kothari", mobile: "9702580930", treatment: "CROWN - Z-10YW", toothNo: "15", date: "25-Dec-2025" },
    { id: 9, clinicName: "Hadapsar", patientName: "deep nahar", mobile: "9822217102", treatment: "CROWN - Z-5YW", toothNo: "11", date: "25-Dec-2025" },
    { id: 10, clinicName: "MALAD West", patientName: "Crisenta c", mobile: "7045014013", treatment: "CROWN - PFM", toothNo: "32", date: "25-Dec-2025" }
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-4">
        <Settings className="w-5 h-5 text-red-500" />
        <h1 className="text-lg font-bold text-red-500 uppercase tracking-wide">
          PENDING LAB ORDERS
        </h1>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <div className="space-y-1">
            <label className="text-sm text-gray-600 dark:text-gray-400">Clinic Name</label>
            <Select value={clinic} onValueChange={setClinic}>
                <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700">
                <SelectValue placeholder="-- Select Clinic --" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="clinic1">Clinic 1</SelectItem>
                <SelectItem value="clinic2">Clinic 2</SelectItem>
                </SelectContent>
            </Select>
         </div>

        <div className="space-y-1">
             <label className="text-sm text-gray-600 dark:text-gray-400">Patient Name</label>
            <Input
                placeholder="Patient Name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
            />
        </div>
        
         <div className="space-y-1">
            <Input
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                 className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
            />
        </div>
         <div className="space-y-1">
            <Input
                value={endDate}
                 onChange={(e) => setEndDate(e.target.value)}
                 className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
            />
        </div>
      </div>
      
       <div className="flex gap-2">
            <Button className="bg-[#D35400] hover:bg-[#A04000] text-white px-6 font-medium shadow-sm transition-all whitespace-nowrap">
                Search
            </Button>
            <Button className="bg-[#D35400] hover:bg-[#A04000] text-white px-6 font-medium shadow-sm transition-all whitespace-nowrap">
                Clear
            </Button>
        </div>


      {/* Table */}
       <div className="border border-gray-200 dark:border-gray-700 rounded-t-lg overflow-hidden overflow-x-auto">
        <Table>
          <TableHeader className="bg-[#E8F8F5] dark:bg-gray-800">
            <TableRow className="hover:bg-[#E8F8F5] dark:hover:bg-gray-700/50 border-gray-200 dark:border-gray-700">
              <TableHead className="font-bold text-gray-700 dark:text-gray-300 w-[60px]">Sr. No.</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Clinic Name</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Patient Name</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Mobile</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Treatment Name</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Tooth No</TableHead>
               <TableHead className="font-bold text-gray-700 dark:text-gray-300">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.id} className="border-gray-200 dark:border-gray-700 dark:hover:bg-gray-800/50">
                <TableCell className="dark:text-gray-300">{row.id}</TableCell>
                <TableCell className="dark:text-gray-300">{row.clinicName}</TableCell>
                <TableCell className="dark:text-gray-300">{row.patientName}</TableCell>
                <TableCell className="dark:text-gray-300">{row.mobile}</TableCell>
                <TableCell className="dark:text-gray-300">{row.treatment}</TableCell>
                 <TableCell className="dark:text-gray-300">{row.toothNo}</TableCell>
                <TableCell className="dark:text-gray-300">{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

        {/* Footer / Pagination */}
       <div className="flex justify-between items-center pt-2">
           <div className="flex items-center">
             <FileSpreadsheet className="w-8 h-8 text-green-700" />
           </div>
          <div className="flex gap-2 text-sm text-blue-600 dark:text-blue-400">
             <span className="cursor-pointer hover:underline p-1">12345678910... &gt;&gt;</span>
          </div>
        </div>
    </div>
  );
}
