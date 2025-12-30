'use client'

import { useState } from 'react'
import { Settings, Check, X, Calendar, Search, RefreshCw } from 'lucide-react'
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
  
  // Missing states fixed
  const [filterDate, setFilterDate] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

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

  // Handlers for top bar
  const handleDateChange = (e) => setFilterDate(e.target.value)
  const handleSearchChange = (e) => setSearchTerm(e.target.value)

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
    
    // Also filter by top bar search term if present (checking name or doctor)
    const topBarMatch = searchTerm 
      ? (apt.name.toLowerCase().includes(searchTerm.toLowerCase()) || apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase()))
      : true
      
    return matchName && matchMobile && topBarMatch
  })

  return (
    <div className="p-6 space-y-6">
      {/* Professional Header Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        {/* Left: Title */}
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-xl bg-medivardaan-blue/10 flex items-center justify-center shadow-sm">
             <Calendar className="w-6 h-6 text-medivardaan-blue" />
           </div>
           <div>
             <h1 className="text-2xl font-bold text-[#0f7396] dark:text-[#0f7396] tracking-tight">Appointments</h1>
             <p className="text-slate-500 text-sm">Manage patient schedules</p>
           </div>
        </div>

        {/* Right: Actions Toolbar */}
        <div className="flex flex-wrap items-center gap-3 bg-white dark:bg-slate-900 p-2 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
           {/* Date Picker */}
           <Input
            type="date"
            value={filterDate}
            onChange={handleDateChange}
            className="w-40 border-0 bg-transparent focus:ring-0 text-sm"
          />
          <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1"></div>
          
           {/* Search */}
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <Input
               type="text"
               placeholder="Search doctor..."
               value={searchTerm}
               onChange={handleSearchChange}
               className="pl-9 w-60 border-0 bg-slate-50 dark:bg-slate-800 rounded-lg focus:ring-2 focus:ring-medivardaan-blue/20"
             />
          </div>
          
          <Button variant="ghost" size="icon" className="text-slate-500 hover:text-medivardaan-blue">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Search Filters Card */}
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
             {/* Visitor Name */}
             <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Visitor Name</Label>
                <Input
                    placeholder="Visitor Name"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    className="h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 w-full"
                />
             </div>

             {/* Mobile No */}
             <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Mobile No.</Label>
                <Input
                    placeholder="Mobile No."
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                    className="h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 w-full"
                />
             </div>

             {/* Clinic Name */}
             <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Clinic Name</Label>
                <Select value={selectedClinic} onValueChange={setSelectedClinic}>
                    <SelectTrigger className="h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 w-full">
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
             <div className="space-y-2">
               <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Doctor Name</Label>
               <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                  <SelectTrigger className="h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 w-full">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end mt-6">
            {/* From Date */}
            <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">From Date</Label>
                <Input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 w-full"
                />
            </div>

            {/* To Date */}
            <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">To Date</Label>
                <Input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="h-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 w-full"
                />
            </div>

            {/* Approval Status */}
            <div className="lg:col-span-2 flex justify-between items-end h-10">
                <div className="flex gap-6 items-center h-full">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                        type="radio"
                        name="approvalStatus"
                        value="approve"
                        checked={approvalFilter === 'approve'}
                        onChange={(e) => setApprovalFilter(e.target.value)}
                        className="w-4 h-4 cursor-pointer text-medivardaan-blue focus:ring-medivardaan-blue"
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
                        className="w-4 h-4 cursor-pointer text-medivardaan-blue focus:ring-medivardaan-blue"
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
                        className="w-4 h-4 cursor-pointer text-medivardaan-blue focus:ring-medivardaan-blue"
                        />
                        <span className="text-sm font-medium">All</span>
                    </label>
                </div>
                
                 {/* Search Button */}
                <Button
                    onClick={handleSearch}
                    className="bg-medivardaan-blue hover:bg-medivardaan-blue-dark text-white px-8 h-10"
                >
                    Search
                </Button>
            </div>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="card-premium overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700">
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
                className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
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
