"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function BookAppointmentFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const clinic = searchParams.get("clinic");
  const doctor = searchParams.get("doctor");

  // 🔹 These will normally come from DATABASE / API
  const [patientName, setPatientName] = useState("");
  const [dob, setDob] = useState(""); // YYYY-MM-DD
  const [age, setAge] = useState("");

  const [date, setDate] = useState(searchParams.get("date") || "");
  const [time, setTime] = useState("");

  // ✅ Auto-calculate age whenever DOB changes
  useEffect(() => {
    if (!dob) {
      setAge("");
      return;
    }

    const birthDate = new Date(dob);
    const today = new Date();

    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      calculatedAge--;
    }

    setAge(calculatedAge);
  }, [dob]);

  const handleProceed = () => {
    if (!patientName || !dob || !date || !time) {
      alert("Please fill all fields");
      return;
    }

    router.push(
      `/appointments/new-appointment?patientName=${patientName}&dob=${dob}&age=${age}&date=${date}&time=${time}&clinic=${clinic}&doctor=${doctor}`
    );
  };

  return (
    <div className="p-6 space-y-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#4DB8AC]/10">
          <Settings className="text-gray-600 dark:text-gray-400" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            BOOK APPOINTMENT
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter appointment details
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Patient Name */}
        <div className="md:col-span-2">
          <Label>Patient Name</Label>
          <Input
            placeholder="Enter patient name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
          />
        </div>

        {/* DOB */}
        <div>
          <Label>Date of Birth</Label>
          <Input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        {/* Age (AUTO CALCULATED) */}
        <div>
          <Label>Age</Label>
          <Input value={age} disabled />
        </div>

        {/* Appointment Date */}
        <div>
          <Label>Appointment Date</Label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Time */}
        <div>
          <Label>Time</Label>
          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>

      {/* Action */}
      <div className="flex justify-end">
        <Button
          onClick={handleProceed}
          className="bg-[#D35400] hover:bg-[#D35400]/90 px-10"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
