"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileSpreadsheet, Settings } from "lucide-react";
import { exportToExcel } from "@/utils/exportToExcel";
import CustomPagination from "@/components/ui/custom-pagination";

export default function PaymentModeClinicReportPage() {
  const [clinicName, setClinicName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [year, setYear] = useState("2025");
  const [month, setMonth] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [reportData, setReportData] = useState([
    { id: 1, month: "January", cash: "7564177.37", cheque: "0.00", debitCard: "3187399.99", creditCard: "1147875.00", upi: "13293033.33", bajaj: "1995399.99", creditFair: "0.00", liquid: "0.00", shopse: "0.00", shopseDebit: "1450200.00", shopseHDFC: "1241000.00", shopseCredit: "2961000.00", shopseAmex: "132000.00", neft: "328158.99", razorpay: "1247096.01", savein: "4427086.66", unofin: "3027799.99", fibe: "4949031.51", flexUpi: "0.00", medibuddy: "0.00", total: "46951236.84" },
    { id: 2, month: "February", cash: "6847592.04", cheque: "0.00", debitCard: "1982520.99", creditCard: "1033580.00", upi: "13226507.85", bajaj: "1834433.33", creditFair: "0.00", liquid: "0.00", shopse: "0.00", shopseDebit: "1891700.00", shopseHDFC: "1291000.00", shopseCredit: "3598817.51", shopseAmex: "293500.00", neft: "683000.00", razorpay: "1219304.00", savein: "5703109.00", unofin: "0.00", fibe: "4935337.35", flexUpi: "0.00", medibuddy: "0.00", total: "44550402.07" },
    { id: 3, month: "March", cash: "7804950.87", cheque: "0.00", debitCard: "1723236.70", creditCard: "1977288.00", upi: "14244699.58", bajaj: "1881520.00", creditFair: "0.00", liquid: "0.00", shopse: "0.00", shopseDebit: "1882200.33", shopseHDFC: "928500.00", shopseCredit: "3645500.00", shopseAmex: "385000.00", neft: "329071.99", razorpay: "1183703.67", savein: "8356255.58", unofin: "0.00", fibe: "7061473.11", flexUpi: "0.00", medibuddy: "0.00", total: "51201399.83" },
    {
      id: 1,
      clinic: "Vashi",
      city: "Navi Mumbai",
      year: "2019",
      month: "March",
      bankDeposit: "5000",
      cash: "2000",
      card: "1000",
      paytm: "500",
      bajajFinance: "0",
      total: "8500",
    },
     {
      id: 2,
      clinic: "Andheri",
      city: "Mumbai",
      year: "2019",
      month: "March",
      bankDeposit: "4000",
      cash: "3000",
      card: "2000",
      paytm: "1000",
      bajajFinance: "500",
      total: "10500",
    },
    {
        id: 3,
        clinic: "Borivali",
        city: "Mumbai",
        year: "2019",
        month: "April",
        bankDeposit: "6000",
        cash: "4000",
        card: "0",
        paytm: "0",
        bajajFinance: "0",
        total: "10000",
      },
  ]);

  const [filteredReportData, setFilteredReportData] = useState(reportData);

    useEffect(() => {
        setFilteredReportData(reportData);
    }, [reportData]);

  const handleSearch = () => {
        let result = reportData;

        if (clinicName) {
            const searchStr = clinicName.toLowerCase().replace(/_/g, " ");
            result = result.filter(item => {
                 const cVal = item.clinic.toLowerCase();
                 const selectedNormalized = clinicName.toLowerCase().replace(/_/g, " ");
                 return cVal.includes(selectedNormalized) || selectedNormalized.includes(cVal);
            });
        }
        
        if (doctorName) {
            // Note: Data doesn't have doctor name column, but typically reports filter by doctor association.
            // Since mock data lacks it, we skip filtering by doctor for now or assume it triggers a backend filter.
             console.log("Filtering by doctor not locally supported in this mock data structure");
        }

        if (year) {
             result = result.filter(item => item.year === year);
        }

        if (month) {
             const monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
             const selectedMonthIndex = parseInt(month) - 1;
             if (selectedMonthIndex >= 0 && selectedMonthIndex < 12) {
                 const selectedMonthName = monthNames[selectedMonthIndex];
                 result = result.filter(item => item.month.toLowerCase() === selectedMonthName);
             }
        }

        if (fromDate) {
           // Placeholder for date logic
        }
        
        if (toDate) {
           // Placeholder for date logic
        }

        setFilteredReportData(result);
        setCurrentPage(1);
  };
    
    const handleClear = () => {
      setClinicName("");
      setDoctorName("");
      setYear("");
      setMonth("");
      setFromDate("");
      setToDate("");
      setFilteredReportData(reportData);
      setCurrentPage(1);
    }

  const handleExport = () => {
    exportToExcel(filteredReportData, "Payment_Mode_Clinic_Report");
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredReportData.slice(indexOfFirstItem, indexOfLastItem);

  const calculateTotal = (key) => filteredReportData.reduce((acc, curr) => acc + parseFloat(curr[key] || 0), 0);
  
  const totalBankDeposit = calculateTotal('bankDeposit');
  const totalCash = calculateTotal('cash');
  const totalCard = calculateTotal('card');
  const totalPaytm = calculateTotal('paytm');
  const totalBajaj = calculateTotal('bajajFinance');
  const totalAmount = calculateTotal('total');

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
          <Settings className="w-4 h-4 text-red-600" />
        </div>
        <h1 className="text-xl font-bold text-red-600 dark:text-red-500 uppercase">
          PAYMENT MODE CLINIC REPORT
        </h1>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-end bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 font-normal">
        {/* Clinic Name (Required) */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
             Clinic Name <span className="text-red-500">*</span>
          </label>
           <Select value={clinicName} onValueChange={setClinicName}>
            <SelectTrigger className="h-10 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700">
                <SelectValue placeholder="-- Select Clinic --" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="vashi">Vashi</SelectItem>
                <SelectItem value="andheri">Andheri</SelectItem>
                <SelectItem value="borivali">Borivali</SelectItem>
            </SelectContent>
            </Select>
        </div>

         {/* Doctor */}
         <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Doctor
          </label>
           <Input
            placeholder=""
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            className="h-10 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
          />
        </div>
        
        {/* Year */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Year
          </label>
           <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="h-10 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700">
                <SelectValue placeholder="-- Select --" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="2019">2019</SelectItem>
                <SelectItem value="2020">2020</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
            </SelectContent>
            </Select>
        </div>

        {/* Month */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Month
          </label>
           <Select value={month} onValueChange={setMonth}>
            <SelectTrigger className="h-10 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700">
                <SelectValue placeholder="-- Select --" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="1">January</SelectItem>
                <SelectItem value="2">February</SelectItem>
                <SelectItem value="3">March</SelectItem>
                <SelectItem value="4">April</SelectItem>
                <SelectItem value="5">May</SelectItem>
                <SelectItem value="6">June</SelectItem>
                <SelectItem value="7">July</SelectItem>
                <SelectItem value="8">August</SelectItem>
                <SelectItem value="9">September</SelectItem>
                <SelectItem value="10">October</SelectItem>
                <SelectItem value="11">November</SelectItem>
                <SelectItem value="12">December</SelectItem>
            </SelectContent>
            </Select>
        </div>


        {/* From Date */}
        <div className="space-y-1">
           <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            From Date
          </label>
           <Input
            type="date"
            placeholder="From Date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="h-10 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
          />
        </div>

        {/* To Date */}
        <div className="space-y-1">
           <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            To Date
          </label>
           <Input
            type="date"
            placeholder="To Date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="h-10 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button
             onClick={handleSearch}
            className="bg-[#D35400] hover:bg-[#ba4a00] text-white flex-1 h-10 transition-colors"
          >
            Search
          </Button>
           <Button
             onClick={handleClear}
             className="bg-[#A01A1A] hover:bg-[#8a1616] text-white flex-1 h-10 transition-colors"
          >
            Clear
          </Button>
        </div>
      </div>

       {/* Total Count */}
      <div className="flex justify-end pr-2">
         <span className="font-semibold text-gray-600 dark:text-gray-400 text-sm">Total : {totalAmount.toFixed(0)}</span>
      </div>

      {/* Table */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-t-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-[#e6ffcc] dark:bg-[#e6ffcc]/20">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[60px] font-bold text-gray-800 dark:text-gray-200 border-r border-white dark:border-gray-600">
                Sr. No.
              </TableHead>
              <TableHead className="font-bold text-gray-800 dark:text-gray-200 border-r border-white dark:border-gray-600">
                Clinic Name
              </TableHead>
              <TableHead className="font-bold text-gray-800 dark:text-gray-200 border-r border-white dark:border-gray-600">
                City
              </TableHead>
              <TableHead className="font-bold text-gray-800 dark:text-gray-200 border-r border-white dark:border-gray-600">
                Year
              </TableHead>
              <TableHead className="font-bold text-gray-800 dark:text-gray-200 border-r border-white dark:border-gray-600">
                Month
              </TableHead>
              <TableHead className="font-bold text-gray-800 dark:text-gray-200 border-r border-white dark:border-gray-600 text-right">
                Bank Deposit Amount
              </TableHead>
              <TableHead className="font-bold text-gray-800 dark:text-gray-200 border-r border-white dark:border-gray-600 text-right">
                Cash Amount
              </TableHead>
               <TableHead className="font-bold text-gray-800 dark:text-gray-200 border-r border-white dark:border-gray-600 text-right">
                Card Amount
              </TableHead>
              <TableHead className="font-bold text-gray-800 dark:text-gray-200 border-r border-white dark:border-gray-600 text-right">
                Paytm Amount
              </TableHead>
              <TableHead className="font-bold text-gray-800 dark:text-gray-200 border-r border-white dark:border-gray-600 text-right">
                Bajaj Finance
              </TableHead>
               <TableHead className="font-bold text-gray-800 dark:text-gray-200 text-right">
                 Total
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((row, index) => (
              <TableRow
                key={row.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700"
              >
                <TableCell className="font-medium text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700 py-3">
                  {indexOfFirstItem + index + 1}
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700 py-3">
                  {row.clinic}
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700 py-3">
                  {row.city}
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700 py-3">
                  {row.year}
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700 py-3">
                  {row.month}
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700 py-3 text-right">
                  {row.bankDeposit}
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700 py-3 text-right">
                  {row.cash}
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700 py-3 text-right">
                  {row.card}
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700 py-3 text-right">
                  {row.paytm}
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-300 border-r border-gray-200 dark:border-gray-700 py-3 text-right">
                  {row.bajajFinance}
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-300 py-3 text-right">
                  {row.total}
                </TableCell>
              </TableRow>
            ))}
             <TableRow className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30">
                 <TableCell colSpan={5} className="border-r border-gray-200 dark:border-gray-700 py-3 text-right pr-4 font-bold text-gray-700 dark:text-gray-300">
                    Total
                 </TableCell>
                 <TableCell className="font-bold text-gray-700 dark:text-gray-300 py-3 text-right">
                    {totalBankDeposit.toFixed(0)}
                 </TableCell>
                 <TableCell className="font-bold text-gray-700 dark:text-gray-300 py-3 text-right">
                    {totalCash.toFixed(0)}
                 </TableCell>
                 <TableCell className="font-bold text-gray-700 dark:text-gray-300 py-3 text-right">
                    {totalCard.toFixed(0)}
                 </TableCell>
                 <TableCell className="font-bold text-gray-700 dark:text-gray-300 py-3 text-right">
                    {totalPaytm.toFixed(0)}
                 </TableCell>
                 <TableCell className="font-bold text-gray-700 dark:text-gray-300 py-3 text-right">
                    {totalBajaj.toFixed(0)}
                 </TableCell>
                  <TableCell className="font-bold text-gray-700 dark:text-gray-300 py-3 text-right">
                    {totalAmount.toFixed(0)}
                 </TableCell>
             </TableRow>
          </TableBody>
        </Table>
      </div>
      
       {/* Footer / Pagination / Export */}
      <div className="flex justify-between items-center mt-4">
        {/* Excel Export */}
        <div className="cursor-pointer" onClick={handleExport} title="Download Excel">
           <div className="w-8 h-8 flex items-center justify-center bg-green-700 hover:bg-green-800 text-white rounded shadow transition-colors">
            <FileSpreadsheet className="w-5 h-5" />
           </div>
        </div>
        
        {/* Pagination component */}
        <CustomPagination 
            totalItems={filteredReportData.length} 
            itemsPerPage={itemsPerPage} 
            currentPage={currentPage} 
            onPageChange={setCurrentPage} 
        />
      </div>
    </div>
  );
}
