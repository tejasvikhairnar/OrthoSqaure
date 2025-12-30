"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Sidebar from "./sidebar";
import HeaderLayout from "./headerlayout";

export default function AppLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const isLoginPage = pathname === "/";

  if (isLoginPage) return children;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} />

      {/* Content Area */}
      <div
        className={`flex flex-col flex-1 min-w-0 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <HeaderLayout
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />

        {/* ✅ Main scroll fix */}
        <main className="flex-1 mt-16 overflow-y-auto bg-medical p-4 space-y-4 transition-colors duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}
