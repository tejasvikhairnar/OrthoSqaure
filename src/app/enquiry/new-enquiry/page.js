"use client";

import React, { useState, useEffect } from "react";
import { getLeads } from "@/api/client/leads";
import { Pagination } from "@/components/Pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { 
  Settings, 
  Eye, 
  Trash2, 
  CheckCircle, 
  Search, 
  User, 
  Phone, 
  Building2, 
  Calendar, 
  Plus 
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewLeadPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    name: "",
    mobileNo: "",
    clinic: "",
    fromDate: "",
    toDate: "",
  });

  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  // Fetch leads on component mount
  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async (searchFilters = filters) => {
    try {
      setIsLoading(true);
      // Remove empty filters
      const cleanFilters = Object.fromEntries(
        Object.entries(searchFilters).filter(([_, v]) => v !== "")
      );
      
      // Add pagination params
      const queryParams = {
        ...cleanFilters,
        PageNumber: 1, // Always fetch from page 1 initially
        PageSize: 1000, // Fetch large batch for client-side pagination
      };

      const data = await getLeads(queryParams);
      
      // Transform API data to match table structure
      const transformedLeads = Array.isArray(data) ? data.map((lead, index) => ({
        srNo: index + 1,
        leadNo: lead.enquiryNo || "-",
        name: `${lead.firstName || ""} ${lead.lastName || ""}`.trim() || "-",
        mobileNo: lead.mobile || "-",
        clinicName: lead.clinicName || "-",
        sourceName: lead.sourceName || "-",
        status: lead.status || "-",
        date: lead.enquiryDate ? new Date(lead.enquiryDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric"
        }) : "-",
        rawDate: lead.enquiryDate
      })) : [];

      setLeads(transformedLeads);
    } catch (error) {
      console.error("Failed to fetch leads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to page 1 on search
    fetchLeads(filters);
  };

  const handleAddNewLead = () => {
    router.push("/enquiry/add-enquiry-form");
  };

  // Client-side Pagination Logic
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = leads.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(leads.length / pageSize);

  const handlePageChangeWrapper = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full p-6 space-y-8 bg-gray-50/50 dark:bg-gray-950/50 min-h-screen">
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0f7396] to-[#0a5c7a] shadow-lg shadow-[#0f7396]/20 flex items-center justify-center text-white">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
              Lead Management
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage and track your enquiry leads
            </p>
          </div>
        </div>
        <Button
          onClick={handleAddNewLead}
          className="bg-[#0f7396] hover:bg-[#0a5c7a] text-white shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Lead
        </Button>
      </div>

      {/* Search Filters */}
      <Card className="border-none shadow-sm bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800">
        <CardHeader className="pb-4 border-b border-gray-100 dark:border-gray-800">
          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <Search className="w-4 h-4 text-[#0f7396]" />
            Search Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
            {/* Name */}
            <div className="lg:col-span-2 space-y-2">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Patient Name</label>
              <div className="relative group">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 group-hover:text-[#0f7396] transition-colors" />
                <Input
                  placeholder="Search name"
                  value={filters.name}
                  onChange={(e) => handleFilterChange("name", e.target.value)}
                  className="pl-9 border-gray-200 dark:border-gray-800 focus:border-[#0f7396] transition-all bg-gray-50/50 dark:bg-gray-900/50"
                />
              </div>
            </div>

            {/* Mobile */}
            <div className="lg:col-span-2 space-y-2">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Mobile No</label>
              <div className="relative group">
                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 group-hover:text-[#0f7396] transition-colors" />
                <Input
                  placeholder="Search mobile"
                  value={filters.mobileNo}
                  onChange={(e) => handleFilterChange("mobileNo", e.target.value)}
                  className="pl-9 border-gray-200 dark:border-gray-800 focus:border-[#0f7396] transition-all bg-gray-50/50 dark:bg-gray-900/50"
                />
              </div>
            </div>

            {/* Clinic */}
            <div className="lg:col-span-2 space-y-2">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Clinic</label>
              <Select value={filters.clinic} onValueChange={(value) => handleFilterChange("clinic", value)}>
                <SelectTrigger className="border-gray-200 dark:border-gray-800 focus:ring-[#0f7396] bg-gray-50/50 dark:bg-gray-900/50">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <SelectValue placeholder="All Clinics" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clinics</SelectItem>
                  <SelectItem value="panvel">Panvel</SelectItem>
                  <SelectItem value="pune">Pune</SelectItem>
                  <SelectItem value="mumbai">Mumbai</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range - From */}
            <div className="lg:col-span-2 space-y-2">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">From Date</label>
              <div className="relative group">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 group-hover:text-[#0f7396] transition-colors" />
                <Input
                  type="date"
                  value={filters.fromDate}
                  onChange={(e) => handleFilterChange("fromDate", e.target.value)}
                  className="pl-9 border-gray-200 dark:border-gray-800 focus:border-[#0f7396] transition-all bg-gray-50/50 dark:bg-gray-900/50"
                />
              </div>
            </div>

            {/* Date Range - To */}
            <div className="lg:col-span-2 space-y-2">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">To Date</label>
              <div className="relative group">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 group-hover:text-[#0f7396] transition-colors" />
                <Input
                  type="date"
                  value={filters.toDate}
                  onChange={(e) => handleFilterChange("toDate", e.target.value)}
                  className="pl-9 border-gray-200 dark:border-gray-800 focus:border-[#0f7396] transition-all bg-gray-50/50 dark:bg-gray-900/50"
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="lg:col-span-2">
              <Button
                onClick={handleSearch}
                className="w-full bg-[#0f7396] hover:bg-[#0a5c7a] text-white shadow-sm transition-all"
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card className="border-none shadow-sm bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800">
        <CardContent className="p-0">
          <div className="rounded-lg overflow-hidden border border-gray-100 dark:border-gray-800">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#0f7396]/5 hover:bg-[#0f7396]/10 border-b border-gray-200 dark:border-gray-800">
                  <TableHead className="font-semibold text-[#0f7396] py-3">Sr. No.</TableHead>
                  <TableHead className="font-semibold text-[#0f7396]">Lead No</TableHead>
                  <TableHead className="font-semibold text-[#0f7396]">Name</TableHead>
                  <TableHead className="font-semibold text-[#0f7396]">Mobile No</TableHead>
                  <TableHead className="font-semibold text-[#0f7396]">Clinic Name</TableHead>
                  <TableHead className="font-semibold text-[#0f7396]">Source Name</TableHead>
                  <TableHead className="font-semibold text-[#0f7396]">Status</TableHead>
                  <TableHead className="font-semibold text-[#0f7396]">Date</TableHead>
                  <TableHead className="font-semibold text-[#0f7396] text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
                         <div className="w-6 h-6 border-2 border-[#0f7396] border-t-transparent rounded-full animate-spin"></div>
                         Loading leads...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                leads.length > 0 ? (
                  currentItems.map((lead, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0"
                  >
                    <TableCell className="font-medium text-gray-700 dark:text-gray-300">{lead.srNo}</TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">{lead.leadNo}</TableCell>
                    <TableCell className="font-medium text-gray-900 dark:text-gray-100">{lead.name}</TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">{lead.mobileNo}</TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                        {lead.clinicName}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">{lead.sourceName}</TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">{lead.status}</TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">{lead.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        <button
                          className="p-1.5 hover:bg-green-50 text-green-600 rounded-md transition-colors"
                          title="Approve"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-md transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1.5 hover:bg-red-50 text-red-600 rounded-md transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="h-32 text-center text-gray-500">
                     <div className="flex flex-col items-center justify-center gap-2">
                       <Search className="w-8 h-8 text-gray-300" />
                       <p>No leads found matching your criteria.</p>
                     </div>
                  </TableCell>
                </TableRow>
              )
            )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination Controls */}
      {!isLoading && leads.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChangeWrapper}
        />
      )}
    </div>
  );
}
