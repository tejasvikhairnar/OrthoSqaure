"use client";

import React, { useState } from "react";
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
import { FileSpreadsheet } from "lucide-react";
import CustomPagination from "@/components/ui/custom-pagination";

export default function OnlinePaymentInvoicePage() {
  const [filters, setFilters] = useState({
    clinicName: "",
    invoiceNo: "",
    fromDate: "2025-12-07",
    toDate: "2025-12-22",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock Data matching the screenshot
  const [mockData, setMockData] = useState([
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
    {
        id: 11,
        clinicName: "ADYAR",
        patientCode: "P105306",
        patientName: "Another Patient",
        invoiceNo: "TAN000832527",
        paymentDate: "11-Dec-2025",
        revenueAmount: "100.00",
        paymentMode: "UPI",
        transactionNo: "570918396581",
    }
  ]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClear = () => {
    setFilters({
      clinicName: "",
      invoiceNo: "",
      fromDate: "",
      toDate: "",
    });
  };

  // Filter Data
  const filteredData = mockData.filter((item) => {
      const matchClinic = !filters.clinicName || item.clinicName.toLowerCase().includes(filters.clinicName.toLowerCase());
      const matchInvoice = !filters.invoiceNo || item.invoiceNo.toLowerCase().includes(filters.invoiceNo.toLowerCase());
      return matchClinic && matchInvoice;
  });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="w-full p-4 space-y-6 min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <h1 className="text-xl font-bold text-medivardaan-blue uppercase tracking-wide">
        CREDIT CARD / DEBIT CARD AND UPI INVOICE REPORT
      </h1>

      {/* Filters Section */}
      {/* Filters Section */}
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
          {/* Clinic Name */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Clinic Name</Label>
            <Select
              value={filters.clinicName}
              onValueChange={(val) => handleFilterChange("clinicName", val)}
            >
              <SelectTrigger className="h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 w-full">
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
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Invoice No</Label>
            <Input
              className="h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 w-full"
              placeholder="Invoice No"
              value={filters.invoiceNo}
              onChange={(e) => handleFilterChange("invoiceNo", e.target.value)}
            />
          </div>

          {/* From Date */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">From Date</Label>
            <Input
              type="date"
              className="h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 w-full"
              value={filters.fromDate}
              onChange={(e) => handleFilterChange("fromDate", e.target.value)}
            />
          </div>

          {/* To Date */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">To Date</Label>
            <Input
              type="date"
              className="h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 w-full"
              value={filters.toDate}
              onChange={(e) => handleFilterChange("toDate", e.target.value)}
            />
          </div>
        </div>

        {/* Buttons Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
            <div className="flex gap-2 w-full md:w-auto">
                <Button
                    size="sm"
                    className="flex-none bg-medivardaan-blue hover:bg-medivardaan-blue-dark text-white h-10 px-6 shadow-sm"
                >
                    Search
                </Button>
                <Button
                    size="sm"
                    onClick={handleClear}
                    variant="outline"
                    className="flex-none border-gray-300 hover:bg-gray-100 h-10 px-6"
                >
                    Clear
                </Button>
            </div>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total : {filteredData.length}</span>
      </div>

      {/* Table Section */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-sm overflow-hidden bg-white dark:bg-gray-900 shadow-sm">
        <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-medivardaan-teal/10 dark:bg-accent text-foreground font-semibold border-b border-border">
                <TableRow className="border-b border-gray-100 dark:border-gray-700 hover:bg-[#E8F8F5] dark:hover:bg-gray-800">
                  <TableHead className="text-xs font-bold text-gray-700 dark:text-gray-300 h-10 w-12">Sr. No.</TableHead>
                  <TableHead className="text-xs font-bold text-gray-700 dark:text-gray-300 h-10">Clinic Name</TableHead>
                  <TableHead className="text-xs font-bold text-gray-700 dark:text-gray-300 h-10">Patient Code</TableHead>
                  <TableHead className="text-xs font-bold text-gray-700 dark:text-gray-300 h-10">Patient Name</TableHead>
                  <TableHead className="text-xs font-bold text-gray-700 dark:text-gray-300 h-10">Invoice No.</TableHead>
                  <TableHead className="text-xs font-bold text-gray-700 dark:text-gray-300 h-10">Payment Date</TableHead>
                  <TableHead className="text-xs font-bold text-gray-700 dark:text-gray-300 h-10">Revenue Amount</TableHead>
                  <TableHead className="text-xs font-bold text-gray-700 dark:text-gray-300 h-10">Payment Mode</TableHead>
                  <TableHead className="text-xs font-bold text-gray-700 dark:text-gray-300 h-10">Transaction No.</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((row, index) => (
                    <TableRow key={row.id} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 text-xs">
                      <TableCell className="py-2 text-gray-600 dark:text-gray-300">{indexOfFirstItem + index + 1}</TableCell>
                      <TableCell className="py-2 text-gray-600 dark:text-gray-300 uppercase">{row.clinicName}</TableCell>
                      <TableCell className="py-2 text-gray-600 dark:text-gray-300">{row.patientCode}</TableCell>
                      <TableCell className="py-2 text-gray-600 dark:text-gray-300 uppercase">{row.patientName}</TableCell>
                      <TableCell className="py-2 text-gray-600 dark:text-gray-300">{row.invoiceNo}</TableCell>
                      <TableCell className="py-2 text-gray-600 dark:text-gray-300">{row.paymentDate}</TableCell>
                      <TableCell className="py-2 text-gray-600 dark:text-gray-300">{row.revenueAmount}</TableCell>
                      <TableCell className="py-2 text-gray-600 dark:text-gray-300">{row.paymentMode}</TableCell>
                      <TableCell className="py-2 text-gray-600 dark:text-gray-300">{row.transactionNo}</TableCell>
                    </TableRow>
                ))}
                 {currentItems.length === 0 && (
                  <TableRow>
                     <TableCell colSpan={9} className="text-center py-4 text-gray-500">No matching records found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
        </div>
      </div>
      
       {/* Footer / Pagination */}
       <div className="flex justify-between items-center pt-2">
            <Button variant="outline" size="icon" className="h-8 w-8 text-green-700 border-green-700 hover:bg-green-50">
                <FileSpreadsheet className="h-5 w-5" />
            </Button>

            <CustomPagination 
                totalItems={filteredData.length} 
                itemsPerPage={itemsPerPage} 
                currentPage={currentPage} 
                onPageChange={setCurrentPage} 
            />
       </div>
    </div>
  );
}
