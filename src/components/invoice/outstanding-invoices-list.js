"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InvoiceStatusBadge } from "./invoice-status-badge";



export function OutstandingInvoicesList({ invoices }) {
  const outstandingInvoices = invoices.filter(
    (invoice) => invoice.status === "Unpaid" || invoice.status === "Overdue" || invoice.status === "Partial"
  );

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle>Outstanding Invoices</CardTitle>
      </CardHeader>
      <CardContent>
        {outstandingInvoices.length === 0 ? (
          <p className="text-muted-foreground">No outstanding invoices.</p>
        ) : (
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-3">
              {outstandingInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-2 border rounded-md">
                  <div>
                    <p className="font-medium">{invoice.invoiceNumber} - {invoice.patientName}</p>
                    <p className="text-sm text-muted-foreground">Due: {invoice.expiresDate}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <InvoiceStatusBadge status={invoice.status} />
                    <span className="font-semibold text-lg">₹{(invoice.total - invoice.paidAmount).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}