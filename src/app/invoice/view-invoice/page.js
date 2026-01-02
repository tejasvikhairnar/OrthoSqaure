"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Settings, Search, RefreshCw, PenSquare, Trash2, ArrowUpDown } from "lucide-react"; 
import CustomPagination from "@/components/ui/custom-pagination";
import InvoiceStats from "@/components/invoice/InvoiceStats";
import ActionDropdown from "@/components/invoice/ActionDropdown";

// Hooks
import { useInvoices } from "@/hooks/useInvoices";

export default function ViewInvoicePage() {
  const [filters, setFilters] = useState({
    search: "",
    fromDate: "",
    toDate: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch Data
  const { data: invoices = [], isLoading, refetch } = useInvoices(filters);

  const handleSearchChange = (e) => {
      setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleDateChange = (field, value) => {
      setFilters(prev => ({ ...prev, [field]: value }));
  };


  const handleSearch = () => {
    refetch();
    setCurrentPage(1); 
  };
  
    // Filter locally based on search term for now (since API is mock)
  const filteredInvoices = invoices.filter(inv => {
      if (!filters.search) return true;
      const searchLower = filters.search.toLowerCase();
      return (
          inv.invoiceNo.toLowerCase().includes(searchLower) ||
          inv.patientName.toLowerCase().includes(searchLower) ||
          inv.clinicName.toLowerCase().includes(searchLower)
      );
  });


  // Client-side pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInvoices.slice(indexOfFirstItem, indexOfLastItem);

  // Helper for status badge
  const getStatusBadge = (status = "Paid") => {
      const styles = {
          Paid: "bg-[#8BC34A] hover:bg-[#7CB342] text-white",
          Unpaid: "bg-[#00BCD4] hover:bg-[#00ACC1] text-white", 
          Partial: "bg-[#FFC107] hover:bg-[#FFB300] text-white",
          Overdue: "bg-[#E53935] hover:bg-[#D32F2F] text-white",
      };
      
      // Randomly assign status for mock data if needed or use existing logic
       const mockStatus = status || ["Paid", "Unpaid", "Partial", "Overdue"][Math.floor(Math.random() * 4)];

      return (
          <Badge className={`rounded-full px-4 py-1 font-normal text-[11px] ${styles[mockStatus] || styles.Paid}`}>
              {mockStatus}
          </Badge>
      );
  };


  return (
    <div className="w-full p-6 space-y-6 min-h-screen bg-gray-50/50">
      {/* Header */}
      <h1 className="text-2xl font-bold text-[#1a237e] uppercase tracking-wide mb-6">
          View Invoices
      </h1>

      {/* Stats Section */}
      <InvoiceStats />

      {/* Filters & Controls Section */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between pt-4">
        <div className="flex flex-1 gap-2 w-full md:w-auto">
            <div className="relative max-w-sm w-full">
                <Input 
                   placeholder="Search" 
                   className="pl-3 h-9 bg-white border-gray-300"
                   value={filters.search}
                   onChange={handleSearchChange}
                />
            </div>
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 whitespace-nowrap">From</span>
                <Input 
                    type="date" 
                    className="h-9 w-[130px] bg-gray-100 border-none"
                    value={filters.fromDate}
                    onChange={(e) => handleDateChange("fromDate", e.target.value)}
                />
            </div>
             <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 whitespace-nowrap">To</span>
                <Input 
                    type="date" 
                    className="h-9 w-[130px] bg-gray-100 border-none" 
                    value={filters.toDate}
                    onChange={(e) => handleDateChange("toDate", e.target.value)}
                />
            </div>
             <Button 
                onClick={handleSearch}
                className="bg-[#5C9CEC] hover:bg-[#4a8cdb] text-white h-9 px-6 rounded shadow-sm"
             >
                Submit
             </Button>
        </div>

        <div className="flex items-center gap-2">
            <Button className="bg-[#4a8cdb] hover:bg-[#3b7bc9] text-white h-9 gap-1">
                <span className="text-lg leading-none">+</span> New invoice
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9 bg-white border-gray-300 text-gray-500">
                <span className="sr-only">Export</span>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 1L10 2L5 2L5 1L10 1ZM11 1L14 1C14.2761 1 14.5 1.22386 14.5 1.5L14.5 13.5C14.5 13.7761 14.2761 14 14 14L1 14C0.723858 14 0.5 13.7761 0.5 13.5L0.5 1.5C0.5 1.22386 0.723858 1 1 1L4 1C4 0.447715 4.44772 0 5 0L10 0C10.5523 0 11 0.447715 11 1ZM1.5 2L1.5 13L13.5 13L13.5 2L11 2L11 2.5C11 2.77614 10.7761 3 10.5 3L4.5 3C4.22386 3 4 2.77614 4 2.5L4 2L1.5 2ZM8.14645 5.14645C8.34171 4.95118 8.65829 4.95118 8.85355 5.14645L10.8536 7.14645C11.0488 7.34171 11.0488 7.65829 10.8536 7.85355L8.85355 9.85355C8.65829 10.0488 8.34171 10.0488 8.14645 9.85355C7.95118 9.65829 7.95118 9.34171 8.14645 9.14645L9.29289 8L4.5 8C4.22386 8 4 7.77614 4 7.5C4 7.22386 4.22386 7 4.5 7L9.29289 7L8.14645 5.85355C7.95118 5.65829 7.95118 5.34171 8.14645 5.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9 bg-white border-gray-300 text-gray-500">
                <Settings className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9 bg-white border-gray-300 text-gray-500">
                <RefreshCw className="h-4 w-4" />
            </Button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded shadow-sm border border-gray-100">
          <Table>
            <TableHeader className="bg-white">
              <TableRow className="border-b border-gray-100 hover:bg-transparent">
                <TableHead className="w-[100px] h-10 text-xs font-bold text-gray-500 uppercase tracking-wider">Status <ArrowUpDown className="inline h-3 w-3 ml-1" /></TableHead>
                <TableHead className="h-10 text-xs font-bold text-gray-500 uppercase tracking-wider">Type <ArrowUpDown className="inline h-3 w-3 ml-1" /></TableHead>
                <TableHead className="h-10 text-xs font-bold text-gray-500 uppercase tracking-wider">Invoice #</TableHead>
                <TableHead className="h-10 text-xs font-bold text-gray-500 uppercase tracking-wider">Created</TableHead>
                <TableHead className="h-10 text-xs font-bold text-gray-500 uppercase tracking-wider">Expires</TableHead>
                <TableHead className="h-10 text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name</TableHead>
                <TableHead className="h-10 text-xs font-bold text-gray-500 uppercase tracking-wider">Company</TableHead>
                <TableHead className="h-10 text-xs font-bold text-gray-500 uppercase tracking-wider">Total</TableHead>
                <TableHead className="h-10 text-xs font-bold text-gray-500 uppercase tracking-wider">Payment Date</TableHead>
                <TableHead className="h-10 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">
                    <div className="flex border border-red-300 rounded overflow-hidden w-20 mx-auto">
                        <span className="w-1/2 text-[10px] text-red-500 py-0.5 border-r border-red-300">SENT</span>
                        <span className="w-1/2 text-[10px] text-gray-500 py-0.5">VIEW</span>
                    </div>
                </TableHead>
                <TableHead className="h-10 text-xs font-bold text-gray-500 uppercase tracking-wider">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.length > 0 ? (
                currentItems.map((inv, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <TableRow key={inv.invoiceID || index} className={`border-b border-gray-50 text-xs ${isEven ? 'bg-white' : 'bg-[#E3F2FD]/30'} hover:bg-gray-50`}>
                      <TableCell className="py-3">
                        {getStatusBadge(inv.status)}
                      </TableCell>
                      <TableCell className="py-3 text-gray-500">Services</TableCell>
                      <TableCell className="py-3 font-semibold text-gray-700">{inv.invoiceNo}</TableCell>
                      <TableCell className="py-3 text-gray-500">2017-06-05</TableCell>
                      <TableCell className="py-3 text-gray-500">2017-06-19</TableCell>
                      <TableCell className="py-3 font-medium text-[#4a8cdb]">{inv.patientName || "Sam Engel"}</TableCell>
                      <TableCell className="py-3 text-gray-500">{inv.clinicName || "-"}</TableCell>
                      <TableCell className="py-3 text-gray-600 font-medium">${Number(inv.grandTotal).toFixed(2)}</TableCell>
                      <TableCell className="py-3 text-gray-500">2017-06-06</TableCell>
                      <TableCell className="py-3 text-center">
                         <div className="flex justify-center gap-4 text-gray-500">
                             <span>{Math.floor(Math.random() * 2)}</span>
                             <span>{Math.floor(Math.random() * 5)}</span>
                         </div>
                      </TableCell>
                      <TableCell className="py-3">
                         <div className="flex items-center gap-1">
                             <ActionDropdown invoice={inv} />
                             <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 opacity-0 group-hover:opacity-100">
                                 <PenSquare className="h-3.5 w-3.5" />
                             </Button>
                         </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                   <TableCell colSpan={11} className="text-center py-10 text-gray-500">
                        No Invoices Found
                   </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
           {/* Pagination */}
           <div className="p-4 border-t border-gray-200">
                <CustomPagination 
                  totalItems={filteredInvoices.length} 
                  itemsPerPage={itemsPerPage} 
                  currentPage={currentPage} 
                  onPageChange={setCurrentPage} 
                />
            </div>
      </div>
    </div>
  );
}
