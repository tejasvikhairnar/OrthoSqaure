"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
  
const formSchema = z.object({
  id: z.string().optional(),
  invoiceNumber: z.string().min(1, "Invoice number is required."),
  status: z.nativeEnum(["Paid", "Unpaid", "Overdue", "Partial"]),
  type: z.nativeEnum(["Services", "Products"]),
  createdDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)."),
  expiresDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)."),
  fullName: z.string().min(1, "Full name is required."),
  company: z.string().optional(),
  total: z.coerce.number().min(0.01, "Total must be a positive number."),
  paymentDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD).").nullable().optional(),
  sent: z.coerce.number().min(0).max(1),
  view: z.coerce.number().min(0),

  // Fields from the new image
  clinic: z.string().min(1, "Clinic is required."),
  patientCode: z.string().min(1, "Patient code is required."),
  patientName: z.string().min(1, "Patient name is required."),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits.").max(15, "Mobile number cannot exceed 15 digits."),
  paidAmount: z.coerce.number().min(0, "Paid amount cannot be negative."),
  pendingAmount: z.coerce.number().min(0, "Pending amount cannot be negative."),
});



export function InvoiceFormDialog({
  open,
  onOpenChange,
  initialInvoice,
  onSave,
}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: initialInvoice?.id || undefined,
      invoiceNumber: initialInvoice?.invoiceNumber || "",
      status: initialInvoice?.status || "Unpaid",
      type: initialInvoice?.type || "Services",
      createdDate: initialInvoice?.createdDate || new Date().toISOString().split('T')[0],
      expiresDate: initialInvoice?.expiresDate || new Date().toISOString().split('T')[0],
      fullName: initialInvoice?.fullName || "",
      company: initialInvoice?.company || "",
      total: initialInvoice?.total || 0,
      paymentDate: initialInvoice?.paymentDate || null,
      sent: initialInvoice?.sent || 0,
      view: initialInvoice?.view || 0,
      clinic: initialInvoice?.clinic || "",
      patientCode: initialInvoice?.patientCode || "",
      patientName: initialInvoice?.patientName || "",
      mobile: initialInvoice?.mobile || "",
      paidAmount: initialInvoice?.paidAmount || 0,
      pendingAmount: initialInvoice?.pendingAmount || 0,
    },
  });

  React.useEffect(() => {
    if (open) {
      form.reset({
        id: initialInvoice?.id || undefined,
        invoiceNumber: initialInvoice?.invoiceNumber || "",
        status: initialInvoice?.status || "Unpaid",
        type: initialInvoice?.type || "Services",
        createdDate: initialInvoice?.createdDate || new Date().toISOString().split('T')[0],
        expiresDate: initialInvoice?.expiresDate || new Date().toISOString().split('T')[0],
        fullName: initialInvoice?.fullName || "",
        company: initialInvoice?.company || "",
        total: initialInvoice?.total || 0,
        paymentDate: initialInvoice?.paymentDate || null,
        sent: initialInvoice?.sent || 0,
        view: initialInvoice?.view || 0,
        clinic: initialInvoice?.clinic || "",
        patientCode: initialInvoice?.patientCode || "",
        patientName: initialInvoice?.patientName || "",
        mobile: initialInvoice?.mobile || "",
        paidAmount: initialInvoice?.paidAmount || 0,
        pendingAmount: initialInvoice?.pendingAmount || 0,
      });
    }
  }, [open, initialInvoice, form]);

  const onSubmit = (values) => {
    onSave(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle>{initialInvoice ? "Edit Invoice" : "Create New Invoice"}</DialogTitle>
          <DialogDescription>
            {initialInvoice
              ? "Make changes to the invoice here. Click save when you're done."
              : "Fill in the details to create a new invoice."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <FormField
              control={form.control}
              name="invoiceNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invoice #</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., INV-001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Paid">Paid</SelectItem>
                      <SelectItem value="Unpaid">Unpaid</SelectItem>
                      <SelectItem value="Overdue">Overdue</SelectItem>
                      <SelectItem value="Partial">Partial</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Services">Services</SelectItem>
                      <SelectItem value="Products">Products</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="createdDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Created Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiresDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expires Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Acme Corp" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Date (Optional)</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sent (0 or 1)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="view"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Views</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clinic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Clinic</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Panvel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="patientCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient Code</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., P001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="patientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Rahul Sharma" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 9876543210" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="total"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paidAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paid Amount (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pendingAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pending Amount (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-full flex justify-end">
              <Button type="submit">Save changes</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}