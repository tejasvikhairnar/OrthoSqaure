"use client";

import React from "react";
import { Settings, CheckCircle2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const EmployeePage = () => {
  const employees = [
    {
      id: 1,
      empCode: "EMP3",
      name: "sneha gaikwad",
      mobile: "7738328642",
      email: "",
      regDate: "21-08-2019",
      photo: null,
    },
    {
      id: 2,
      empCode: "EMP9",
      name: "sayali palshetkar",
      mobile: "8424930024",
      email: "",
      regDate: "06-11-2019",
      photo: null,
    },
    {
      id: 3,
      empCode: "EMP11",
      name: "Account a",
      mobile: "5566448855",
      email: "",
      regDate: "13-03-2020",
      photo: null,
    },
    {
      id: 4,
      empCode: "EMP12",
      name: "Nikita Rajaram Mhapankar",
      mobile: "9004310736",
      email: "",
      regDate: "28-08-2020",
      photo: null,
    },
    {
      id: 5,
      empCode: "EMP13",
      name: "seher shaikh",
      mobile: "9022942698",
      email: "",
      regDate: "09-09-2020",
      photo: null,
    },
    {
      id: 6,
      empCode: "EMP14",
      name: "Mahek Kanojiya",
      mobile: "7700011473",
      email: "mahekanojiya01@gmail.com",
      regDate: "30-09-2020",
      photo: null,
    },
  ];

  return (
    <div className="w-full p-6 space-y-6 bg-background text-foreground min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
          <Settings className="w-4 h-4 text-red-600 dark:text-red-500" />
        </div>
        <h1 className="text-xl font-bold text-red-600 dark:text-red-500">
          EMPLOYEE
        </h1>
      </div>

      <Card className="border-gray-200 dark:border-gray-800">
        <CardContent className="p-6 space-y-6">
          
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <Label className="text-sm text-gray-600 dark:text-gray-400">Employee Name</Label>
              <Input 
                placeholder="Employee Name" 
                className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-gray-600 dark:text-gray-400">Mobile No.</Label>
              <Input 
                placeholder="Mobile No." 
                className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-gray-600 dark:text-gray-400">Employee Code</Label>
              <Input 
                placeholder="Employee Code" 
                className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"
              />
            </div>
            <div>
              <Button className="bg-[#D35400] hover:bg-[#A04000] text-white dark:bg-orange-700 dark:hover:bg-orange-800 px-8">
                Search
              </Button>
            </div>
          </div>

          {/* Add New Button (Right Aligned) */}
          <div className="flex justify-end">
            <Button className="bg-[#1F618D] hover:bg-[#154360] text-white dark:bg-blue-700 dark:hover:bg-blue-800">
              Add New
            </Button>
          </div>

          {/* Table */}
          <div className="rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            <Table>
              <TableHeader className="bg-[#E8F8F5] dark:bg-green-900/20">
                <TableRow className="border-b border-gray-200 dark:border-gray-700 hover:bg-transparent">
                  <TableHead className="w-16 text-gray-700 dark:text-gray-200 font-semibold">Sr. No.</TableHead>
                  <TableHead className="w-32 text-gray-700 dark:text-gray-200 font-semibold">Photo</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-200 font-semibold">Emp Code</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-200 font-semibold">Name</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-200 font-semibold">Mobile No.</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-200 font-semibold">Email ID</TableHead>
                  <TableHead className="text-gray-700 dark:text-gray-200 font-semibold">Reg Date</TableHead>
                  <TableHead className="w-24 text-right text-gray-700 dark:text-gray-200 font-semibold"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((emp, index) => (
                  <TableRow 
                    key={emp.id} 
                    className="border-b last:border-b-0 border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <TableCell className="font-medium text-gray-900 dark:text-gray-100">{index + 1}</TableCell>
                    <TableCell>
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                        <span className="text-gray-400 dark:text-gray-600 text-xs">Photo</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">{emp.empCode}</TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300 uppercase">{emp.name}</TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">{emp.mobile}</TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">{emp.email}</TableCell>
                    <TableCell className="text-gray-700 dark:text-gray-300">{emp.regDate}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
                        >
                          <CheckCircle2 size={16} />
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

        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeePage;
