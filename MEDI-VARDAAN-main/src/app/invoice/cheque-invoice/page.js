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
import { Loader2, Settings, FileText, Search, X } from "lucide-react";

// Hooks
import { useChequeDetails } from "@/hooks/useInvoices";
import { useDoctors } from "@/hooks/useDoctors";

export default function ChequeInvoicePage() {
  const [filters, setFilters] = useState({
    clinicName: "",
    doctorName: "",
    patientName: "",
    mobileNo: "",
    fromPaymentDate: new Date().toISOString().split("T")[0],
    toPaymentDate: new Date().toISOString().split("T")[0],
  });

  // Fetch Data
  const { data: cheques = [], isLoading, error, refetch } = useChequeDetails(filters);
  const { data: doctors = [] } = useDoctors();

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    refetch();
  };

  const handleClear = () => {
    setFilters({
      clinicName: "",
      doctorName: "",
      patientName: "",
      mobileNo: "",
      fromPaymentDate: "",
      toPaymentDate: "",
    });
  };

  return (
    <div className="w-full p-4 space-y-6 min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 pb-2 border-b border-gray-200 dark:border-gray-800">
        <div className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20">
             <Settings className="w-5 h-5 text-red-600 dark:text-red-400 animate-spin-slow" />
        </div>
        <h1 className="text-xl font-bold text-red-600 dark:text-red-400 tracking-tight uppercase">
          CHEQUE INVOICE
        </h1>
      </div>

      {/* Filters Section */}
      <Card className="border-border shadow-sm bg-card">
        <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Clinic Name */}
                <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground/80">Clinic Name</Label>
                <Select
                    value={filters.clinicName}
                    onValueChange={(val) => handleFilterChange("clinicName", val)}
                >
                    <SelectTrigger className="h-10 bg-background border-input">
                    <SelectValue placeholder="-- Select Clinic --" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="panvel">Panvel</SelectItem>
                    <SelectItem value="pune">Pune</SelectItem>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="nashik">Nashik</SelectItem>
                    <SelectItem value="dwarka">Dwarka</SelectItem>
                    <SelectItem value="vile-parle">Vile-Parle East</SelectItem>
                    <SelectItem value="borivali">Borivali</SelectItem>
                    <SelectItem value="kalyan-nagar">Kalyan Nagar</SelectItem>
                    </SelectContent>
                </Select>
                </div>

                {/* Doctor Name */}
                <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground/80">Doctor Name</Label>
                <Select
                    value={filters.doctorName}
                    onValueChange={(val) => handleFilterChange("doctorName", val)}
                >
                    <SelectTrigger className="h-10 bg-background border-input">
                    <SelectValue placeholder="-- Select Doctor --" />
                    </SelectTrigger>
                    <SelectContent>
                    {doctors.map((doc) => (
                        <SelectItem key={doc.doctorID} value={doc.name}>
                        {doc.name}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                </div>

                {/* Patient Name */}
                <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground/80">Patient Name</Label>
                <Input
                    className="h-10 bg-background border-input"
                    placeholder="Patient Name"
                    value={filters.patientName}
                    onChange={(e) => handleFilterChange("patientName", e.target.value)}
                />
                </div>

                 {/* Mobile No */}
                <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground/80">Mobile No</Label>
                <Input
                    className="h-10 bg-background border-input"
                    placeholder="Mobile No"
                    value={filters.mobileNo}
                    onChange={(e) => handleFilterChange("mobileNo", e.target.value)}
                />
                </div>
            </div>

            {/* Second Row Filters & Buttons */}
            <div className="flex flex-col md:flex-row gap-6 items-end justify-between">
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    <div className="space-y-2 w-full md:w-48">
                         <Input
                            type="date"
                            className="h-10 bg-background border-input"
                            value={filters.fromPaymentDate}
                            placeholder="From Payment Date"
                            onChange={(e) => handleFilterChange("fromPaymentDate", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2 w-full md:w-48">
                        <Input
                            type="date"
                            className="h-10 bg-background border-input"
                            value={filters.toPaymentDate}
                            placeholder="To Payment Date"
                            onChange={(e) => handleFilterChange("toPaymentDate", e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <Button
                    onClick={handleSearch}
                    className="bg-[#D35400] hover:bg-[#A04000] text-white font-semibold h-10 px-8 shadow-sm rounded"
                    >
                    Search
                    </Button>
                </div>
            </div>
        </CardContent>
      </Card>

      {/* Table Section */}
      <Card className="border-border shadow-sm bg-card overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            {isLoading ? (
               <div className="flex justify-center items-center py-20 text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin mr-3" />
                  <span>Loading data...</span>
               </div>
            ) : (
            <Table>
              <TableHeader className="bg-[#E8F8F5] dark:bg-green-900/20">
                <TableRow className="border-b border-border hover:bg-transparent">
                  <TableHead className="font-bold text-gray-800 dark:text-gray-200 text-xs h-10">Sr. No.</TableHead>
                  <TableHead className="font-bold text-gray-800 dark:text-gray-200 text-xs h-10 w-24">Action</TableHead>
                  <TableHead className="font-bold text-gray-800 dark:text-gray-200 text-xs h-10">Invoice No.</TableHead>
                  <TableHead className="font-bold text-gray-800 dark:text-gray-200 text-xs h-10">Clinic Name</TableHead>
                  <TableHead className="font-bold text-gray-800 dark:text-gray-200 text-xs h-10">Patient Name</TableHead>
                  <TableHead className="font-bold text-gray-800 dark:text-gray-200 text-xs h-10">Bank Name</TableHead>
                  <TableHead className="font-bold text-gray-800 dark:text-gray-200 text-xs h-10">Branch Name</TableHead>
                  <TableHead className="font-bold text-gray-800 dark:text-gray-200 text-xs h-10">IFSC</TableHead>
                  <TableHead className="font-bold text-gray-800 dark:text-gray-200 text-xs h-10">Cheque No</TableHead>
                  <TableHead className="font-bold text-gray-800 dark:text-gray-200 text-xs h-10">Date</TableHead>
                  <TableHead className="font-bold text-gray-800 dark:text-gray-200 text-xs h-10">Amount</TableHead>
                  <TableHead className="font-bold text-gray-800 dark:text-gray-200 text-xs h-10">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cheques.length > 0 ? (
                  cheques.map((item, index) => (
                    <TableRow key={index} className="border-b border-border hover:bg-muted/30 transition-colors h-12">
                      <TableCell className="text-xs font-medium text-muted-foreground">{index + 1}</TableCell>
                      <TableCell>
                          <Button
                            size="sm"
                            className={`h-7 text-[10px] w-16 px-0 ${
                                item.status === 'Pending'
                                ? 'bg-[#1F618D] hover:bg-[#154360]' // Blue
                                : 'bg-[#52BE80] hover:bg-[#27AE60]' // Green
                            } text-white rounded`}
                          >
                            Select
                          </Button>
                      </TableCell>
                      <TableCell className="text-xs font-medium">{item.invoiceNo}</TableCell>
                      <TableCell className="text-xs">{item.clinicName}</TableCell>
                      <TableCell className="text-xs font-medium">{item.patientName}</TableCell>
                      <TableCell className="text-xs">{item.bankName}</TableCell>
                      <TableCell className="text-xs">{item.branchName}</TableCell>
                      <TableCell className="text-xs">{item.ifsc}</TableCell>
                      <TableCell className="text-xs">{item.chequeNo}</TableCell>
                      <TableCell className="text-xs">{item.date}</TableCell>
                      <TableCell className="text-xs">{Number(item.amount).toFixed(2)}</TableCell>
                      <TableCell className="text-xs">{item.status}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                     <TableCell colSpan={12} className="text-center py-16 text-muted-foreground bg-muted/5">
                        <div className="flex flex-col items-center justify-center gap-2">
                            <FileText className="w-10 h-10 text-muted-foreground/50" />
                            <p>No cheque details found.</p>
                        </div>
                     </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
