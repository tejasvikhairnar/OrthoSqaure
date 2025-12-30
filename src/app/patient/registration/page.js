'use client'

import RegistrationForm from '@/components/patient/RegistrationForm'

export default function PatientRegistrationPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-2">
      <div className="container mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0f7396]">Patient Registration</h1>
          <p className="text-gray-600 mt-1">Register a new patient</p>
        </div>
        <RegistrationForm />
      </div>
    </div>
  )
}
