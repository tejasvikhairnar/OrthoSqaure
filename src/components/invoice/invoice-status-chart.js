"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const COLORS = {
  Paid: "#82ca9d",    // Green
  Unpaid: "#8884d8",  // Purple
  Overdue: "#ffc658", // Yellow/Orange
  Partial: "#ff7300", // Orange
};

export function InvoiceStatusChart({ invoices }) {
  const statusData = invoices.reduce((acc, invoice) => {
    acc[invoice.status] = (acc[invoice.status] || 0) + 1;
    return acc;
  }, {} );

  const chartData = Object.entries(statusData).map(([status, count]) => ({
    name: status,
    value: count,
  }));

  return (
    <Card className="col-span-full md:col-span-2 lg:col-span-2">
      <CardHeader>
        <CardTitle>Invoice Status Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        {chartData.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">No invoice data available for chart.</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name ]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}