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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function TreatmentsCountReport() {
  const [fromDate, setFromDate] = useState("2025-12-08");
  const [toDate, setToDate] = useState("2025-12-23");
  const [clinic, setClinic] = useState("");
  const [group, setGroup] = useState("");
  const [patientName, setPatientName] = useState("");

  // Mock data as per previous implementation
  const tableData = [
    {
      id: 1,
      groupName: "Implant",
      clinicName: "Vile-Parle east",
      patientCode: "P7346",
      patientName: "Ghanshyam Patel",
      invoiceNo: "47589",
      grandTotal: "75000.00",
    },
    {
      id: 2,
      groupName: "General",
      clinicName: "GHATKOPAR East",
      patientCode: "P49668",
      patientName: "Mahesh patel",
      invoiceNo: "47513",
      grandTotal: "75000.00",
    },
    {
      id: 3,
      groupName: "General",
      clinicName: "Salunkhe vihar",
      patientCode: "P113912",
      patientName: "Pallavi Naykodi",
      invoiceNo: "185090",
      grandTotal: "200.00",
    },
    {
      id: 4,
      groupName: "General",
      clinicName: "Camp,pune",
      patientCode: "P113923",
      patientName: "Sahil Sayyed",
      invoiceNo: "165089",
      grandTotal: "18000.00",
    },
    {
      id: 5,
      groupName: "General",
      clinicName: "dhanori",
      patientCode: "P111941",
      patientName: "pratiksha sontakke",
      invoiceNo: "165088",
      grandTotal: "2400.00",
    },
    {
      id: 6,
      groupName: "Implant",
      clinicName: "MANGALORE",
      patientCode: "P85414",
      patientName: "amar g khandare",
      invoiceNo: "185087",
      grandTotal: "20000.00",
    },
    {
      id: 7,
      groupName: "General",
      clinicName: "Thane West (RamMarutiRoad)",
      patientCode: "P113553",
      patientName: "Om Baraskar",
      invoiceNo: "165086",
      grandTotal: "1000.00",
    },
    {
      id: 8,
      groupName: "Braces",
      clinicName: "Thane West (RamMarutiRoad)",
      patientCode: "P113553",
      patientName: "Om Baraskar",
      invoiceNo: "185085",
      grandTotal: "20000.00",
    },
    {
      id: 9,
      groupName: "General",
      clinicName: "Thane West (RamMarutiRoad)",
      patientCode: "P109994",
      patientName: "Lalit Nagvekar",
      invoiceNo: "165084",
      grandTotal: "4000.00",
    },
    {
      id: 10,
      groupName: "Implant",
      clinicName: "Thane West (RamMarutiRoad)",
      patientCode: "P113921",
      patientName: "Gilroy DSouza",
      invoiceNo: "185083",
      grandTotal: "100000.00",
    },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-4">
        <Settings className="w-5 h-5 text-red-500 animate-spin-slow" />
        <h1 className="text-lg font-bold text-red-500 uppercase tracking-wide">
          TREATMENTS COUNT REPORT
        </h1>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select value={clinic} onValueChange={setClinic}>
            <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700">
              <SelectValue placeholder="-- Select Clinic --" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Clinics</SelectItem>
              <SelectItem value="vile-parle">Vile-Parle east</SelectItem>
            </SelectContent>
          </Select>

          <Select value={group} onValueChange={setGroup}>
            <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700">
              <SelectValue placeholder="-- Select Group Name --" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Groups</SelectItem>
              <SelectItem value="implant">Implant</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
          />

          <div className="flex items-center space-x-2">
            <Checkbox id="newPatients" />
            <Label htmlFor="newPatients" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-gray-300">
              New Patients
            </Label>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 max-w-xs">
                <Input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                />
            </div>
            <div className="flex-1 max-w-xs">
                 <Input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                />
            </div>
             
             <Button className="bg-[#D35400] hover:bg-[#A04000] text-white px-8 font-medium shadow-sm transition-all w-full md:w-auto ml-auto">
              Search
            </Button>
        </div>
      </div>

       {/* Summary Details */}
         <div className="flex flex-col md:flex-row justify-between items-center text-sm font-medium pt-2 px-1 text-gray-700 dark:text-gray-300">
            <div>
                <span>Total Count : <span className="font-bold text-black dark:text-white">1327</span></span>
            </div>
            <div>
                 <span>Grand Total: <span className="font-bold text-black dark:text-white">28609172.50</span></span>
            </div>
        </div>

      {/* Table */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-t-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-[#E8F8F5] dark:bg-gray-800">
            <TableRow className="hover:bg-[#E8F8F5] dark:hover:bg-gray-700/50 border-gray-200 dark:border-gray-700">
              <TableHead className="font-bold text-gray-700 dark:text-gray-300 w-[80px]">Sr No.</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Group Name</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Clinic Name</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Patient Code</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Patient Name</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Invoice No</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300 text-right">Grand Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.id} className="border-gray-200 dark:border-gray-700 dark:hover:bg-gray-800/50">
                <TableCell className="dark:text-gray-300">{row.id}</TableCell>
                <TableCell className="dark:text-gray-300">{row.groupName}</TableCell>
                <TableCell className="dark:text-gray-300">{row.clinicName}</TableCell>
                <TableCell className="dark:text-gray-300">{row.patientCode}</TableCell>
                <TableCell className="dark:text-gray-300">{row.patientName}</TableCell>
                <TableCell className="dark:text-gray-300">{row.invoiceNo}</TableCell>
                <TableCell className="text-right dark:text-gray-300">{row.grandTotal}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

       {/* Footer / Pagination */}
       <div className="flex justify-between items-center pt-2">
         {/* Excel Export Icon */}
          <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700">
              <FileSpreadsheet className="w-6 h-6" />
         </Button>


          <div className="flex gap-2 text-sm text-blue-600 dark:text-blue-400">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <span key={num} className="cursor-pointer hover:underline p-1">
                {num}
              </span>
            ))}
            <span className="cursor-pointer hover:underline p-1">... &gt;&gt;</span>
          </div>
        </div>
    </div>
  );
}
