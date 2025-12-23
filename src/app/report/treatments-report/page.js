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

export default function TreatmentsReportPage() {
  const [clinic, setClinic] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [treatmentName, setTreatmentName] = useState("");

  // Mock data inferred standard report structure
  const reportData = [
    { id: 1, clinic: "Nerul", doctor: "Dr.Riddhi Rathi", patient: "John Doe", treatment: "Root Canal", date: "26-05-2021", fees: "2500.00" },
    { id: 2, clinic: "ELECTRONIC CITY", doctor: "Dr.Akhil Nair", patient: "Jane Smith", treatment: "Dental Cleaning", date: "26-05-2021", fees: "1500.00" },
    { id: 3, clinic: "Nerul", doctor: "Dr.Neha S", patient: "Bob Johnson", treatment: "Consultation", date: "04-01-2021", fees: "500.00" },
    { id: 4, clinic: "GOREGAON East", doctor: "Dr.Prajakta Durgawale", patient: "Alice Brown", treatment: "X-Ray", date: "04-01-2021", fees: "800.00" },
    { id: 5, clinic: "VADODARA", doctor: "Dr.Khushbu Ranva", patient: "Charlie Davis", treatment: "Filling", date: "04-01-2021", fees: "1200.00" },
    { id: 6, clinic: "Virar", doctor: "Dr.RUCHI BHANSALI", patient: "Eva White", treatment: "Extraction", date: "04-01-2021", fees: "3000.00" },
    { id: 7, clinic: "Camp,pune", doctor: "Dr.Anagha Patil Chavan", patient: "Frank Miller", treatment: "Braces Adjustment", date: "01-09-2020", fees: "2000.00" },
    { id: 8, clinic: "Andheri East (takshila)", doctor: "Dr.Riddhi Rathi", patient: "Grace Wilson", treatment: "Whitening", date: "10-09-2020", fees: "5000.00" },
    { id: 9, clinic: "Andheri West (Juhu)", doctor: "Dr.Tejal shah", patient: "Henry Moore", treatment: "Consultation", date: "02-01-2021", fees: "500.00" },
    { id: 10, clinic: "Aundh", doctor: "Dr.Anagha Patil Chavan", patient: "Ivy Taylor", treatment: "Root Canal", date: "29-12-2020", fees: "2500.00" },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-4">
        <Settings className="w-5 h-5 text-red-500 animate-spin-slow" />
        <h1 className="text-lg font-bold text-red-500 uppercase tracking-wide">
          TREATMENTS REPORT
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
              placeholder="From Date"
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
              placeholder="To Date"
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
                placeholder="Treatment Name"
                value={treatmentName}
                onChange={(e) => setTreatmentName(e.target.value)}
                className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                />
            </div>
             <Button className="bg-[#D35400] hover:bg-[#A04000] text-white px-8 font-medium shadow-sm transition-all w-full md:w-auto">
              Search
            </Button>
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
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Patient Name</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Treatment Name</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Date</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300 text-right pr-6">Fees</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reportData.map((item, index) => (
              <TableRow key={item.id} className="border-gray-200 dark:border-gray-700 dark:hover:bg-gray-800/50">
                <TableCell className="dark:text-gray-300">{index + 1}</TableCell>
                <TableCell className="dark:text-gray-300">{item.clinic}</TableCell>
                 <TableCell className="dark:text-gray-300">{item.doctor}</TableCell>
                <TableCell className="dark:text-gray-300">{item.patient}</TableCell>
                <TableCell className="dark:text-gray-300">{item.treatment}</TableCell>
                <TableCell className="dark:text-gray-300">{item.date}</TableCell>
                <TableCell className="dark:text-gray-300 text-right pr-6">{item.fees}</TableCell>
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
          1, 2, 3 ... &gt;&gt;
        </div>
      </div>
    </div>
  );
}
