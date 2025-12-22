"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Edit } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PatientSearchPage() {
  const router = useRouter();

  const [searchForm, setSearchForm] = useState({
    patientName: "",
    mobileNo: "",
    clinic: "",
    fromDate: "",
    toDate: "",
  });

  // Sample patient data - replace with API call
  const [patientsList, setPatientsList] = useState([
    {
      id: "P113286",
      casePaperNo: "76741",
      name: "Simran Shaikh",
      mobileNo: "9076002891",
      registrationDate: "10-Dec-2025",
      clinicName: "MALAD West",
      age: 28,
      gender: "Female",
      dob: "1997-03-15",
      visits: 3,
      lastDiagnosis: "Dental Check-up",
    },
    {
      id: "P113285",
      casePaperNo: "",
      name: "Jitendra Patil",
      mobileNo: "9820758454",
      registrationDate: "10-Dec-2025",
      clinicName: "Ghodbunder road",
      age: 35,
      gender: "Male",
      dob: "1989-07-20",
      visits: 5,
      lastDiagnosis: "Root Canal",
    },
    {
      id: "P113284",
      casePaperNo: "74110",
      name: "Bishwajit chatia",
      mobileNo: "6002869901",
      registrationDate: "10-Dec-2025",
      clinicName: "JayaNagar",
      age: 42,
      gender: "Male",
      dob: "1982-11-05",
      visits: 7,
      lastDiagnosis: "Tooth Extraction",
    },
    {
      id: "P113283",
      casePaperNo: "75780",
      name: "sheshank P",
      mobileNo: "8411810069",
      registrationDate: "10-Dec-2025",
      clinicName: "MADHAPUR",
      age: 31,
      gender: "Male",
      dob: "1993-08-12",
      visits: 2,
      lastDiagnosis: "Cleaning",
    },
    {
      id: "P113282",
      casePaperNo: "75727",
      name: "sreya B",
      mobileNo: "9848568606",
      registrationDate: "10-Dec-2025",
      clinicName: "MADHAPUR",
      age: 25,
      gender: "Female",
      dob: "1999-04-18",
      visits: 1,
      lastDiagnosis: "Consultation",
    },
  ]);

  const [filteredPatients, setFilteredPatients] = useState(patientsList);

  function handleSearchChange(e) {
    setSearchForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  function handleSearch() {
    let filtered = patientsList;

    if (searchForm.patientName) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchForm.patientName.toLowerCase())
      );
    }

    if (searchForm.mobileNo) {
      filtered = filtered.filter((p) => p.mobileNo.includes(searchForm.mobileNo));
    }

    if (searchForm.clinic && searchForm.clinic !== "all") {
      filtered = filtered.filter((p) =>
        p.clinicName.toLowerCase().includes(searchForm.clinic.toLowerCase())
      );
    }

    // Add date filtering logic here if needed

    setFilteredPatients(filtered);
  }

  function handleViewConsultation(patient) {
    // Navigate to consultation page with patient data
    router.push(`/MIS/consultation?patientId=${patient.id}`);
  }

  function handleEditPatient(patient) {
    // Navigate to edit patient page with patient data
    console.log("Navigating to edit page for patient:", patient.id);
    router.push(`/MIS/patient-edit?patientId=${patient.id}`);
  }

  function handleExcelUpload() {
    // Handle Excel upload logic
    console.log("Excel upload clicked");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Search Patient Section */}
        <Card className="border border-gray-200 dark:border-gray-700 shadow-md bg-white dark:bg-gray-800">
          <CardHeader className="p-4 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800">
            <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 flex items-center gap-2">
              <span className="text-red-500">⚙</span> PATIENT
            </h2>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="space-y-2">
                <Input
                  name="patientName"
                  placeholder="Patient Name"
                  value={searchForm.patientName}
                  onChange={handleSearchChange}
                  className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600"
                />
              </div>
              <div className="space-y-2">
                <Input
                  name="mobileNo"
                  placeholder="Mobile No"
                  value={searchForm.mobileNo}
                  onChange={handleSearchChange}
                  className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600"
                />
              </div>
              <div className="space-y-2">
                <Select
                  value={searchForm.clinic}
                  onValueChange={(value) => setSearchForm({ ...searchForm, clinic: value })}
                >
                  <SelectTrigger className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600">
                    <SelectValue placeholder="-- Select Clinic --" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Clinics</SelectItem>
                    <SelectItem value="malad">MALAD West</SelectItem>
                    <SelectItem value="ghodbunder">Ghodbunder road</SelectItem>
                    <SelectItem value="jayanagar">JayaNagar</SelectItem>
                    <SelectItem value="madhapur">MADHAPUR</SelectItem>
                    <SelectItem value="aundh">Aundh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Input
                  type="date"
                  name="fromDate"
                  placeholder="From Date"
                  value={searchForm.fromDate}
                  onChange={handleSearchChange}
                  className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600"
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="date"
                  name="toDate"
                  placeholder="To Date"
                  value={searchForm.toDate}
                  onChange={handleSearchChange}
                  className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSearch} className="bg-red-600 hover:bg-red-700 text-white px-8">
                  Search
                </Button>
                <Button
                  onClick={handleExcelUpload}
                  variant="outline"
                  className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600 px-6"
                >
                  Excel upload
                </Button>
              </div>
            </div>

            {/* Patient List Table */}
            <div className="mt-6">
              <div className="flex justify-end mb-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total: <span className="font-semibold">{filteredPatients.length}</span>
                </p>
              </div>
              <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-green-100 dark:bg-green-900/20">
                      <th className="p-3 text-left font-medium text-gray-700 dark:text-gray-300">Sr. No.</th>
                      <th className="p-3 text-left font-medium text-gray-700 dark:text-gray-300">Case Paper No.</th>
                      <th className="p-3 text-left font-medium text-gray-700 dark:text-gray-300">Name</th>
                      <th className="p-3 text-left font-medium text-gray-700 dark:text-gray-300">Mobile No</th>
                      <th className="p-3 text-left font-medium text-gray-700 dark:text-gray-300">Registration Date</th>
                      <th className="p-3 text-left font-medium text-gray-700 dark:text-gray-300">Clinic Name</th>
                      <th className="p-3 text-center font-medium text-gray-700 dark:text-gray-300">#</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800">
                    {filteredPatients.length > 0 ? (
                      filteredPatients.map((patient, index) => (
                        <tr
                          key={patient.id}
                          className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900"
                        >
                          <td className="p-3 text-gray-800 dark:text-gray-100">{index + 1}</td>
                          <td className="p-3 text-gray-800 dark:text-gray-100">{patient.casePaperNo || "-"}</td>
                          <td className="p-3 text-gray-800 dark:text-gray-100">{patient.name}</td>
                          <td className="p-3 text-gray-800 dark:text-gray-100">{patient.mobileNo}</td>
                          <td className="p-3 text-gray-800 dark:text-gray-100">{patient.registrationDate}</td>
                          <td className="p-3 text-gray-800 dark:text-gray-100">{patient.clinicName}</td>
                          <td className="p-3 text-center">
                            <div className="flex justify-center gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleViewConsultation(patient)}
                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950 h-8 w-8 p-0"
                                title="View Consultation"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleEditPatient(patient)}
                                className="text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950 h-8 w-8 p-0"
                                title="Edit Patient Details"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="p-8 text-center text-gray-500 dark:text-gray-400">
                          No patients found. Try adjusting your search criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
