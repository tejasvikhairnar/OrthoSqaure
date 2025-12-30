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

export default function FinanceReconciliationPage() {
  const [filters, setFilters] = useState({
    clinicName: "",
    invoiceNo: "",
    fromDate: "2025-12-08",
    toDate: "2025-12-23",
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock Data
  const [data, setData] = useState([
    { id: 1, clinic: "Dehradun", pCode: "P113605", pName: "neha verma", invNo: "UTP003122526", date: "17-Dec-2025", rev: "32,000.00", disb: "0.00", lan: "", sub: "0.00", mode: "Shopse- Credit Card Bank" },
    { id: 2, clinic: "Secunderabad", pCode: "P113614", pName: "Nithin Javvaji", invNo: "TEL003352526", date: "17-Dec-2025", rev: "72,450.00", disb: "0.00", lan: "", sub: "0.00", mode: "Bajaj finance" },
    { id: 3, clinic: "Secunderabad", pCode: "P113614", pName: "Nithin Javvaji", invNo: "TEL003342526", date: "17-Dec-2025", rev: "31,050.00", disb: "0.00", lan: "", sub: "0.00", mode: "Bajaj finance" },
    { id: 4, clinic: "LB NAGAR", pCode: "P113583", pName: "adla srinivas reddy", invNo: "TEL003162526", date: "16-Dec-2025", rev: "1,00,000.00", disb: "0.00", lan: "", sub: "0.00", mode: "Shopse- Credit Card Bank" },
    { id: 5, clinic: "MADHAPUR", pCode: "P113577", pName: "vijay kumar l", invNo: "TEL002292526", date: "16-Dec-2025", rev: "45,000.00", disb: "0.00", lan: "", sub: "0.00", mode: "Shopse - Preapproved Debit Card + Cardless EMI" },
    { id: 6, clinic: "MADHAPUR", pCode: "P113282", pName: "sreya B", invNo: "TEL000562526", date: "17-Dec-2025", rev: "23,800.00", disb: "0.00", lan: "", sub: "0.00", mode: "Zeropay" },
    { id: 7, clinic: "MADHAPUR", pCode: "P113282", pName: "sreya B", invNo: "TEL000552526", date: "17-Dec-2025", rev: "10,200.00", disb: "0.00", lan: "", sub: "0.00", mode: "Zeropay" },
    { id: 8, clinic: "Toli Chowki", pCode: "P113174", pName: "syed obaid", invNo: "TEL000102526", date: "09-Dec-2025", rev: "11,400.00", disb: "0.00", lan: "", sub: "0.00", mode: "SaveIn" },
    { id: 9, clinic: "Annanagar", pCode: "P113906", pName: "RAJAM L", invNo: "TAN007932526", date: "22-Dec-2025", rev: "55,000.00", disb: "0.00", lan: "", sub: "0.00", mode: "SaveIn" },
    { id: 10, clinic: "Nanganallur", pCode: "P113801", pName: "KAVITHANJALI A", invNo: "TAN006432526", date: "21-Dec-2025", rev: "55,000.00", disb: "0.00", lan: "", sub: "0.00", mode: "SaveIn" },
    { id: 11, clinic: "Nanganallur", pCode: "P113802", pName: "Rakesh K", invNo: "TAN006432527", date: "22-Dec-2025", rev: "25,000.00", disb: "0.00", lan: "", sub: "0.00", mode: "SaveIn" },
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
  const filteredData = data.filter((item) => {
      const matchClinic = !filters.clinicName || item.clinic.toLowerCase().includes(filters.clinicName.toLowerCase());
      const matchInvoice = !filters.invoiceNo || item.invNo.toLowerCase().includes(filters.invoiceNo.toLowerCase());
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
        FINANCE RECONCILIATIONS
      </h1>

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
                <SelectItem value="secunderabad">Secunderabad</SelectItem>
                <SelectItem value="lb-nagar">LB Nagar</SelectItem>
                <SelectItem value="madhapur">Madhapur</SelectItem>
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
                  <TableHead className="text-xs font-bold text-gray-700 dark:text-gray-300 h-10 w-32"></TableHead> 
                  <TableHead className="text-xs font-bold text-gray-700 dark:text-gray-300 h-10">Clinic Name</TableHead>
                  <TableHead className="text-xs font-bold text-gray-700 dark:text-gray-300 h-10">Patient Code</TableHead>
                  <TableHead className="text-xs font-bold text-gray-700 dark:text-gray-300 h-10">Patient Name</TableHead>
                  <TableHead className="text-xs font-bold text-gray-700 dark:text-gray-300 h-10">Invoice No.</TableHead>
                  <TableHead className="text-xs font-bold text-gray-700 dark:text-gray-300 h-10">Payment Date</TableHead>
                  <TableHead className="text-xs font-bold text-gray-700 dark:text-gray-300 h-10">Revenue Amount</TableHead>
                  <TableHead className="text-xs font-bold text-gray-700 dark:text-gray-300 h-10">Disbursed amount</TableHead>
                  <TableHead className="text-xs font-bold text-gray-700 dark:text-gray-300 h-10">LAN</TableHead>
                  <TableHead className="text-xs font-bold text-gray-700 dark:text-gray-300 h-10">Subvention Rate</TableHead>
                  <TableHead className="text-xs font-bold text-gray-700 dark:text-gray-300 h-10">Payment Mode</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((row, index) => (
                    <TableRow key={row.id} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 text-xs">
                      <TableCell className="py-2 text-gray-600 dark:text-gray-300">{indexOfFirstItem + index + 1}</TableCell>
                      <TableCell className="py-2">
                        <Button
                            size="sm"
                            className="bg-medivardaan-blue hover:bg-[#155a75] text-white text-[10px] h-7 px-2 w-full rounded-sm"
                        >
                            Add Reconciliations
                        </Button>
                      </TableCell>
                      <TableCell className="py-2 text-gray-600 dark:text-gray-300">{row.clinic}</TableCell>
                      <TableCell className="py-2 text-gray-600 dark:text-gray-300">{row.pCode}</TableCell>
                      <TableCell className="py-2 text-gray-600 dark:text-gray-300 uppercase">{row.pName}</TableCell>
                      <TableCell className="py-2 text-gray-600 dark:text-gray-300">{row.invNo}</TableCell>
                      <TableCell className="py-2 text-gray-600 dark:text-gray-300">{row.date}</TableCell>
                      <TableCell className="py-2 text-gray-600 dark:text-gray-300 font-medium">{row.rev}</TableCell>
                      <TableCell className="py-2 text-gray-600 dark:text-gray-300">{row.disb}</TableCell>
                      <TableCell className="py-2 text-gray-600 dark:text-gray-300">{row.lan}</TableCell>
                      <TableCell className="py-2 text-gray-600 dark:text-gray-300">{row.sub}</TableCell>
                      <TableCell className="py-2 text-gray-600 dark:text-gray-300">{row.mode}</TableCell>
                    </TableRow>
                ))}
                 {currentItems.length === 0 && (
                  <TableRow>
                     <TableCell colSpan={12} className="text-center py-4 text-gray-500">No matching records found</TableCell>
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
