"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Clock, CheckCircle, XCircle } from "lucide-react";



export function InvoiceDashboard({ invoices }) {
  const totalInvoices = invoices.length;
  const totalOutstanding = invoices.reduce((sum, invoice) => {
    if (invoice.status === "Unpaid" || invoice.status === "Overdue" || invoice.status === "Partial") {
      return sum + invoice.total - invoice.paidAmount; // Assuming paidAmount is tracked
    }
    return sum;
  }, 0);
  const totalPaid = invoices.reduce((sum, invoice) => sum + invoice.paidAmount, 0);
  const totalOverdue = invoices.filter((invoice) => invoice.status === "Overdue").length;

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalInvoices}</div>
          <p className="text-xs text-muted-foreground">
            Total number of invoices created
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Outstanding Amount</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{totalOutstanding.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            Amount yet to be collected
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Paid</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{totalPaid.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            Total amount collected
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Overdue Invoices</CardTitle>
          <XCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalOverdue}</div>
          <p className="text-xs text-muted-foreground">
            Invoices past their due date
          </p>
        </CardContent>
      </Card>
    </>
  );
}