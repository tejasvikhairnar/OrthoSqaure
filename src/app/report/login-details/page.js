"use client";

import React, { useState } from "react";
import { Settings, FilePenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LoginDetailsPage() {
  const [loginType, setLoginType] = useState("clinic");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  // Mock data matching the image
  const loginData = [
    { id: 1, name: "Borivali", username: "admin_br", password: "admin" },
    { id: 2, name: "DADAR West", username: "Admin_ddr", password: "Admin" },
    { id: 3, name: "bandra west", username: "Admin_bd", password: "Admin" },
    { id: 4, name: "Andheri West (Juhu)", username: "Admin_Andheri", password: "Admin" },
    { id: 5, name: "GOREGAON East", username: "Admin_gg", password: "Admin" },
    { id: 6, name: "MALAD West", username: "Admin_ml", password: "Admin" },
    { id: 7, name: "BYCULLA West", username: "Admin_by", password: "Admin" },
    { id: 8, name: "GHATKOPAR East", username: "Ghatkopar@orthosquare", password: "Admin-2#" },
    { id: 9, name: "MULUND", username: "Admin_mu", password: "Admin" },
    { id: 10, name: "CHEMBUR East", username: "Admin_Chembur", password: "chem-1#" },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-4">
        <Settings className="w-5 h-5 text-red-500 animate-spin-slow" />
        <h1 className="text-lg font-bold text-red-500 uppercase tracking-wide">
          LOGIN
        </h1>
      </div>

      {/* Filters */}
      <div className="space-y-4">
         <RadioGroup defaultValue="clinic" onValueChange={setLoginType} className="flex gap-6">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="clinic" id="clinic" className="text-blue-600 border-blue-600" />
              <Label htmlFor="clinic" className="text-gray-700 dark:text-gray-300 font-medium">Clinic</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="doctor" id="doctor" className="border-gray-400" />
              <Label htmlFor="doctor" className="text-gray-700 dark:text-gray-300 font-medium">Doctor</Label>
            </div>
        </RadioGroup>

        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="w-full md:w-1/3">
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
            />
          </div>
          <div className="w-full md:w-1/3">
            <Input
              placeholder="Mobile No"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
            />
          </div>

          <Button className="bg-[#D35400] hover:bg-[#A04000] text-white px-8 font-medium shadow-sm transition-all w-full md:w-auto">
            Search
          </Button>
        </div>
      </div>

      {/* Total Count Placeholder */}
       <div className="flex justify-end">
           <div className="text-gray-500 text-sm">
               Total :
           </div>
       </div>

      {/* Table */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-t-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-[#E8F8F5] dark:bg-gray-800">
            <TableRow className="hover:bg-[#E8F8F5] dark:hover:bg-gray-700/50 border-gray-200 dark:border-gray-700">
              <TableHead className="font-bold text-gray-700 dark:text-gray-300 w-[60px]">Sr. No.</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Name</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">User Name</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300">Password</TableHead>
              <TableHead className="font-bold text-gray-700 dark:text-gray-300 w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loginData.map((item, index) => (
              <TableRow key={item.id} className="border-gray-200 dark:border-gray-700 dark:hover:bg-gray-800/50">
                <TableCell className="dark:text-gray-300">{index + 1}</TableCell>
                <TableCell className="dark:text-gray-300">{item.name}</TableCell>
                <TableCell className="dark:text-gray-300">{item.username}</TableCell>
                <TableCell className="dark:text-gray-300">{item.password}</TableCell>
                <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-black dark:text-white border border-black dark:border-white rounded-md p-1">
                        <FilePenLine className="w-4 h-4" />
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer / Pagination Placeholder */}
       <div className="flex justify-end items-center pt-2">
        <div className="text-xs text-blue-500 hover:underline cursor-pointer">
          12345678910... &gt;&gt;
        </div>
      </div>
    </div>
  );
}
