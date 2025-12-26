"use client";

import React, { useState } from "react";
import { Settings, CheckCircle, Trash2 } from "lucide-react";
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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LabServiceMapping() {
  const [workType, setWorkType] = useState("");

  // Mock data for Lab Service Mapping
  const tableData = [
    { id: 1, labName: "Flexismile", typeOfWork: "Essix Retainer", amount: "300.00" },
    { id: 2, labName: "Flexismile", typeOfWork: "Aligner", amount: "600.00" },
    { id: 3, labName: "32 DENTAL LAB", typeOfWork: "VEENERS/LAMINATE", amount: "0.00" },
    { id: 4, labName: "32 DENTAL LAB", typeOfWork: "TEMPORARY-COLD", amount: "0.00" },
    { id: 5, labName: "32 DENTAL LAB", typeOfWork: "TEMPORARY-HEAT", amount: "0.00" },
    { id: 6, labName: "32 DENTAL LAB", typeOfWork: "SPEACIAL TRAY", amount: "0.00" },
    { id: 7, labName: "32 DENTAL LAB", typeOfWork: "JR", amount: "0.00" },
    { id: 8, labName: "32 DENTAL LAB", typeOfWork: "TEETH SETTING", amount: "0.00" },
    { id: 9, labName: "32 DENTAL LAB", typeOfWork: "ZIRCONIA 5YW", amount: "0.00" },
    { id: 10, labName: "32 DENTAL LAB", typeOfWork: "PFM", amount: "350.00" }
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-4">
        <Settings className="w-5 h-5 text-red-500" />
        <h1 className="text-lg font-bold text-red-500 uppercase tracking-wide">
          LAB
        </h1>
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center gap-4">
        <div className="w-full md:max-w-md">
            <Select value={workType} onValueChange={setWorkType}>
                <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700">
                <SelectValue placeholder="---Type Of work Select ---" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="type1">Type 1</SelectItem>
                <SelectItem value="type2">Type 2</SelectItem>
                </SelectContent>
            </Select>
        </div>
        
        <Button className="bg-[#1E6B8C] hover:bg-[#15526d] text-white px-6 font-medium shadow-sm transition-all whitespace-nowrap">
            Add New Lab
        </Button>
      </div>

      {/* Table */}
       <div className="border border-gray-200 dark:border-gray-700 rounded-t-lg overflow-hidden overflow-x-auto">
        <Table>
          <TableHeader className="bg-[#E8F8F5] dark:bg-gray-800">
            <TableRow className="hover:bg-[#E8F8F5] dark:hover:bg-gray-700/50 border-gray-200 dark:border-gray-700">
              <TableHead className="font-bold text-gray-700 dark:text-gray-300 w-[60px]">Sr. No.</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Lab Name</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Type Of Work</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Type Of Work Amount</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300 w-[100px] text-center">#</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.id} className="border-gray-200 dark:border-gray-700 dark:hover:bg-gray-800/50">
                <TableCell className="dark:text-gray-300">{row.id}</TableCell>
                <TableCell className="dark:text-gray-300">{row.labName}</TableCell>
                <TableCell className="dark:text-gray-300">{row.typeOfWork}</TableCell>
                <TableCell className="dark:text-gray-300">{row.amount}</TableCell>
                <TableCell className="dark:text-gray-300">
                    <div className="flex items-center justify-center gap-4">
                        <Button variant="ghost" size="icon" className="h-4 w-4 text-gray-600 hover:text-green-600">
                            <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-4 w-4 text-gray-600 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

        {/* Footer / Pagination */}
       <div className="flex justify-end items-center pt-2">
          <div className="flex gap-2 text-sm text-blue-600 dark:text-blue-400">
             <span className="cursor-pointer hover:underline p-1">12345678910... &gt;&gt;</span>
          </div>
        </div>
    </div>
  );
}
