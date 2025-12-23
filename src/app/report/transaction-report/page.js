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

export default function TransactionReport() {
  const [fromDate, setFromDate] = useState("2025-12-22");
  const [toDate, setToDate] = useState("2025-12-23");
  const [clinic, setClinic] = useState("");
  const [patient, setPatient] = useState("");

  // Mock data matching the image
  const tableData = [
    {
      id: 1,
      invoiceNo: "MAH008112526",
      clinicName: "dhanori",
      patientName: "pratiksha sontakke",
      age: "0",
      paidAmount: "2,400.00",
      paymentMode: "UPI",
      paidDate: "23-12-2025",
      treatmentName: "COMPOSITE RESIN RESTORATION-G1",
      groupName: "General",
    },
    {
      id: 2,
      invoiceNo: "MAH008122526",
      clinicName: "Camp.pune",
      patientName: "Sahil Sayyed",
      age: "35",
      paidAmount: "18,000.00",
      paymentMode: "FIBE",
      paidDate: "23-12-2025",
      treatmentName: "CROWN - Z-5YW",
      groupName: "General",
    },
    {
      id: 3,
      invoiceNo: "KAR008102526",
      clinicName: "MANGALORE",
      patientName: "amar g khandare",
      age: "22",
      paidAmount: "5,000.00",
      paymentMode: "UPI",
      paidDate: "23-12-2025",
      treatmentName: "DENTAL IMPLANTS - NR-LINE",
      groupName: "Implant",
    },
    {
      id: 4,
      invoiceNo: "INV186483",
      clinicName: "MANGALORE",
      patientName: "Naushad Mng",
      age: "27",
      paidAmount: "5,000.00",
      paymentMode: "Cash",
      paidDate: "23-12-2025",
      treatmentName: "ALIGNER - EXCLUSIVE",
      groupName: "Damon",
    },
    {
      id: 5,
      invoiceNo: "INV156989",
      clinicName: "Vapi",
      patientName: "Jinal Kharad",
      age: "0",
      paidAmount: "2,000.00",
      paymentMode: "Cash",
      paidDate: "23-12-2025",
      treatmentName: "CERAMIC BRACES - CLASSIC",
      groupName: "Braces",
    },
    {
      id: 6,
      invoiceNo: "INV192297",
      clinicName: "MANGALORE",
      patientName: "Reshma Mng",
      age: "32",
      paidAmount: "30,000.00",
      paymentMode: "UPI",
      paidDate: "23-12-2025",
      treatmentName: "ALIGNER-PREMIUM",
      groupName: "Damon",
    },
    {
      id: 7,
      invoiceNo: "INV194193",
      clinicName: "Salunkhe vihar",
      patientName: "Krishna Suthar",
      age: "21",
      paidAmount: "100.00",
      paymentMode: "UPI",
      paidDate: "23-12-2025",
      treatmentName: "Consultation Charges",
      groupName: "General",
    },
    {
      id: 8,
      invoiceNo: "INV194153",
      clinicName: "Kalyan",
      patientName: "Pravin Khaire",
      age: "29",
      paidAmount: "500.00",
      paymentMode: "UPI",
      paidDate: "22-12-2025",
      treatmentName: "Consultation Charges",
      groupName: "General",
    },
    {
      id: 9,
      invoiceNo: "INV194156",
      clinicName: "Kalyan",
      patientName: "Kavita Ghodke",
      age: "48",
      paidAmount: "450.00",
      paymentMode: "UPI",
      paidDate: "22-12-2025",
      treatmentName: "Consultation Charges",
      groupName: "General",
    },
    {
      id: 10,
      invoiceNo: "INV194182",
      clinicName: "Margao",
      patientName: "Aylon Fernandes",
      age: "40",
      paidAmount: "2,850.00",
      paymentMode: "Cash",
      paidDate: "22-12-2025",
      treatmentName: "Consultation Charges",
      groupName: "General",
    },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-4">
        <Settings className="w-5 h-5 text-red-500 animate-spin-slow" />
        <h1 className="text-lg font-bold text-red-500 uppercase tracking-wide">
          VIEW TRANSACTION REPORT
        </h1>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Clinic Name</label>
                 <Select value={clinic} onValueChange={setClinic}>
                    <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700">
                    <SelectValue placeholder="-- Select Clinic --" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="all">All Clinics</SelectItem>
                    <SelectItem value="clinic1">Clinic 1</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Patient</label>
                <Input
                    placeholder="Patient"
                    value={patient}
                    onChange={(e) => setPatient(e.target.value)}
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
            <div>
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
            <div>
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
            <div className="flex gap-2">
                 <Button className="bg-[#D35400] hover:bg-[#A04000] text-white px-6 font-medium shadow-sm transition-all">
                    Search
                </Button>
                 <Button className="bg-[#D35400] hover:bg-[#A04000] text-white px-6 font-medium shadow-sm transition-all">
                    Clear
                </Button>
            </div>
        </div>
      </div>

      {/* Table */}
       <div className="border border-gray-200 dark:border-gray-700 rounded-t-lg overflow-hidden overflow-x-auto">
        <Table>
          <TableHeader className="bg-[#E8F8F5] dark:bg-gray-800">
            <TableRow className="hover:bg-[#E8F8F5] dark:hover:bg-gray-700/50 border-gray-200 dark:border-gray-700">
              <TableHead className="font-bold text-gray-700 dark:text-gray-300 w-[60px]">Sr. No.</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Invoice No.</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Clinic Name</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Patient Name</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Age</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">PaidAmount</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">PaymentMode</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Paid Date</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">TreatmentName</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">GroupName</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.id} className="border-gray-200 dark:border-gray-700 dark:hover:bg-gray-800/50">
                <TableCell className="dark:text-gray-300">{row.id}</TableCell>
                <TableCell className="dark:text-gray-300">{row.invoiceNo}</TableCell>
                <TableCell className="dark:text-gray-300">{row.clinicName}</TableCell>
                <TableCell className="dark:text-gray-300">{row.patientName}</TableCell>
                <TableCell className="dark:text-gray-300">{row.age}</TableCell>
                <TableCell className="dark:text-gray-300">{row.paidAmount}</TableCell>
                <TableCell className="dark:text-gray-300">{row.paymentMode}</TableCell>
                <TableCell className="dark:text-gray-300 whitespace-nowrap">{row.paidDate}</TableCell>
                <TableCell className="dark:text-gray-300">{row.treatmentName}</TableCell>
                <TableCell className="dark:text-gray-300">{row.groupName}</TableCell>
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
