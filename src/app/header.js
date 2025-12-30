"use client";

import { LayoutDashboard, LogOut } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useDispatch } from "react-redux";
import { setHeaderData } from "@/store/slices/headerSlice";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [region, setRegion] = useState("0");
  const [period, setPeriod] = useState("All");

  const periods = [
    { id: "D1", label: "Yesterday" },
    { id: "W1", label: "Last 7 Days" },
    { id: "M1", label: "30 Days" },
    { id: "Q1", label: "90 Days" },
    { id: "Y1", label: "365 Days" },
    { id: "All", label: "Grouped" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <header className="glass-header w-full h-16 flex items-center justify-between px-6 z-30">
      {/* Left Section */}
      <div className="flex items-center gap-2">
        <LayoutDashboard className="w-5 h-5 text-medivardaan-blue dark:text-medivardaan-teal" />
        <h1 className="text-xl font-semibold text-[#0f7396] dark:text-[#0f7396] tracking-tight">
          Dashboard
        </h1>
      </div>

      {/* Right Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-end">
        {/* Region Selector */}
        <Select
          onValueChange={(value) => {
            setRegion(value);
            dispatch(setHeaderData({ region: value, period: null }));
          }}
          value={region}
        >
          <SelectTrigger className="w-[160px] bg-gradient-to-br from-medivardaan-teal/5 to-medivardaan-blue/5 dark:bg-gradient-to-br dark:from-medivardaan-blue/10 dark:to-medivardaan-teal/10 border border-medivardaan-teal/30 dark:border-medivardaan-teal/40 rounded-md text-sm font-medium">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            {[
              { regionName: "All", regionValue: "0" },
              { regionName: "East", regionValue: "1" },
              { regionName: "West", regionValue: "2" },
              { regionName: "North", regionValue: "3" },
              { regionName: "South", regionValue: "4" },
              { regionName: "Central", regionValue: "5" },
            ].map((r) => (
              <SelectItem key={r.regionValue} value={r.regionValue}>
                {r.regionName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Period Buttons */}
        <div className="flex flex-wrap gap-2">
          {periods.map((p) => (
            <Button
              key={p.id}
              size="sm"
              variant={period === p.id ? "default" : "outline"}
              onClick={() => {
                setPeriod(p.id);
                dispatch(setHeaderData({ region: null, period: p.id }));
              }}
              className="rounded-full px-4"
            >
              {p.label}
            </Button>
          ))}
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Logout */}
        <Button
          variant="outline"
          size="sm"
          className="rounded-full px-3 text-red-600 border-red-400 hover:bg-red-100 dark:hover:bg-red-950"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-1" /> Logout
        </Button>
      </div>
    </header>
  );
}
