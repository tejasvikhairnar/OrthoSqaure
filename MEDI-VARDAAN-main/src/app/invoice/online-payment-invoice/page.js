"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Settings, FileSpreadsheet } from "lucide-react"; 

export default function OnlinePaymentInvoicePage() {
  const [filters, setFilters] = useState({
    clinicName: "",
    invoiceNo: "",
    fromDate: "2025-12-07",
    toDate: "2025-12-22",
  });

  // Mock Data matching the screenshot
  const mockData = [
    {
      id: 1,
      clinicName: "Dehradun",
      patientCode: "P113607",
      patientName: "shubhashish bhatt",
      invoiceNo: "UTP003142526",
      paymentDate: "17-Dec-2025",
      revenueAmount: "500.00",
      paymentMode: "UPI",
      transactionNo: "115661718611",
    },
    {
      id: 2,
      clinicName: "Dehradun",
      patientCode: "P113604",
      patientName: "rakesh agarwal",
      invoiceNo: "UTP003112526",
      paymentDate: "17-Dec-2025",
      revenueAmount: "2,500.00",
      paymentMode: "UPI",
      transactionNo: "115661718611",
    },
    {
      id: 3,
      clinicName: "LB NAGAR",
      patientCode: "P113613",
      patientName: "C Vijaya Bhaskar",
      invoiceNo: "TEL003262526",
      paymentDate: "17-Dec-2025",
      revenueAmount: "5,000.00",
      paymentMode: "UPI",
      transactionNo: "12512171147195511932202",
    },
     {
      id: 4,
      clinicName: "LB NAGAR",
      patientCode: "P113613",
      patientName: "C Vijaya Bhaskar",
      invoiceNo: "TEL003262526",
      paymentDate: "17-Dec-2025",
      revenueAmount: "5,000.00",
      paymentMode: "UPI",
      transactionNo: "12512171147195511932202",
    },
     {
      id: 5,
      clinicName: "MADHAPUR",
      patientCode: "P113577",
      patientName: "vijay kumar I",
      invoiceNo: "TEL002312526",
      paymentDate: "16-Dec-2025",
      revenueAmount: "3,000.00",
      paymentMode: "UPI",
      transactionNo: "571619951287",
    },
    {
      id: 6,
      clinicName: "MAMBALAM",
      patientCode: "P113679",
      patientName: "Uma gopalkrishnan G",
      invoiceNo: "TAN004452526",
      paymentDate: "18-Dec-2025",
      revenueAmount: "40,000.00",
      paymentMode: "UPI",
      transactionNo: "553369234255",
    },
     {
      id: 7,
      clinicName: "ADYAR",
      patientCode: "P113609",
      patientName: "ravi shankar",
      invoiceNo: "TAN003222526",
      paymentDate: "17-Dec-2025",
      revenueAmount: "2,500.00",
      paymentMode: "UPI",
      transactionNo: "571788390677",
    },
     {
      id: 8,
      clinicName: "TRICHY",
      patientCode: "P113595",
      patientName: "Marri S",
      invoiceNo: "TAN002982526",
      paymentDate: "17-Dec-2025",
      revenueAmount: "25,000.00",
      paymentMode: "UPI",
      transactionNo: "195122365490",
    },
    {
      id: 9,
      clinicName: "ADYAR",
      patientCode: "P113521",
      patientName: "pughal ady",
      invoiceNo: "TAN001592526",
      paymentDate: "15-Dec-2025",
      revenueAmount: "2,000.00",
      paymentMode: "UPI",
      transactionNo: "534938066745",
    },
    {
      id: 10,
      clinicName: "ADYAR",
      patientCode: "P105305",
      patientName: "sindhu k adyar",
      invoiceNo: "TAN000832526",
      paymentDate: "11-Dec-2025",
      revenueAmount: "101.00",
      paymentMode: "UPI",
      transactionNo: "570918396580",
    },
  ];

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      clinicName: "",
      invoiceNo: "",
      fromDate: "",
      toDate: "",
    });
  };

  return (
    <div className="w-full p-6 space-y-6 min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 pb-2 border-b border-gray-200 dark:border-gray-800">
        <Settings className="w-5 h-5 text-red-500 animate-spin-slow" />
        <h1 className="text-lg font-bold text-red-500 uppercase tracking-wide">
          CREDIT CARD / DEBIT CARD AND UPI INVOICE REPORT
        </h1>
      </div>

      {/* Filters Section */}
      <Card className="border-border shadow-sm bg-card">
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            
            {/* Clinic Name */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-gray-700">Clinic Name</Label>
              <Select
                value={filters.clinicName}
                onValueChange={(val) => handleFilterChange("clinicName", val)}
              >
                <SelectTrigger className="h-9 border-gray-300 text-xs">
                  <SelectValue placeholder="-- Select Clinic --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dehradun">Dehradun</SelectItem>
                  <SelectItem value="lb nagar">LB Nagar</SelectItem>
                  <SelectItem value="madhapur">Madhapur</SelectItem>
                  <SelectItem value="mambalam">Mambalam</SelectItem>
                  <SelectItem value="adyar">Adyar</SelectItem>
                  <SelectItem value="trichy">Trichy</SelectItem>
                </SelectContent>
              </Select>
            </div>

             {/* Invoice No */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-gray-700">Invoice No</Label>
              <Input
                className="h-9 border-gray-300 text-xs"
                placeholder="Invoice No"
                value={filters.invoiceNo}
                onChange={(e) => handleFilterChange("invoiceNo", e.target.value)}
              />
            </div>

            {/* From Date */}
            <div className="space-y-2">
               {/* Label hidden to match alignment or could be Date Range */}
               <Input
                type="date"
                className="h-9 border-gray-300 text-xs"
                value={filters.fromDate}
                onChange={(e) => handleFilterChange("fromDate", e.target.value)}
              />
            </div>

            {/* To Date */}
            <div className="space-y-2">
               <Input
                type="date"
                className="h-9 border-gray-300 text-xs"
                value={filters.toDate}
                 onChange={(e) => handleFilterChange("toDate", e.target.value)}
              />
            </div>

             {/* Buttons */}
             <div className="flex gap-2">
                <Button className="h-9 px-4 bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold">
                    Search
                </Button>
                <Button 
                    variant="outline" 
                    className="h-9 px-4 bg-orange-600 hover:bg-orange-700 text-white border-orange-600 text-xs font-semibold"
                    onClick={clearFilters}
                >
                    Clear
                </Button>
             </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Count */}
       <div className="flex justify-end">
          <p className="text-sm font-semibold text-gray-600">Total : 1012</p>
       </div>

      {/* Table Section */}
      <Card className="border-border shadow-sm bg-card overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-lime-50">
                <TableRow>
                  <TableHead className="text-xs font-bold text-gray-700 whitespace-nowrap">Sr. No.</TableHead>
                  <TableHead className="text-xs font-bold text-gray-700 whitespace-nowrap">Clinic Name</TableHead>
                  <TableHead className="text-xs font-bold text-gray-700 whitespace-nowrap">Patient Code</TableHead>
                  <TableHead className="text-xs font-bold text-gray-700 whitespace-nowrap">Patient Name</TableHead>
                  <TableHead className="text-xs font-bold text-gray-700 whitespace-nowrap">Invoice No.</TableHead>
                  <TableHead className="text-xs font-bold text-gray-700 whitespace-nowrap">Payment Date</TableHead>
                  <TableHead className="text-xs font-bold text-gray-700 whitespace-nowrap">Revenue Amount</TableHead>
                  <TableHead className="text-xs font-bold text-gray-700 whitespace-nowrap">Payment Mode</TableHead>
                  <TableHead className="text-xs font-bold text-gray-700 whitespace-nowrap">Transaction No.</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="text-xs font-medium text-gray-900 border-r border-gray-100">{row.id}</TableCell>
                    <TableCell className="text-xs text-gray-600 border-r border-gray-100 uppercase">{row.clinicName}</TableCell>
                    <TableCell className="text-xs text-gray-600 border-r border-gray-100">{row.patientCode}</TableCell>
                    <TableCell className="text-xs text-gray-600 border-r border-gray-100 uppercase">{row.patientName}</TableCell>
                    <TableCell className="text-xs text-gray-600 border-r border-gray-100">{row.invoiceNo}</TableCell>
                    <TableCell className="text-xs text-gray-600 border-r border-gray-100">{row.paymentDate}</TableCell>
                    <TableCell className="text-xs text-gray-600 border-r border-gray-100">{row.revenueAmount}</TableCell>
                    <TableCell className="text-xs text-gray-600 border-r border-gray-100">{row.paymentMode}</TableCell>
                    <TableCell className="text-xs text-gray-600">{row.transactionNo}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
       {/* Export Button & Footer */}
       <div className="flex justify-start pt-2">
            <Button size="icon" className="bg-green-700 hover:bg-green-800 h-8 w-8 rounded">
                <FileSpreadsheet className="h-5 w-5 text-white" />
            </Button>
       </div>
    </div>
  );
}
