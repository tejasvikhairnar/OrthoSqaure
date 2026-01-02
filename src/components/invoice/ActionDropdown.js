"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, FileText, Send, Copy, CopyPlus } from "lucide-react";

export default function ActionDropdown({ invoice }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px] bg-white">
        <DropdownMenuItem className="cursor-pointer text-gray-600 focus:text-[#0f7396] focus:bg-[#0f7396]/10">
          <FileText className="mr-2 h-4 w-4" />
          <span>Extract to PDF</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer text-gray-600 focus:text-[#0f7396] focus:bg-[#0f7396]/10">
          <Send className="mr-2 h-4 w-4" />
          <span>Send Invoice</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer text-gray-600 focus:text-[#0f7396] focus:bg-[#0f7396]/10">
          <Copy className="mr-2 h-4 w-4" />
          <span>Copy Link</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer text-gray-600 focus:text-[#0f7396] focus:bg-[#0f7396]/10">
           <CopyPlus className="mr-2 h-4 w-4" />
          <span>Duplicate</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
