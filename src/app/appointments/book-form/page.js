"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function BookAppointmentFormPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Default values from params if available
  const paramClinic = searchParams.get("clinic") || "Panvel"
  const paramDoctor = searchParams.get("doctor") || ""
  const paramDate = searchParams.get("date") || ""
  
  // Form State
  const [formData, setFormData] = useState({
    clinicName: paramClinic,
    doctorName: paramDoctor,
    patientName: "",
    dob: "",
    age: "",
    appointmentDate: paramDate,
    appointmentTime: ""
  })

  // Calculate age from DOB
  useEffect(() => {
    if (formData.dob) {
      const birthDate = new Date(formData.dob)
      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()
      const m = today.getMonth() - birthDate.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      setFormData(prev => ({ ...prev, age: age >= 0 ? age.toString() : "" }))
    } else {
        setFormData(prev => ({ ...prev, age: "" }))
    }
  }, [formData.dob])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.clinicName || !formData.doctorName || !formData.patientName || !formData.dob || !formData.appointmentDate || !formData.appointmentTime) {
      alert("Please fill in all required fields marked with *")
      return
    }
    
    console.log("Booking Appointment:", formData)
    // Add logic to submit data or navigate
    // router.push(...)
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      {/* Clinic & Doctor Information */}
      <div className="mb-8">
        <h2 className="text-gray-700 font-semibold mb-4">Clinic & Doctor Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="clinicName" className="text-gray-600">
              Clinic Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="clinicName"
              name="clinicName"
              value={formData.clinicName}
              onChange={handleChange}
              className="bg-white"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="doctorName" className="text-gray-600">
              Doctor Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="doctorName"
              name="doctorName"
              placeholder="Enter doctor name"
              value={formData.doctorName}
              onChange={handleChange}
              className="bg-white"
            />
          </div>
        </div>
      </div>

      {/* Patient Information */}
      <div className="mb-8">
        <h2 className="text-gray-700 font-semibold mb-4">Patient Information</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="patientName" className="text-gray-600">
              Patient Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="patientName"
              name="patientName"
              placeholder="Enter full name"
              value={formData.patientName}
              onChange={handleChange}
              className="bg-white"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 relative">
              <Label htmlFor="dob" className="text-gray-600">
                Date of Birth <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="dob"
                  name="dob"
                  type="date"
                  placeholder="dd-mm-yyyy"
                  value={formData.dob}
                  onChange={handleChange}
                  className="bg-white block w-full"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="age" className="text-gray-600">
                Age (Years)
              </Label>
              <Input
                id="age"
                name="age"
                value={formData.age}
                readOnly
                className="bg-gray-50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Schedule */}
      <div className="mb-8">
        <h2 className="text-gray-700 font-semibold mb-4">Appointment Schedule</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
             <Label htmlFor="appointmentDate" className="text-gray-600">
                Appointment Date <span className="text-red-500">*</span>
             </Label>
             <Input
                id="appointmentDate"
                name="appointmentDate"
                type="date"
                placeholder="dd-mm-yyyy"
                value={formData.appointmentDate}
                onChange={handleChange}
                className="bg-white"
             />
          </div>
          <div className="space-y-2">
             <Label htmlFor="appointmentTime" className="text-gray-600">
                Appointment Time <span className="text-red-500">*</span>
             </Label>
             <div className="relative">
                <Input
                    id="appointmentTime"
                    name="appointmentTime"
                    type="time"
                    placeholder="--:--"
                    value={formData.appointmentTime}
                    onChange={handleChange}
                    className="bg-white"
                />
             </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col md:flex-row items-center justify-between pt-4 border-t border-gray-100 mt-8">
        <div className="text-sm text-red-500 mb-4 md:mb-0">
          * Required fields
        </div>
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={handleCancel}
            className="px-6 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            className="px-6 bg-teal-600 hover:bg-teal-700 text-white"
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </div>
  )
}
