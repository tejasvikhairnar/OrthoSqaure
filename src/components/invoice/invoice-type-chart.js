"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export function InvoiceTypeChart({ invoices }) {
  const typeData = invoices.reduce((acc, invoice) => {
    acc[invoice.type] = (acc[invoice.type] || 0) + invoice.total;
    return acc;
  }, {} );

  const chartData = Object.entries(typeData).map(([type, total]) => ({
    name: type,
    total: total,
  }));

  return (
    <Card className="col-span-full md:col-span-2 lg:col-span-2">
      <CardHeader>
        <CardTitle>Total Amount by Invoice Type</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        {chartData.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">No invoice data available for chart.</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${(value).toLocaleString()}`} />
              <Legend />
              <Bar dataKey="total" fill="#027290" name="Total Amount" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}