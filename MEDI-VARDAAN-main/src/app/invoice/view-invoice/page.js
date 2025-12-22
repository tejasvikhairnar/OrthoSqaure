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
import { useInvoices } from "@/hooks/useInvoices";
import { useDoctors } from "@/hooks/useDoctors";

export default function ViewInvoicePage() {
  const [filters, setFilters] = useState({
    clinicName: "",
    doctorName: "",
    patientName: "",
    invoiceNo: "",
    fromDate: new Date().toISOString().split("T")[0], // Default to today
    toDate: new Date().toISOString().split("T")[0],   // Default to today
  });

  // Fetch Data
  const { data: invoices = [], isLoading, error, refetch } = useInvoices(filters);
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
      invoiceNo: "",
      fromDate: "",
      toDate: "",
    });
  };



  return (
    <div className="w-full p-4 space-y-6 min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 pb-2 border-b border-gray-200 dark:border-gray-800">
        <div className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20">
             <FileText className="w-5 h-5 text-red-600 dark:text-red-400" />
        </div>
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
          View Invoices
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
                    <SelectValue placeholder="All Clinics" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="panvel">Panvel</SelectItem>
                    <SelectItem value="pune">Pune</SelectItem>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="nashik">Nashik</SelectItem>
                    <SelectItem value="dwarka">Dwarka</SelectItem>
                    <SelectItem value="vile-parle">Vile-Parle East</SelectItem>
                    <SelectItem value="kharghar">Kharghar</SelectItem>
                    <SelectItem value="lajpat-nagar">Lajpat Nagar</SelectItem>
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
                    <SelectValue placeholder="All Doctors" />
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
                    placeholder="Search by name..."
                    value={filters.patientName}
                    onChange={(e) => handleFilterChange("patientName", e.target.value)}
                />
                </div>

                {/* Invoice No */}
                <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground/80">Invoice No</Label>
                <Input
                    className="h-10 bg-background border-input"
                    placeholder="INV-001..."
                    value={filters.invoiceNo}
                    onChange={(e) => handleFilterChange("invoiceNo", e.target.value)}
                />
                </div>
            </div>

            {/* Second Row Filters & Buttons */}
            <div className="flex flex-col md:flex-row gap-6 items-end justify-between">
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    <div className="space-y-2 w-full md:w-48">
                        <Label className="text-sm font-medium text-foreground/80">From Date</Label>
                        <Input
                            type="date"
                            className="h-10 bg-background border-input"
                            value={filters.fromDate}
                            onChange={(e) => handleFilterChange("fromDate", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2 w-full md:w-48">
                        <Label className="text-sm font-medium text-foreground/80">To Date</Label>
                        <Input
                            type="date"
                            className="h-10 bg-background border-input"
                            value={filters.toDate}
                            onChange={(e) => handleFilterChange("toDate", e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <Button
                    onClick={handleSearch}
                    className="flex-1 md:flex-none bg-primary hover:bg-primary/90 text-primary-foreground h-10 px-6 shadow-sm"
                    >
                    <Search className="w-4 h-4 mr-2" />
                    Search
                    </Button>
                    <Button
                    onClick={handleClear}
                    variant="outline"
                    className="flex-1 md:flex-none border-input hover:bg-accent hover:text-accent-foreground h-10 px-6"
                    >
                    <X className="w-4 h-4 mr-2" />
                    Clear
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
                  <span>Loading invoices...</span>
               </div>
            ) : (
            <Table>
              <TableHeader className="bg-muted/50 dark:bg-muted/10">
                <TableRow className="border-b border-border hover:bg-transparent">
                  <TableHead className="font-semibold text-foreground/80 h-12">Sr. No.</TableHead>
                  <TableHead className="font-semibold text-foreground/80 h-12">Invoice No.</TableHead>
                  <TableHead className="font-semibold text-foreground/80 h-12">Clinic</TableHead>
                  <TableHead className="font-semibold text-foreground/80 h-12">Pt. Code</TableHead>
                  <TableHead className="font-semibold text-foreground/80 h-12">Patient Name</TableHead>
                  <TableHead className="font-semibold text-foreground/80 h-12">Mobile</TableHead>
                  <TableHead className="font-semibold text-foreground/80 h-12 text-right">Total</TableHead>
                  <TableHead className="font-semibold text-foreground/80 h-12 text-right">Paid</TableHead>
                  <TableHead className="font-semibold text-foreground/80 h-12 text-right">Pending</TableHead>
                  <TableHead className="font-semibold text-foreground/80 h-12 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.length > 0 ? (
                  invoices.map((inv, index) => (
                    <TableRow key={inv.invoiceID || index} className="border-b border-border hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium text-muted-foreground">{index + 1}</TableCell>
                      <TableCell className="font-medium text-primary cursor-pointer hover:underline">{inv.invoiceNo}</TableCell>
                      <TableCell>{inv.clinicName}</TableCell>
                      <TableCell className="text-xs font-mono text-muted-foreground">{inv.patientCode}</TableCell>
                      <TableCell className="font-medium">{inv.patientName}</TableCell>
                      <TableCell>{inv.mobileNo}</TableCell>
                      <TableCell className="text-right font-medium">₹{Number(inv.grandTotal).toLocaleString('en-IN')}</TableCell>
                      <TableCell className="text-right text-green-600 dark:text-green-400">₹{Number(inv.paidAmount).toLocaleString('en-IN')}</TableCell>
                      <TableCell className="text-right text-orange-600 dark:text-orange-400">₹{Number(inv.pendingAmount || 0).toLocaleString('en-IN')}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 text-xs hover:bg-primary hover:text-primary-foreground border-primary/20 text-primary"
                        >
                          Print
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                     <TableCell colSpan={10} className="text-center py-16 text-muted-foreground bg-muted/5">
                        <div className="flex flex-col items-center justify-center gap-2">
                            <Search className="w-10 h-10 text-muted-foreground/50" />
                            <p>No invoices found matching your filters.</p>
                            <Button variant="link" onClick={handleClear} className="text-primary">Clear Filters</Button>
                        </div>
                     </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            )}
          </div>
          
          {/* Pagination Mockup */}
          {invoices.length > 0 && (
              <div className="flex items-center justify-end p-4 border-t border-border gap-2">
                 <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
                    &lt;
                 </Button>
                 <Button variant="secondary" size="sm" className="h-8 w-8 p-0 bg-primary/10 text-primary border-primary/20">
                    1
                 </Button>
                 <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    2
                 </Button>
                 <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    3
                 </Button>
                 <span className="text-muted-foreground text-xs mx-1">...</span>
                 <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    10
                 </Button>
                 <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    &gt;
                 </Button>
              </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
