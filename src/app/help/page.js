"use client";

import React from "react";
import { Search, CirclePlay } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HelpPage = () => {
  const tutorials = [
    {
      id: 1,
      title: "Leads-FollowUp",
      thumbnail: "/placeholder-video.png", // Implementing placeholder logic in CSS if image missing
    },
    {
      id: 2,
      title: "Material",
      thumbnail: "/placeholder-video.png",
    },
    {
      id: 3,
      title: "Leads Excel Upload",
      thumbnail: "/placeholder-video.png",
    },
    {
      id: 4,
      title: "Cancellation Treatment",
      thumbnail: "/placeholder-video.png",
    },
  ];

  return (
    <div className="p-6 bg-background min-h-screen text-foreground">
      {/* Header */}
      <h1 className="text-xl font-bold text-red-500 flex items-center gap-2 mb-8">
        <span className="text-2xl">⚙</span> HELP
      </h1>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-xl text-blue-400 mb-8 font-medium">
          Video tutorials with steps to be followed by user
        </h2>

        {/* Search Bar */}
        <div className="flex gap-4 mb-12 max-w-xl">
          <Input 
            placeholder="Name" 
            className="bg-white border-gray-200"
          />
          <Button className="bg-[#D35400] hover:bg-[#A04000] text-white px-8">
            Search
          </Button>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tutorials.map((tutorial) => (
            <div 
              key={tutorial.id} 
              className="flex flex-col items-center border border-green-100 p-8 rounded-sm hover:shadow-lg transition-shadow bg-white"
            >
              <div className="w-48 h-48 mb-6 relative flex items-center justify-center cursor-pointer group">
                <CirclePlay 
                  size={120} 
                  className="text-black group-hover:text-gray-800 transition-colors" 
                  strokeWidth={1.5}
                />
              </div>
              <p className="text-blue-400 text-sm font-medium text-center">
                {tutorial.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
