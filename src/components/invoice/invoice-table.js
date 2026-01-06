"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { InvoiceStatusBadge } from "./invoice-status-badge";
import { InvoiceActionsDropdown } from "./invoice-actions-dropdown";



export function InvoiceTable({ invoices, filters, onEditInvoice, onDeleteInvoice }) {
  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch = filters.search
      ? Object.values(invoice).some((value) =>
          String(value).toLowerCase().includes(filters.search.toLowerCase())
        )
      : true;

    const invoiceCreatedDate = new Date(invoice.createdDate);
    const matchesFromDate = filters.fromDate
      ? invoiceCreatedDate >= filters.fromDate
      : true;
    const matchesToDate = filters.toDate
      ? invoiceCreatedDate <= filters.toDate
      : true;

    return matchesSearch && matchesFromDate && matchesToDate;
  });

  return (
    <div className="rounded-md border overflow-x-auto"> {/* Added overflow-x-auto for horizontal scrolling */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">SR. NO.</TableHead>
            <TableHead>INVOICE NO.</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead>TYPE</TableHead>
            <TableHead>CREATED DATE</TableHead>
            <TableHead>EXPIRES DATE</TableHead>
            <TableHead>PATIENT NAME</TableHead>
            <TableHead>CLINIC</TableHead>
            <TableHead>PT. CODE</TableHead>
            <TableHead>MOBILE</TableHead>
            <TableHead className="text-right">TOTAL</TableHead>
            <TableHead className="text-right">PAID</TableHead>
            <TableHead className="text-right">PENDING</TableHead>
            <TableHead className="text-center">ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInvoices.length ? (
            filteredInvoices.map((invoice, index) => (
              <TableRow key={invoice.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium text-primary">{invoice.invoiceNumber}</TableCell>
                <TableCell><InvoiceStatusBadge status={invoice.status} /></TableCell>
                <TableCell>{invoice.type}</TableCell>
                <TableCell>{invoice.createdDate}</TableCell>
                <TableCell>{invoice.expiresDate}</TableCell>
                <TableCell className="font-medium">{invoice.patientName}</TableCell>
                <TableCell>{invoice.clinic}</TableCell>
                <TableCell>{invoice.patientCode}</TableCell>
                <TableCell>{invoice.mobile}</TableCell>
                <TableCell className="text-right">₹{invoice.total.toLocaleString()}</TableCell>
                <TableCell className="text-right text-green-600">₹{invoice.paidAmount.toLocaleString()}</TableCell>
                <TableCell className="text-right text-orange-600">₹{invoice.pendingAmount.toLocaleString()}</TableCell>
                <TableCell className="flex justify-center items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => console.log(`Printing invoice ${invoice.invoiceNumber}`)}>
                    <Printer className="h-4 w-4 mr-1" /> Print
                  </Button>
                  <InvoiceActionsDropdown
                    invoice={invoice}
                    onEdit={onEditInvoice}
                    onDelete={onDeleteInvoice}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={14} className="h-24 text-center">
                No invoices found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}