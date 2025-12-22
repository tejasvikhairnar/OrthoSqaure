"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button"; // Buttons not shown in reference
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings } from "lucide-react"; 

// Hooks
import { useDoctors } from "@/hooks/useDoctors";

export default function UpgradationPage() {
  const { data: doctors = [] } = useDoctors();

  const [formData, setFormData] = useState({
    patientName: "",
    clinicName: "",
    doctorName: "",
    cancellationDate: "2025-12-22", // Default per screenshot, or today
    reason: "",
    creditNoteAmount: "0",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="w-full p-6 space-y-6 min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 pb-2 border-b border-gray-200 dark:border-gray-800">
        <Settings className="w-5 h-5 text-red-500 animate-spin-slow" />
        <h1 className="text-lg font-bold text-red-500 uppercase tracking-wide">
          UPGRADATION
        </h1>
      </div>

      {/* Form Content */}
      <Card className="border-border shadow-md bg-card">
        <CardContent className="p-6 space-y-8">
          
          {/* Row 1: Patient, Clinic, Doctor, Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground/80">Patient Name</Label>
              <Input
                className="h-10 bg-background border-input"
                placeholder="Patient Name"
                value={formData.patientName}
                onChange={(e) => handleInputChange("patientName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground/80">Clinic Name</Label>
              <Select
                value={formData.clinicName}
                onValueChange={(val) => handleInputChange("clinicName", val)}
              >
                <SelectTrigger className="h-10 bg-background border-input">
                  <SelectValue placeholder="-- Select Clinic --" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="panvel">Panvel</SelectItem>
                <SelectItem value="pune">Pune</SelectItem>
                <SelectItem value="mumbai">Mumbai</SelectItem>
                <SelectItem value="nashik">Nashik</SelectItem>
                <SelectItem value="dwarka">Dwarka</SelectItem>
                <SelectItem value="borivali">Borivali</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground/80">Doctor Name</Label>
               <Select
                value={formData.doctorName}
                onValueChange={(val) => handleInputChange("doctorName", val)}
              >
                <SelectTrigger className="h-10 bg-background border-input">
                  <SelectValue placeholder="--- Select ---" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doc) => (
                    <SelectItem key={doc.doctorID} value={doc.name}>
                      {doc.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

             <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground/80">Cancellation Date</Label>
              <Input
                type="date"
                className="h-10 bg-background border-input"
                value={formData.cancellationDate}
                onChange={(e) => handleInputChange("cancellationDate", e.target.value)}
              />
            </div>
          </div>

          {/* Row 2: Totals Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             <div className="space-y-2">
               <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">TOTAL COST (₹)</Label>
               {/* Using div to mimic empty display field */}
               <div className="h-10"></div> 
             </div>
             <div className="space-y-2">
               <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">TOTAL DISCOUNT (₹)</Label>
               <div className="h-10"></div>
             </div>
             <div className="space-y-2">
               <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">TOTAL TAX (₹)</Label>
               <div className="h-10"></div>
             </div>
             <div className="space-y-2">
               <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">GRAND TOTAL(₹)</Label>
               <div className="h-10"></div>
             </div>
          </div>

           {/* Row 3: Paid/Pending Display */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             <div className="space-y-2">
               <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">TOTAL PAID AMOUNT (₹)</Label>
               <div className="h-10"></div>
             </div>
             <div className="space-y-2">
               <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">TOTAL PENDING AMOUNT (₹)</Label>
               <div className="h-10"></div>
             </div>
          </div>

          {/* Row 4: Reason */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground/80">Reason for cancellation</Label>
            <Textarea 
                className="min-h-[100px] bg-background border-input resize-none focus-visible:ring-1 focus-visible:ring-ring"
                value={formData.reason}
                onChange={(e) => handleInputChange("reason", e.target.value)}
            />
          </div>

          {/* Row 5: Credit Note */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground/80">CreditNote amount</Label>
              <Input
                  type="number"
                  className="h-10 bg-background border-input"
                  value={formData.creditNoteAmount}
                  onChange={(e) => handleInputChange("creditNoteAmount", e.target.value)}
              />
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
