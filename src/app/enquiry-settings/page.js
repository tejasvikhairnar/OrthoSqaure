"use client";

import React from "react";
import { Settings, Search, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const EnquirySettingsPage = () => {
  const enquirySources = [
    { id: 1, name: "Facebook" },
    { id: 2, name: "Google" },
    { id: 3, name: "Newspaper Ads" },
    { id: 4, name: "Pamphlets" },
    { id: 5, name: "Banners" },
    { id: 6, name: "Reference" },
    { id: 7, name: "Justdial" },
    { id: 8, name: "Practo" },
    { id: 9, name: "Website" },
    { id: 10, name: "Tele Calling" },
  ];

  return (
    <div className="w-full p-6 space-y-6 bg-background text-foreground min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
          <Settings className="w-4 h-4 text-red-600 dark:text-red-500" />
        </div>
        <h1 className="text-xl font-bold text-red-600 dark:text-red-500">
          ENQUIRY SOURCE
        </h1>
      </div>

      {/* Main Content Card */}
      <Card className="border-gray-200 dark:border-gray-800">
        <CardContent className="p-6 space-y-6">
          
          {/* Controls: Search and Add New */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex gap-2 w-full max-w-2xl">
               <div className="relative flex-1">
                 <Input 
                   placeholder="Name" 
                   className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 pl-3"
                 />
               </div>
              <Button className="bg-[#D35400] hover:bg-[#A04000] text-white dark:bg-orange-700 dark:hover:bg-orange-800">
                Search
              </Button>
              <Button className="bg-[#1F618D] hover:bg-[#154360] text-white dark:bg-blue-700 dark:hover:bg-blue-800">
                Add New
              </Button>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Total : {enquirySources.length}
            </div>
          </div>

          {/* Table */}
          <div className="rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            <Table>
              <TableHeader className="bg-[#E8F8F5] dark:bg-green-900/20">
                <TableRow className="border-b border-gray-200 dark:border-gray-700 hover:bg-transparent">
                  <TableHead className="w-24 text-gray-700 dark:text-gray-200 font-semibold">Sr. No.</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-200 font-semibold">Enquiry Source Name</TableHead>
                  <TableHead className="w-24 text-right text-gray-700 dark:text-gray-200 font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enquirySources.map((source, index) => (
                  <TableRow 
                    key={source.id} 
                    className="border-b last:border-b-0 border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <TableCell className="font-medium text-gray-900 dark:text-gray-100">{index + 1}</TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">{source.name}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost" 
                          className="h-8 w-8 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {/* Footer / Pagination Placeholder */}
          <div className="flex justify-end text-xs text-blue-500 dark:text-blue-400 font-medium pt-2">
            1234
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default EnquirySettingsPage;
