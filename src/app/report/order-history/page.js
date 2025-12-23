"use client";

import React, { useState } from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  TableRow,
} from "@/components/ui/table";

export default function OrderHistoryPage() {
  const [clinic, setClinic] = useState("");
  const [doctor, setDoctor] = useState("");

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-4">
        <Settings className="w-5 h-5 text-red-500 animate-spin-slow" />
        <h1 className="text-lg font-bold text-red-500 uppercase tracking-wide">
          ORDER HISTORY
        </h1>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select value={clinic} onValueChange={setClinic}>
            <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700">
              <SelectValue placeholder="-- Select Clinic --" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="clinic1">Clinic 1</SelectItem>
              <SelectItem value="clinic2">Clinic 2</SelectItem>
            </SelectContent>
          </Select>

          <Select value={doctor} onValueChange={setDoctor}>
            <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700">
              <SelectValue placeholder="-- Select Doctor --" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="doc1">Dr. Smith</SelectItem>
              <SelectItem value="doc2">Dr. Jones</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Button className="bg-[#D35400] hover:bg-[#A04000] text-white px-8 font-medium shadow-sm transition-all">
            Search
          </Button>
        </div>
      </div>

      {/* Table Area (Placeholder) */}
      <div className="border border-green-100 rounded-md overflow-hidden">
         <Table>
            <TableBody>
                <TableRow className="hover:bg-transparent">
                    <TableCell className="text-gray-500 dark:text-gray-400 h-24 align-middle pl-4 font-medium border-l-4 border-l-green-400 bg-green-50/30 dark:bg-green-900/10">
                        No Record Available
                    </TableCell>
                </TableRow>
            </TableBody>
         </Table>
      </div>
    </div>
  );
}
