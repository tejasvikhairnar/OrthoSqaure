"use client";

import React from "react";
import { Settings } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const UserAccessPage = () => {
  return (
    <div className="w-full p-6 space-y-6 bg-background text-foreground min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
          <Settings className="w-4 h-4 text-red-600 dark:text-red-500" />
        </div>
        <h1 className="text-xl font-bold text-red-600 dark:text-red-500">
          USER ACCESS
        </h1>
      </div>

      <Card className="border-gray-200 dark:border-gray-800">
        <CardContent className="p-6">
          <div className="w-full">
            <Select>
              <SelectTrigger className="w-full bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700">
                <SelectValue placeholder="--- Select ---" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserAccessPage;
