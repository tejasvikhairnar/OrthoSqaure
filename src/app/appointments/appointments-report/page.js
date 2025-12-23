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

export default function AppointmentsReportPage() {
  const [clinic, setClinic] = useState("");
  const [visitorName, setVisitorName] = useState("");
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Mock data matching the image
  const appointments = [
    { id: 1, name: "test", mobile: "1234567890", clinic: "ADAJAN", doctor: "", date: "31-Oct-2026", time: "11:00 AM", bookedBy: "", status: "Approved", visitStatus: "Pending" },
    { id: 2, name: "test", mobile: "1234567890", clinic: "ADAJAN", doctor: "", date: "31-Oct-2028", time: "11:00 AM", bookedBy: "PatientApp", status: "Approved", visitStatus: "Pending" },
    { id: 3, name: "B. Nikhilesh", mobile: "8179294155", clinic: "LB NAGAR", doctor: "", date: "12-Jan-2026", time: "13:00 PM", bookedBy: "", status: "Pending", visitStatus: "Pending" },
    { id: 4, name: "", mobile: "9755530937", clinic: "Bhopal", doctor: "", date: "10-Jan-2026", time: "11:00 AM", bookedBy: "", status: "Pending", visitStatus: "Pending" },
    { id: 5, name: "Khushi Chavan", mobile: "8799991807", clinic: "Porvorim", doctor: "", date: "07-Jan-2026", time: "15:00 PM", bookedBy: "", status: "Pending", visitStatus: "Pending" },
    { id: 6, name: "Nazma", mobile: "9036701315", clinic: "Hoodi", doctor: "", date: "07-Jan-2026", time: "14:30 PM", bookedBy: "", status: "Pending", visitStatus: "Pending" },
    { id: 7, name: "Subhankar Mothay", mobile: "8371044099", clinic: "Porvorim", doctor: "", date: "07-Jan-2026", time: "14:00 PM", bookedBy: "", status: "Pending", visitStatus: "Pending" },
    { id: 8, name: "Naveen", mobile: "9319522726", clinic: "LAJPAT NAGAR", doctor: "", date: "04-Jan-2026", time: "11:00 AM", bookedBy: "", status: "Pending", visitStatus: "Pending" },
    { id: 9, name: "Aishwary Dubey", mobile: "9891056124", clinic: "Indore", doctor: "", date: "03-Jan-2026", time: "15:00 PM", bookedBy: "", status: "Pending", visitStatus: "Pending" },
    { id: 10, name: "Rajina", mobile: "9188303808", clinic: "Trivandrum", doctor: "", date: "03-Jan-2026", time: "13:00 PM", bookedBy: "", status: "Pending", visitStatus: "Pending" },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-4">
        <Settings className="w-5 h-5 text-red-500 animate-spin-slow" />
        <h1 className="text-lg font-bold text-red-500 uppercase tracking-wide">
          APPOINTMENT LIST
        </h1>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select value={clinic} onValueChange={setClinic}>
            <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700">
              <SelectValue placeholder="--- Select Clinic ---" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="clinic1">Clinic 1</SelectItem>
              <SelectItem value="clinic2">Clinic 2</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Visitor Name"
            value={visitorName}
            onChange={(e) => setVisitorName(e.target.value)}
            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
          />

          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700">
              <SelectValue placeholder="--- Select Status ---" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <Input
            type="date"
            placeholder="From Date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
          />

          <Input
            type="date"
            placeholder="To Date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
          />

          <div>
            <Button className="bg-[#D35400] hover:bg-[#A04000] text-white px-8 font-medium shadow-sm transition-all w-full md:w-auto">
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-t-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-[#E8F8F5] dark:bg-gray-800">
            <TableRow className="hover:bg-[#E8F8F5] dark:hover:bg-gray-700/50 border-gray-200 dark:border-gray-700">
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Sr. No.</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Name</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Mobile No</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Clinic Name</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Doctor Name</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Date</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Time</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">BookedBy</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Appointment Status</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Visit Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((item, index) => (
              <TableRow key={item.id} className="border-gray-200 dark:border-gray-700 dark:hover:bg-gray-800/50">
                <TableCell className="dark:text-gray-300">{index + 1}</TableCell>
                <TableCell className="dark:text-gray-300">{item.name}</TableCell>
                <TableCell className="dark:text-gray-300">{item.mobile}</TableCell>
                <TableCell className="dark:text-gray-300">{item.clinic}</TableCell>
                <TableCell className="dark:text-gray-300">{item.doctor}</TableCell>
                <TableCell className="dark:text-gray-300">{item.date}</TableCell>
                <TableCell className="dark:text-gray-300">{item.time}</TableCell>
                <TableCell className="dark:text-gray-300">{item.bookedBy}</TableCell>
                <TableCell className="dark:text-gray-300">{item.status}</TableCell>
                <TableCell className="dark:text-gray-300">{item.visitStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer / Pagination/Export */}
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
