'use client'

import { useState } from 'react'
import { Settings, Check, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function AllAppointmentsListPage() {
  const [approvalFilter, setApprovalFilter] = useState('approve')
  const [visitorName, setVisitorName] = useState('')
  const [mobileNo, setMobileNo] = useState('')
  const [selectedClinic, setSelectedClinic] = useState('Panvel')
  const [selectedDoctor, setSelectedDoctor] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  // Mock appointments data with approval status
  const [appointments, setAppointments] = useState([
    { id: 1, name: 'Sourabh Desai', doctorName: 'Dr. Kinnari Lade', date: '20-Sep-2025', time: '18 00 PM', status: 'approved' },
    { id: 2, name: 'Sayali Date', doctorName: 'Dr. Rajesh Kumar', date: '18-Sep-2025', time: '14 00 PM', status: 'approved' },
    { id: 3, name: 'H Dinakar Shetty', doctorName: 'Dr. Priya Singh', date: '20-Sep-2025', time: '11 00 AM', status: 'approved' },
    { id: 4, name: 'Ram Patil', doctorName: 'Dr. Kinnari Lade', date: '27-Sep-2025', time: '14 00 PM', status: 'approved' },
    { id: 5, name: 'Vinayk Dalvi', doctorName: 'Dr. Rajesh Kumar', date: '27-Sep-2025', time: '12 30 PM', status: 'approved' },
    { id: 6, name: 'Eshu', doctorName: 'Dr. Kinnari Lade', date: '26-Sep-2025', time: '19 30 PM', status: 'rejected' },
    { id: 7, name: 'Devidas Bhimrao Patil', doctorName: 'Dr. Priya Singh', date: '27-Sep-2025', time: '18 00 PM', status: 'approved' },
    { id: 8, name: 'Bhagat', doctorName: 'Dr. Kinnari Lade', date: '27-Sep-2025', time: '19 00 PM', status: 'rejected' },
    { id: 9, name: 'Deepak Patil', doctorName: 'Dr. Rajesh Kumar', date: '15-Oct-2025', time: '19 00 PM', status: 'approved' },
    { id: 10, name: 'Devisldas patil', doctorName: 'Dr. Kinnari Lade', date: '16-Oct-2025', time: '19 00 PM', status: 'rejected' },
  ])

  const handleApprove = (appointmentId) => {
    setAppointments(prevAppointments =>
      prevAppointments.map(apt =>
        apt.id === appointmentId ? { ...apt, status: 'approved' } : apt
      )
    )
  }

  const handleReject = (appointmentId) => {
    setAppointments(prevAppointments =>
      prevAppointments.map(apt =>
        apt.id === appointmentId ? { ...apt, status: 'rejected' } : apt
      )
    )
  }

  const handleSearch = () => {
    // Implement search logic here
    console.log('Searching with filters:', { visitorName, mobileNo, selectedClinic, selectedDoctor, fromDate, toDate, approvalFilter })
  }

  // Filter appointments based on approval status
  const filteredAppointments = appointments.filter(apt => {
    if (approvalFilter === 'all') return true
    if (approvalFilter === 'approve') return apt.status === 'approved'
    if (approvalFilter === 'reject') return apt.status === 'rejected'
    return true
  })

  // Further filter by search criteria
  const searchFilteredAppointments = filteredAppointments.filter(apt => {
    const matchName = visitorName ? apt.name.toLowerCase().includes(visitorName.toLowerCase()) : true
    const matchMobile = mobileNo ? true : true // Add mobile matching logic when data available
    return matchName && matchMobile
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/20">
          <Settings className="w-5 h-5 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold text-red-600">ALL APPOINTMENT LIST</h1>
      </div>

      {/* Search Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Visitor Name */}
        <div>
          <Input
            placeholder="Visitor Name"
            value={visitorName}
            onChange={(e) => setVisitorName(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Mobile No */}
        <div>
          <Input
            placeholder="Mobile No."
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Clinic Name */}
        <div>
          <Select value={selectedClinic} onValueChange={setSelectedClinic}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Panvel">Panvel</SelectItem>
              <SelectItem value="Mumbai">Mumbai</SelectItem>
              <SelectItem value="Pune">Pune</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Doctor Name */}
        <div>
          <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="--- Select ---" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="doctor1">Dr. Kinnari Lade</SelectItem>
              <SelectItem value="doctor2">Dr. Rajesh Kumar</SelectItem>
              <SelectItem value="doctor3">Dr. Priya Singh</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Radio Buttons and Date Filters */}
      <div className="flex flex-wrap items-center gap-6 mb-6">
        {/* Approval Status Radio Buttons */}
        <div className="flex gap-6 items-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="approvalStatus"
              value="approve"
              checked={approvalFilter === 'approve'}
              onChange={(e) => setApprovalFilter(e.target.value)}
              className="w-4 h-4 cursor-pointer"
            />
            <span className="text-sm font-medium">Approve</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="approvalStatus"
              value="reject"
              checked={approvalFilter === 'reject'}
              onChange={(e) => setApprovalFilter(e.target.value)}
              className="w-4 h-4 cursor-pointer"
            />
            <span className="text-sm font-medium">Reject</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="approvalStatus"
              value="all"
              checked={approvalFilter === 'all'}
              onChange={(e) => setApprovalFilter(e.target.value)}
              className="w-4 h-4 cursor-pointer"
            />
            <span className="text-sm font-medium">All</span>
          </label>
        </div>

        {/* From Date */}
        <div className="space-y-1">
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">From</Label>
          <Input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full"
          />
        </div>

        {/* To Date */}
        <div className="space-y-1">
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">To</Label>
          <Input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          className="bg-orange-600 hover:bg-orange-700 text-white px-8"
        >
          Search
        </Button>
      </div>

      {/* Appointments Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-green-100 dark:bg-green-900/20">
              <th className="px-4 py-3 text-left text-sm font-medium">Sr. No.</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Doctor Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium">Time</th>
              {approvalFilter === 'all' && (
                <th className="px-4 py-3 text-center text-sm font-medium">Status</th>
              )}
              <th className="px-4 py-3 text-center text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchFilteredAppointments.map((appointment, index) => (
              <tr
                key={appointment.id}
                className="border-t border-border hover:bg-accent/50 transition-colors"
              >
                <td className="px-4 py-3 text-sm">{index + 1}</td>
                <td className="px-4 py-3 text-sm">{appointment.name}</td>
                <td className="px-4 py-3 text-sm">{appointment.doctorName}</td>
                <td className="px-4 py-3 text-sm">{appointment.date}</td>
                <td className="px-4 py-3 text-sm">{appointment.time}</td>
                {approvalFilter === 'all' && (
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center">
                      {appointment.status === 'approved' ? (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Approved
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 flex items-center gap-1">
                          <X className="w-3 h-3" />
                          Rejected
                        </span>
                      )}
                    </div>
                  </td>
                )}
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleApprove(appointment.id)}
                      className="p-1.5 rounded-full bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-600 dark:text-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Approve"
                      disabled={appointment.status === 'approved'}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleReject(appointment.id)}
                      className="p-1.5 rounded-full bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Reject"
                      disabled={appointment.status === 'rejected'}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {searchFilteredAppointments.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No appointments found for the selected filter.
        </div>
      )}

      {/* Pagination Info */}
      <div className="flex justify-end text-sm text-muted-foreground">
        Showing {searchFilteredAppointments.length} of {appointments.length} appointments
      </div>
    </div>
  )
}
