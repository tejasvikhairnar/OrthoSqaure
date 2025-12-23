"use client";

import React from "react";
import { Settings, Trash2, FileSpreadsheet } from "lucide-react";
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

const AreaManagerPage = () => {
  const areaManagers = [
    { id: 1, name: "Dr.RUCHII BHANSALI" },
    { id: 2, name: "Sayali Jadhav" },
    { id: 3, name: "Dr.Kunal Shet" },
    { id: 4, name: "Dr.Nilay Vakharia" },
    { id: 5, name: "Dr.Isha jain" },
    { id: 6, name: "Dr.Akhil Nair" },
    { id: 7, name: "Dr.Anagha Patil Chavan" },
    { id: 8, name: "Dr.Apurva Vaidya" },
    { id: 9, name: "Dr.MADHU PAWAR" },
  ];

  return (
    <div className="w-full p-6 space-y-6 bg-background text-foreground min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
          <Settings className="w-4 h-4 text-red-600 dark:text-red-500" />
        </div>
        <h1 className="text-xl font-bold text-red-600 dark:text-red-500">
          AREA MANAGER SUB ADMIN
        </h1>
      </div>

      <Card className="border-gray-200 dark:border-gray-800">
        <CardContent className="p-6 space-y-6">
          
          {/* Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex gap-2 w-full max-w-2xl">
              <div className="relative flex-1">
                <Input 
                  placeholder="Area Manager Name" 
                  className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 active:border-orange-500 focus:border-orange-500 pl-3"
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
              Total : {areaManagers.length}
            </div>
          </div>

          {/* Table */}
          <div className="rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            <Table>
              <TableHeader className="bg-[#E8F8F5] dark:bg-green-900/20">
                <TableRow className="border-b border-gray-200 dark:border-gray-700 hover:bg-transparent">
                  <TableHead className="w-16 text-gray-700 dark:text-gray-200 font-bold">Sr No.</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-200 font-bold">Area Manager</TableHead>
                  <TableHead className="w-16 text-center text-gray-700 dark:text-gray-200 font-bold">#</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {areaManagers.map((manager, index) => (
                  <TableRow 
                    key={manager.id} 
                    className="border-b last:border-b-0 border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <TableCell className="font-medium text-gray-900 dark:text-gray-100">{index + 1}</TableCell>
                    <TableCell className="text-blue-600 hover:text-blue-800 dark:text-blue-400 cursor-pointer">
                      {manager.name}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        size="icon"
                        variant="ghost" 
                        className="h-8 w-8 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Export Icon */}
          <div>
            <Button variant="ghost" className="p-0 hover:bg-transparent">
              <div className="w-8 h-8 flex items-center justify-center bg-green-700 rounded text-white hover:bg-green-800 transition-colors">
                <FileSpreadsheet size={20} />
              </div>
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default AreaManagerPage;
