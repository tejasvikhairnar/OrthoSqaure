'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'

export default function BookAppointmentsPage() {
  const router = useRouter()

  useEffect(() => {
    // Get today's date
    const today = new Date()
    const formattedDate = format(today, 'dd-MMM-yyyy')

    // Default values for clinic and doctor
    const defaultClinic = 'Panvel'
    const defaultDoctor = ''

    // Redirect directly to book-form page
    router.push(`/appointments/book-form?date=${formattedDate}&clinic=${defaultClinic}&doctor=${defaultDoctor}`)
  }, [router])

  return (
    <div className="p-6 flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-lg text-muted-foreground">Redirecting to book appointment...</p>
      </div>
    </div>
  )
}
