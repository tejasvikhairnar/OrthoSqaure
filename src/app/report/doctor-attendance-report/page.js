"use client";

import React, { useState } from "react";
import { Settings } from "lucide-react";
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

export default function DoctorAttendanceReportPage() {
  const [selectedOption, setSelectedOption] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Mock data matching the image
  const reportData = [
    { id: 1, doctor: "Dr.Sabeena Khan", clinic: "", date: "26-05-2021", inTime: "10:39 AM", outTime: "" },
    { id: 2, doctor: "Dr.SHRADDHA KAMBALE", clinic: "", date: "04-01-2021", inTime: "07:47 PM", outTime: "" },
    { id: 3, doctor: "Dr.SHRADDHA KAMBALE", clinic: "", date: "30-10-2020", inTime: "11:32 AM", outTime: "" },
    { id: 4, doctor: "Dr.Jahnavi Patel", clinic: "", date: "04-01-2021", inTime: "09:51 AM", outTime: "" },
    { id: 5, doctor: "Dr.Jahnavi Patel", clinic: "", date: "04-01-2021", inTime: "09:51 AM", outTime: "" },
    { id: 6, doctor: "Dr.Jahnavi Patel", clinic: "", date: "04-01-2021", inTime: "09:51 AM", outTime: "" },
    { id: 7, doctor: "Dr.ANGIE FERNANDES", clinic: "", date: "01-09-2020", inTime: "11:00 AM", outTime: "" },
    { id: 8, doctor: "Dr.ANGIE FERNANDES", clinic: "", date: "10-09-2020", inTime: "11:04 AM", outTime: "" },
    { id: 9, doctor: "Dr.isha jain", clinic: "", date: "02-01-2021", inTime: "10:48 AM", outTime: "" },
    { id: 10, doctor: "Dr.isha jain", clinic: "", date: "29-12-2020", inTime: "01:50 PM", outTime: "" },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-4">
        <Settings className="w-5 h-5 text-red-500 animate-spin-slow" />
        <h1 className="text-lg font-bold text-red-500 uppercase tracking-wide">
          DOCTOR ATTENDANCE REPORT
        </h1>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="w-full md:w-1/4">
          <Select value={selectedOption} onValueChange={setSelectedOption}>
            <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700">
              <SelectValue placeholder="--- Select ---" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">Option 1</SelectItem>
              <SelectItem value="option2">Option 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-1/4">
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

        <div className="w-full md:w-1/4">
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
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Doctor Name</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Clinic Name</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Date</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">In Time</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Out Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reportData.map((item, index) => (
              <TableRow key={item.id} className="border-gray-200 dark:border-gray-700 dark:hover:bg-gray-800/50">
                <TableCell className="dark:text-gray-300">{index + 1}</TableCell>
                <TableCell className="dark:text-gray-300">{item.doctor}</TableCell>
                <TableCell className="dark:text-gray-300">{item.clinic}</TableCell>
                <TableCell className="dark:text-gray-300">{item.date}</TableCell>
                <TableCell className="dark:text-gray-300">{item.inTime}</TableCell>
                <TableCell className="dark:text-gray-300">{item.outTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer / Pagination Placeholder */}
       <div className="flex justify-end items-center pt-2">
        <div className="text-xs text-blue-500 hover:underline cursor-pointer">
          12345678910... &gt;&gt;
        </div>
      </div>
    </div>
  );
}
