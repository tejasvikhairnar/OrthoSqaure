"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Settings, FileX } from "lucide-react"; // Changed icon to FileX for cancellation

// Hooks
import { useDoctors } from "@/hooks/useDoctors";
import { useSaveCancellationTreatment } from "@/hooks/useAccounts";
import { toast } from "sonner";

export default function CancellationTreatmentPage() {
  const { data: doctors = [] } = useDoctors();
  const { mutate: saveCancellation, isPending } = useSaveCancellationTreatment();

  const [formData, setFormData] = useState({
    patientName: "",
    clinicName: "",
    doctorName: "",
    cancellationDate: new Date().toISOString().split("T")[0],
    reason: "",
    refundAmount: "0",
    creditNoteAmount: "0",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.patientName || !formData.clinicName) {
        toast.error("Please fill in all required fields.");
        return;
    }
    saveCancellation(formData);
  };

  return (
    <div className="w-full p-6 space-y-6 min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center gap-3 pb-2 border-b border-gray-200 dark:border-gray-800">
        <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
             <FileX className="w-6 h-6 text-red-600 dark:text-red-400" />
        </div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
          Cancellation Treatment
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
                placeholder="Enter Patient Name"
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
                  <SelectValue placeholder="Select Clinic" />
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
                  <SelectValue placeholder="Select Doctor" />
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
               <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Cost</Label>
               <div className="h-10 flex items-center px-3 bg-muted/50 border border-input rounded-md text-sm font-semibold text-foreground">
                  ₹ 0.00
               </div>
             </div>
             <div className="space-y-2">
               <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Discount</Label>
               <div className="h-10 flex items-center px-3 bg-muted/50 border border-input rounded-md text-sm font-semibold text-foreground">
                  ₹ 0.00
               </div>
             </div>
             <div className="space-y-2">
               <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Tax</Label>
               <div className="h-10 flex items-center px-3 bg-muted/50 border border-input rounded-md text-sm font-semibold text-foreground">
                  ₹ 0.00
               </div>
             </div>
             <div className="space-y-2">
               <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Grand Total</Label>
               <div className="h-10 flex items-center px-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-md text-sm font-bold text-red-600 dark:text-red-400">
                  ₹ 0.00
               </div>
             </div>
          </div>

           {/* Row 3: Paid/Pending Display */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             <div className="space-y-2">
               <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Paid Amount</Label>
               <div className="h-10 flex items-center px-3 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 rounded-md text-sm font-bold text-green-600 dark:text-green-400">
                  ₹ 0.00
               </div>
             </div>
             <div className="space-y-2">
               <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Pending Amount</Label>
               <div className="h-10 flex items-center px-3 bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 rounded-md text-sm font-bold text-orange-600 dark:text-orange-400">
                  ₹ 0.00
               </div>
             </div>
          </div>

          {/* Row 4: Reason */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground/80">Reason for Cancellation</Label>
            <Textarea 
                className="min-h-[100px] bg-background border-input resize-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="Please describe the reason for cancellation..."
                value={formData.reason}
                onChange={(e) => handleInputChange("reason", e.target.value)}
            />
          </div>

          {/* Row 5: Refund / Credit Note */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-muted/30 rounded-lg border border-border/50">
             <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground/80">Refund Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">₹</span>
                <Input
                    type="number"
                    className="h-10 pl-7 bg-background border-input"
                    value={formData.refundAmount}
                    onChange={(e) => handleInputChange("refundAmount", e.target.value)}
                />
              </div>
            </div>
             <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground/80">Credit Note Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">₹</span>
                <Input
                    type="number"
                    className="h-10 pl-7 bg-background border-input"
                    value={formData.creditNoteAmount}
                    onChange={(e) => handleInputChange("creditNoteAmount", e.target.value)}
                />
              </div>
            </div>
          </div>



        </CardContent>
      </Card>
    </div>
  );
}
