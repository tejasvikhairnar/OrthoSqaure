"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, IndianRupee, Timer } from "lucide-react";
import { useState } from "react";

/* -------------------- MAIN COMPONENT -------------------- */


function calculateProfit({ totalBusiness, gst, treatmentExpense, eventExpense }) {
  const netRevenue = totalBusiness - gst;
  return netRevenue - treatmentExpense - eventExpense;
}

const eventData = [
  {
    event: "Dental Camp",
    eventExpense: 30000,
    leads: 120,
    converted: 28,
    time: "3.8 days",
    totalBusiness: 280000,
    treatmentExpense: 135000,
    gst: 18900,
  },
  {
    event: "Facebook Ads",
    eventExpense: 50000,
    leads: 200,
    converted: 32,
    time: "4.5 days",
    totalBusiness: 320000,
    treatmentExpense: 160000,
    gst: 21600,
  },
];



function formatINR(value) {
  return value.toLocaleString("en-IN");
}

export default function LeadOverviewModern() {
    const [selectedTreatment, setSelectedTreatment] = useState("");
    const treatmentData = [
  {
    treatment: "Root Canal",
    totalRevenue: 10000,
    sittings: 3,
    costPerSitting: 2200,
  },
  {
    treatment: "Teeth Whitening",
    totalRevenue: 6000,
    sittings: 1,
    costPerSitting: 1800,
  },
  {
    treatment: "Dental Implant",
    totalRevenue: 45000,
    sittings: 4,
    costPerSitting: 8500,
  },
];


const selectedTreatmentData = treatmentData.find(
  (t) => t.treatment === selectedTreatment
);


  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight text-[#027290]">
          Lead Overview
        </h1>
        <Button variant="outline" size="sm">
          Export
        </Button>
      </div>

      {/* INSIGHT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <InsightCard
          title="Marketing Spend"
          value="₹1.2L"
          helper="₹2,150 / converted lead"
          trend="+12%"
          icon={<IndianRupee size={18} />}
          
        />
        <InsightCard
          title="Avg Conversion Time"
          value="4.2 Days"
          helper="Faster than last month"
          trend="-8%"
          icon={<Timer size={18} />}
        />
        <InsightCard
          title="Total Converted Leads"
          value="60"
          helper="From 320 enquiries"
        />
        <InsightCard
          title="Net ROI"
          value="38%"
          helper="Healthy margin"
          highlight
          icon={<ArrowUpRight size={18} />}
        />
      </div>

      {/* CONVERSION & EXPENSE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Lead Conversion Time</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={72} />
            <p className="text-sm text-muted-foreground">
              On average, leads convert within <b>4.2 days</b>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Marketing Expense Split</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <ExpenseRow label="Calling" value="₹45,000" />
            <ExpenseRow label="WhatsApp / SMS" value="₹18,000" />
            <ExpenseRow label="Ads / Campaigns" value="₹57,000" />
          </CardContent>
        </Card>
      </div>

      {/* TREATMENT SELECTION */}
<div className="flex items-center justify-between">
  <h2 className="text-lg font-semibold">Treatment Profitability</h2>

  <select
    value={selectedTreatment}
    onChange={(e) => setSelectedTreatment(e.target.value)}
    className="border rounded-md px-3 py-2 text-sm bg-background min-w-[220px]"
  >
    <option value="" disabled>
      Select treatment
    </option>

    {treatmentData.map((t, i) => (
      <option key={i} value={t.treatment}>
        {t.treatment}
      </option>
    ))}
  </select>
</div>

{/* TREATMENT PROFITABILITY (DYNAMIC) */}
<Card>
  {/* <CardHeader>
    <CardTitle>Treatment Profitability</CardTitle>
  </CardHeader> */}

  <CardContent className="space-y-4">
{selectedTreatmentData && (() => {
  const treat = selectedTreatmentData;
      const totalExpense = treat.sittings * treat.costPerSitting;
      const profit = treat.totalRevenue - totalExpense;
      const margin = ((profit / treat.totalRevenue) * 100).toFixed(1);

      return (
        <div
        //   key={i}
          className="rounded-xl border p-4 hover:bg-muted/40 transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[#027290]">{treat.treatment}</h3>
              <p className="text-sm text-muted-foreground">
                {/* {treat.sittings} sittings treatment */}
              </p>
            </div>

            <Badge variant={profit >= 0 ? "secondary" : "destructive"}>
              {margin}% Margin
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mt-4">
            <Metric label="Total Price" value={`₹${treat.totalRevenue.toLocaleString()}`} />
            <Metric label="Sittings" value={treat.sittings} />
            <Metric label="Cost / Sitting" value={`₹${treat.costPerSitting.toLocaleString()}`} />
            <Metric label="Total Expense" value={`₹${totalExpense.toLocaleString()}`} />
            <Metric label="Profit" value={`₹${profit.toLocaleString()}`} />
          </div>
        </div>
      );
})()}
  </CardContent>
</Card>


    <Card>
  <CardHeader>
    <CardTitle>Event-wise Performance</CardTitle>
  </CardHeader>

  <CardContent className="overflow-auto rounded-xl border bg-background m-4 mt-0 mb-0 p-0">
    <Table>
      <TableHeader className="bg-muted/50 sticky top-0 z-10">
        <TableRow>
          <TableHead>Event</TableHead>
          <TableHead>Event Expense</TableHead>
          <TableHead>Leads</TableHead>
          <TableHead>Converted</TableHead>
          <TableHead>Avg Time</TableHead>
          <TableHead>Total Business</TableHead>
          <TableHead>Treatment Expense</TableHead>
          <TableHead>GST</TableHead>
          <TableHead className="text-right">Profit</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {eventData.map((row, i) => {
          const profit = calculateProfit(row);

          return (
            <TableRow key={i} className="hover:bg-muted/40 transition">
              <TableCell className="font-medium">{row.event}</TableCell>
              <TableCell>₹{formatINR(row.eventExpense)}</TableCell>
              <TableCell>{row.leads}</TableCell>
              <TableCell>{row.converted}</TableCell>
              <TableCell>{row.time}</TableCell>
              <TableCell>₹{formatINR(row.totalBusiness)}</TableCell>
              <TableCell>₹{formatINR(row.treatmentExpense)}</TableCell>
              <TableCell>₹{formatINR(row.gst)}</TableCell>

              <TableCell
                className={`text-right font-semibold ${
                  profit >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                ₹{profit.toLocaleString()}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </CardContent>
</Card>

    </div>
  );
}

/* -------------------- SMALL COMPONENTS -------------------- */

function InsightCard({ title, value, helper, trend, icon, highlight }) {
  return (
    <Card className={highlight ? "border-primary/40" : ""}>
      <CardContent className="p-6 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{title}</p>
          {icon && <span className="text-muted-foreground">{icon}</span>}
        </div>
        <div className="flex items-end gap-2">
            <h2 className="text-3xl font-bold text-[#027290]">{value}</h2>
          {trend && (
            <span className="text-sm text-green-600">{trend}</span>
          )}
        </div>
        {helper && (
          <p className="text-xs text-muted-foreground">{helper}</p>
        )}
      </CardContent>
    </Card>
  );
}

function ExpenseRow({ label, value }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-[#027290]">{value}</span>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}



