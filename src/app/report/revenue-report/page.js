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

export default function RevenueReport() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [clinic, setClinic] = useState("");
  const [group, setGroup] = useState("");
  const [patientName, setPatientName] = useState("");

  // Mock data matching the image
  const tableData = [
    {
      id: 1,
      invoiceNo: "88332",
      paidAmount: "13333.00",
      paidDate: "31-03-2024 00:00:00",
      patientName: "DORASWAMY NAIDU",
      clinicName: "Andheri East (takshila)",
      model: "Lite",
      state: "Maharashtra",
      doctorName: "Dr.isha jain",
      designation: "",
      treatmentName: "DENTAL IMPLANTS - OSSTEM",
      groupName: "Implant",
    },
    {
      id: 2,
      invoiceNo: "88332",
      paidAmount: "1905.00",
      paidDate: "31-03-2024 00:00:00",
      patientName: "DORASWAMY NAIDU",
      clinicName: "Andheri East (takshila)",
      model: "Lite",
      state: "Maharashtra",
      doctorName: "Dr.isha jain",
      designation: "",
      treatmentName: "ROOT CANAL - HAND-POST",
      groupName: "General",
    },
    {
      id: 3,
      invoiceNo: "88332",
      paidAmount: "4762.00",
      paidDate: "31-03-2024 00:00:00",
      patientName: "DORASWAMY NAIDU",
      clinicName: "Andheri East (takshila)",
      model: "Lite",
      state: "Maharashtra",
      doctorName: "Dr.isha jain",
      designation: "",
      treatmentName: "CROWN - PFM",
      groupName: "General",
    },
    {
      id: 4,
      invoiceNo: "88332",
      paidAmount: "3333.00",
      paidDate: "31-03-2024 00:00:00",
      patientName: "DORASWAMY NAIDU",
      clinicName: "Andheri East (takshila)",
      model: "Lite",
      state: "Maharashtra",
      doctorName: "Dr.isha jain",
      designation: "",
      treatmentName: "DENTAL IMPLANTS - OSSTEM",
      groupName: "Implant",
    },
    {
      id: 5,
      invoiceNo: "88332",
      paidAmount: "476.00",
      paidDate: "31-03-2024 00:00:00",
      patientName: "DORASWAMY NAIDU",
      clinicName: "Andheri East (takshila)",
      model: "Lite",
      state: "Maharashtra",
      doctorName: "Dr.isha jain",
      designation: "",
      treatmentName: "ROOT CANAL - HAND-POST",
      groupName: "General",
    },
    {
      id: 6,
      invoiceNo: "88332",
      paidAmount: "1190.00",
      paidDate: "31-03-2024 00:00:00",
      patientName: "DORASWAMY NAIDU",
      clinicName: "Andheri East (takshila)",
      model: "Lite",
      state: "Maharashtra",
      doctorName: "Dr.isha jain",
      designation: "",
      treatmentName: "CROWN - PFM",
      groupName: "General",
    },
    {
      id: 7,
      invoiceNo: "90495",
      paidAmount: "86667.00",
      paidDate: "31-03-2024 00:00:00",
      patientName: "giridhar bhagat",
      clinicName: "BADLAPUR",
      model: "Premium",
      state: "Maharashtra",
      doctorName: "Dr.Kunal Shet",
      designation: "",
      treatmentName: "DENTAL IMPLANTS - BIOLINE",
      groupName: "Implant",
    },
    {
      id: 8,
      invoiceNo: "90508",
      paidAmount: "2000.00",
      paidDate: "31-03-2024 00:00:00",
      patientName: "PARINA DESAI",
      clinicName: "Vile-Parle east",
      model: "Exclusive",
      state: "Maharashtra",
      doctorName: "Dr.isha jain",
      designation: "",
      treatmentName: "CROWN - PFM",
      groupName: "General",
    },
    {
      id: 9,
      invoiceNo: "90508",
      paidAmount: "3000.00",
      paidDate: "31-03-2024 00:00:00",
      patientName: "PARINA DESAI",
      clinicName: "Vile-Parle east",
      model: "Exclusive",
      state: "Maharashtra",
      doctorName: "Dr.isha jain",
      designation: "",
      treatmentName: "CROWN - PFM",
      groupName: "General",
    },
    {
      id: 10,
      invoiceNo: "90518",
      paidAmount: "1000.00",
      paidDate: "31-03-2024 00:00:00",
      patientName: "Mangal Honure",
      clinicName: "Market Yard",
      model: "Exclusive",
      state: "Maharashtra",
      doctorName: "Dr.Divya Navsariwala",
      designation: "",
      treatmentName: "ROOT CANAL - HAND-ANT",
      groupName: "General",
    },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-4">
        <Settings className="w-5 h-5 text-red-500 animate-spin-slow" />
        <h1 className="text-lg font-bold text-red-500 uppercase tracking-wide">
          REVENUE REPORT
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
              <SelectItem value="clinic1">Clinic 1</SelectItem>
            </SelectContent>
          </Select>

          <Select value={group} onValueChange={setGroup}>
            <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700">
              <SelectValue placeholder="-- Select Group Name --" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Groups</SelectItem>
              <SelectItem value="group1">Group 1</SelectItem>
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
                    type="text"
                    placeholder="From Date"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                />
            </div>
            <div className="flex-1 max-w-xs">
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

            <Button className="bg-[#D35400] hover:bg-[#A04000] text-white px-8 font-medium shadow-sm transition-all w-full md:w-auto ml-auto">
              Search
            </Button>
        </div>
      </div>

       {/* Summary Details */}
       <div className="flex flex-col md:flex-row justify-between items-center text-sm font-medium pt-2 px-1 text-gray-700 dark:text-gray-300">
            <div>
                <span>Total Count : <span className="font-bold text-black dark:text-white">4015</span></span>
            </div>
            <div>
                 <span>Grand Total: <span className="font-bold text-black dark:text-white">40741888.00</span></span>
            </div>
        </div>

      {/* Table */}
       <div className="border border-gray-200 dark:border-gray-700 rounded-t-lg overflow-hidden overflow-x-auto">
        <Table>
          <TableHeader className="bg-[#E8F8F5] dark:bg-gray-800">
            <TableRow className="hover:bg-[#E8F8F5] dark:hover:bg-gray-700/50 border-gray-200 dark:border-gray-700">
              <TableHead className="font-bold text-gray-700 dark:text-gray-300 w-[60px]">Sr No.</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">InvoiceNo</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">PaidAmount</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">PaidDate</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Patient Name</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">ClinicName</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Model</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">State</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Doctor Name</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Designation</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Treatment Name</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">GroupName</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.id} className="border-gray-200 dark:border-gray-700 dark:hover:bg-gray-800/50">
                <TableCell className="dark:text-gray-300">{row.id}</TableCell>
                <TableCell className="dark:text-gray-300">{row.invoiceNo}</TableCell>
                <TableCell className="dark:text-gray-300">{row.paidAmount}</TableCell>
                <TableCell className="dark:text-gray-300 whitespace-nowrap">{row.paidDate}</TableCell>
                <TableCell className="dark:text-gray-300">{row.patientName}</TableCell>
                <TableCell className="dark:text-gray-300">{row.clinicName}</TableCell>
                <TableCell className="dark:text-gray-300">{row.model}</TableCell>
                <TableCell className="dark:text-gray-300">{row.state}</TableCell>
                <TableCell className="dark:text-gray-300">{row.doctorName}</TableCell>
                <TableCell className="dark:text-gray-300">{row.designation}</TableCell>
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
