"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const dataPayments = [
  { name: "Received", value: 5254.49, color: "#82ca9d" },
  { name: "Outstanding", value: 2081.11, color: "#8884d8" },
];

const dataMethods = [
  { name: "Credit Card", value: 2609.61, color: "#8884d8" },
  { name: "Check", value: 1271.25, color: "#82ca9d" },
  { name: "Money Wire", value: 1677.03, color: "#ffc658" },
];

const dataStatus = [
  { name: "Paid", value: 9, color: "#82ca9d" },
  { name: "Partial", value: 2, color: "#ffc658" },
  { name: "Unpaid", value: 3, color: "#8884d8" },
  { name: "Overdue", value: 1, color: "#ff8042" },
];

const dataType = [
  { name: "Products", value: 6, color: "#8884d8" },
  { name: "Services", value: 9, color: "#82ca9d" },
  { name: "Other", value: 0, color: "#ffc658" },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-sm rounded text-xs">
        <p className="font-medium">{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const StatCard = ({ title, data, showTotal = false, totalLabel = "Total" }) => {
    // Calculate total if needed
    const total = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <Card className="shadow-sm bg-white border-border">
      <CardContent className="p-4">
        <h3 className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-wide">{title}</h3>
        <div className="flex items-center">
            <div className="h-[100px] w-[100px] flex-none">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={25}
                        outerRadius={40}
                        paddingAngle={2}
                        dataKey="value"
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            
            <div className="ml-4 space-y-1 flex-1">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                             <span className="text-gray-600 font-medium">{item.name}</span>
                        </div>
                        <span className="font-bold text-gray-700">
                             {title.includes("Payment") ? `$${item.value.toLocaleString()}` : item.value }
                        </span>
                    </div>
                ))}
            </div>
            
        </div>
      </CardContent>
    </Card>
  );
};


export default function InvoiceStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
       <StatCard title="Payments" data={dataPayments} />
       <StatCard title="Payment Methods" data={dataMethods} />
       <StatCard title="Status" data={dataStatus} />
       <StatCard title="Type" data={dataType} />
    </div>
  );
}
