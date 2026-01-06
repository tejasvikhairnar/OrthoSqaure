// "use client";

// import React, { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Loader2, Settings, Search, X, FileSpreadsheet } from "lucide-react"; 
// import CustomPagination from "@/components/ui/custom-pagination";

// // Hooks
// import { useInvoices } from "@/hooks/useInvoices";
// import { useDoctors } from "@/hooks/useDoctors";

// export default function ViewInvoicePage() {
//   const [filters, setFilters] = useState({
//     clinicName: "",
//     doctorName: "",
//     patientName: "",
//     invoiceNo: "",
//     fromDate: new Date().toISOString().split("T")[0], 
//     toDate: new Date().toISOString().split("T")[0],
//   });

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   // Fetch Data
//   const { data: invoices = [], isLoading, error, refetch } = useInvoices(filters);
//   const { data: doctors = [] } = useDoctors();

//   const handleFilterChange = (field, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleSearch = () => {
//     refetch();
//     setCurrentPage(1); // Reset to first page on search
//   };

//   const handleClear = () => {
//     setFilters({
//       clinicName: "",
//       doctorName: "",
//       patientName: "",
//       invoiceNo: "",
//       fromDate: "",
//       toDate: "",
//     });
//     // Optional: automatic refetch on clear or wait for search
//   };

//   // Client-side pagination logic (assuming API returns all data for now as per previous patterns)
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = invoices.slice(indexOfFirstItem, indexOfLastItem);

//   return (
//     <div className="w-full p-4 space-y-6 min-h-screen transition-colors duration-300">
//       {/* Header */}
//       <div className="flex items-center gap-3 pb-2 border-b border-gray-200 dark:border-gray-800">
//         <div className="p-2 rounded-lg bg-[#0f7396]/10 dark:bg-[#0f7396]/20">
//              <Settings className="w-5 h-5 text-[#0f7396] dark:text-[#0f7396] animate-spin-slow" />
//         </div>
//         <h1 className="text-xl font-bold text-medivardaan-blue uppercase tracking-wide">
//           View Invoices
//         </h1>
//       </div>

//       {/* Filters Section */}
//       <Card className="border-border shadow-sm bg-card">
//         <CardContent className="p-6 space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
//                 {/* Clinic Name */}
//                 <div className="space-y-2">
//                 <Label className="text-sm font-medium text-foreground/80">Clinic Name</Label>
//                 <Select
//                     value={filters.clinicName}
//                     onValueChange={(val) => handleFilterChange("clinicName", val)}
//                 >
//                     <SelectTrigger className="h-10 bg-background border-input w-full">
//                     <SelectValue placeholder="All Clinics" />
//                     </SelectTrigger>
//                     <SelectContent>
//                     <SelectItem value="panvel">Panvel</SelectItem>
//                     <SelectItem value="pune">Pune</SelectItem>
//                     <SelectItem value="mumbai">Mumbai</SelectItem>
//                     <SelectItem value="nashik">Nashik</SelectItem>
//                     <SelectItem value="dwarka">Dwarka</SelectItem>
//                     <SelectItem value="vile-parle">Vile-Parle East</SelectItem>
//                     <SelectItem value="kharghar">Kharghar</SelectItem>
//                     <SelectItem value="lajpat-nagar">Lajpat Nagar</SelectItem>
//                     </SelectContent>
//                 </Select>
//                 </div>

//                 {/* Doctor Name */}
//                 <div className="space-y-2">
//                 <Label className="text-sm font-medium text-foreground/80">Doctor Name</Label>
//                 <Select
//                     value={filters.doctorName}
//                     onValueChange={(val) => handleFilterChange("doctorName", val)}
//                 >
//                     <SelectTrigger className="h-10 bg-background border-input w-full">
//                     <SelectValue placeholder="All Doctors" />
//                     </SelectTrigger>
//                     <SelectContent>
//                     {doctors.map((doc) => (
//                         <SelectItem key={doc.doctorID} value={doc.name}>
//                         {doc.name}
//                         </SelectItem>
//                     ))}
//                     {!doctors.length && <SelectItem value="dr-mock">Dr. Mock</SelectItem>}
//                     </SelectContent>
//                 </Select>
//                 </div>

//                 {/* Patient Name */}
//                 <div className="space-y-2">
//                 <Label className="text-sm font-medium text-foreground/80">Patient Name</Label>
//                 <Input
//                     className="h-10 bg-background border-input w-full"
//                     placeholder="Search by name..."
//                     value={filters.patientName}
//                     onChange={(e) => handleFilterChange("patientName", e.target.value)}
//                 />
//                 </div>

//                 {/* Invoice No */}
//                 <div className="space-y-2">
//                 <Label className="text-sm font-medium text-foreground/80">Invoice No</Label>
//                 <Input
//                     className="h-10 bg-background border-input w-full"
//                     placeholder="INV-001..."
//                     value={filters.invoiceNo}
//                     onChange={(e) => handleFilterChange("invoiceNo", e.target.value)}
//                 />
//                 </div>

//                 {/* From Date */}
//                 <div className="space-y-2">
//                     <Label className="text-sm font-medium text-foreground/80">From Date</Label>
//                     <Input
//                         type="date"
//                         className="h-10 bg-background border-input w-full"
//                         value={filters.fromDate}
//                         onChange={(e) => handleFilterChange("fromDate", e.target.value)}
//                     />
//                 </div>

//                 {/* To Date */}
//                 <div className="space-y-2">
//                     <Label className="text-sm font-medium text-foreground/80">To Date</Label>
//                     <Input
//                         type="date"
//                         className="h-10 bg-background border-input w-full"
//                         value={filters.toDate}
//                         onChange={(e) => handleFilterChange("toDate", e.target.value)}
//                     />
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex gap-2 lg:col-span-2">
//                     <Button
//                     onClick={handleSearch}
//                     className="flex-none bg-medivardaan-blue hover:bg-medivardaan-blue-dark text-white h-10 px-6 shadow-sm"
//                     >
//                     <Search className="w-4 h-4 mr-2" />
//                     Search
//                     </Button>
//                     <Button
//                     onClick={handleClear}
//                     variant="outline"
//                     className="flex-none border-input hover:bg-accent hover:text-accent-foreground h-10 px-6"
//                     >
//                     <X className="w-4 h-4 mr-2" />
//                     Clear
//                     </Button>
//                 </div>
//             </div>
            
//              {/* Total Count */}
//              <div className="flex justify-end pt-2">
//                  <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Records: {invoices.length}</span>
//              </div>
//         </CardContent>
//       </Card>

//       {/* Table Section */}
//       <Card className="border-border shadow-sm bg-card overflow-hidden">
//         <CardContent className="p-0">
//           <div className="overflow-x-auto">
//             {isLoading ? (
//                <div className="flex justify-center items-center py-20 text-muted-foreground">
//                   <Loader2 className="h-8 w-8 animate-spin mr-3" />
//                   <span>Loading invoices...</span>
//                </div>
//             ) : (
//             <Table>
//               <TableHeader className="bg-medivardaan-teal/10 dark:bg-accent text-foreground font-semibold border-b border-border">
//                 <TableRow className="border-b border-gray-100 dark:border-gray-700 hover:bg-[#E8F8F5] dark:hover:bg-gray-800">
//                   <TableHead className="font-bold text-gray-700 dark:text-gray-300 h-10">Sr. No.</TableHead>
//                   <TableHead className="font-bold text-gray-700 dark:text-gray-300 h-10">Invoice No.</TableHead>
//                   <TableHead className="font-bold text-gray-700 dark:text-gray-300 h-10">Clinic</TableHead>
//                   <TableHead className="font-bold text-gray-700 dark:text-gray-300 h-10">Pt. Code</TableHead>
//                   <TableHead className="font-bold text-gray-700 dark:text-gray-300 h-10">Patient Name</TableHead>
//                   <TableHead className="font-bold text-gray-700 dark:text-gray-300 h-10">Mobile</TableHead>
//                   <TableHead className="font-bold text-gray-700 dark:text-gray-300 h-10 text-right">Total</TableHead>
//                   <TableHead className="font-bold text-gray-700 dark:text-gray-300 h-10 text-right">Paid</TableHead>
//                   <TableHead className="font-bold text-gray-700 dark:text-gray-300 h-10 text-right">Pending</TableHead>
//                   <TableHead className="font-bold text-gray-700 dark:text-gray-300 h-10 text-center">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {currentItems.length > 0 ? (
//                   currentItems.map((inv, index) => (
//                     <TableRow key={inv.invoiceID || index} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 text-xs">
//                       <TableCell className="py-2 text-gray-600 dark:text-gray-300">{indexOfFirstItem + index + 1}</TableCell>
//                       <TableCell className="py-2 font-medium text-[#D35400] cursor-pointer hover:underline">{inv.invoiceNo}</TableCell>
//                       <TableCell className="py-2 text-gray-600 dark:text-gray-300">{inv.clinicName}</TableCell>
//                       <TableCell className="py-2 text-xs font-mono text-gray-500">{inv.patientCode}</TableCell>
//                       <TableCell className="py-2 font-medium text-gray-700 dark:text-gray-200 uppercase">{inv.patientName}</TableCell>
//                       <TableCell className="py-2 text-gray-600 dark:text-gray-300">{inv.mobileNo}</TableCell>
//                       <TableCell className="py-2 text-right font-medium text-gray-700 dark:text-gray-300">₹{Number(inv.grandTotal).toLocaleString('en-IN')}</TableCell>
//                       <TableCell className="py-2 text-right text-green-600 dark:text-green-400 font-semibold">₹{Number(inv.paidAmount).toLocaleString('en-IN')}</TableCell>
//                       <TableCell className="py-2 text-right text-orange-600 dark:text-orange-400 font-semibold">₹{Number(inv.pendingAmount || 0).toLocaleString('en-IN')}</TableCell>
//                       <TableCell className="py-2 text-center">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="h-7 text-xs hover:bg-medivardaan-blue hover:text-white border-[#D35400]/20 text-[#D35400]"
//                         >
//                           Print
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                      <TableCell colSpan={10} className="text-center py-16 text-muted-foreground bg-muted/5">
//                         <div className="flex flex-col items-center justify-center gap-2">
//                             <Search className="w-10 h-10 text-muted-foreground/50" />
//                             <p>No invoices found matching your filters.</p>
//                             <Button variant="link" onClick={handleClear} className="text-primary">Clear Filters</Button>
//                         </div>
//                      </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//             )}
//           </div>
          
//            {/* Pagination */}
//             <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
//                  <div className="hidden sm:flex w-[100px]">
//                     <span className="text-xs text-gray-500">
//                         Page {currentPage} of {Math.ceil(invoices.length / itemsPerPage)}
//                     </span>
//                  </div>
//                  <CustomPagination 
//                     totalItems={invoices.length} 
//                     itemsPerPage={itemsPerPage} 
//                     currentPage={currentPage} 
//                     onPageChange={setCurrentPage} 
//                  />
//                  <div className="flex w-[100px] justify-end">
//                     <Button variant="outline" size="sm" className="h-8 w-8 text-green-700 border-green-700 hover:bg-green-50 p-0">
//                         <FileSpreadsheet className="h-4 w-4" />
//                     </Button>
//                  </div>
//            </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }




"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { InvoiceDashboard } from "@/components/invoice/invoice-dashboard";
import { InvoiceFilters } from "@/components/invoice/invoice-filters";
import { InvoiceTable } from "@/components/invoice/invoice-table";
import { Toaster } from "@/components/ui/sonner";
import { InvoiceFormDialog } from "@/components/invoice/invoice-form-dialog";
import { OutstandingInvoicesList } from "@/components/invoice/outstanding-invoices-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { InvoiceStatusChart } from "@/components/invoice/invoice-status-chart"; // Import new chart
import { InvoiceTypeChart } from "@/components/invoice/invoice-type-chart"; // Import new chart

// Comprehensive dummy data for invoices combining both sets of requirements
const initialInvoices = [
  {
    id: "1",
    status: "Paid",
    type: "Services",
    invoiceNumber: "0016",
    createdDate: "2017-06-05",
    expiresDate: "2017-06-19",
    fullName: "Sam Engel",
    company: "",
    total: 406.80,
    paymentDate: "2017-06-06",
    sent: 1,
    view: 5,
    clinic: "Panvel",
    patientCode: "P001",
    patientName: "RAHUL SHARMA",
    mobile: "9876543210",
    paidAmount: 406.80,
    pendingAmount: 0,
  },
  {
    id: "2",
    status: "Overdue",
    type: "Services",
    invoiceNumber: "0015",
    createdDate: "2017-05-01",
    expiresDate: "2017-06-01",
    fullName: "Jack Anderson",
    company: "",
    total: 507.46,
    paymentDate: null,
    sent: 1,
    view: 0,
    clinic: "Pune",
    patientCode: "P002",
    patientName: "ADITI SINGH",
    mobile: "9876543211",
    paidAmount: 0,
    pendingAmount: 507.46,
  },
  {
    id: "3",
    status: "Partial",
    type: "Products",
    invoiceNumber: "0014",
    createdDate: "2017-06-05",
    expiresDate: "2017-06-19",
    fullName: "James Martin",
    company: "",
    total: 406.80,
    paymentDate: "2017-06-05",
    sent: 1,
    view: 0,
    clinic: "Mumbai",
    patientCode: "P003",
    patientName: "VIKRAM MALHOTRA",
    mobile: "9876543212",
    paidAmount: 200.00,
    pendingAmount: 206.80,
  },
  {
    id: "4",
    status: "Unpaid",
    type: "Services",
    invoiceNumber: "0013",
    createdDate: "2017-06-05",
    expiresDate: "2017-06-19",
    fullName: "Sam Engel",
    company: "",
    total: 1017.00,
    paymentDate: null,
    sent: 1,
    view: 2,
    clinic: "Nashik",
    patientCode: "P004",
    patientName: "SONIA PATIL",
    mobile: "9876543213",
    paidAmount: 0,
    pendingAmount: 1017.00,
  },
  {
    id: "5",
    status: "Unpaid",
    type: "Services",
    invoiceNumber: "0012",
    createdDate: "2017-06-05",
    expiresDate: "2017-06-19",
    fullName: "Jack Anderson",
    company: "",
    total: 152.55,
    paymentDate: null,
    sent: 1,
    view: 0,
    clinic: "Dwarka",
    patientCode: "P005",
    patientName: "AMIT VERMA",
    mobile: "9876543214",
    paidAmount: 0,
    pendingAmount: 152.55,
  },
  {
    id: "6",
    status: "Partial",
    type: "Services",
    invoiceNumber: "0011",
    createdDate: "2017-06-05",
    expiresDate: "2017-06-19",
    fullName: "Seth Thomas",
    company: "The New York Bagel Company",
    total: 112.55,
    paymentDate: null,
    sent: 0,
    view: 0,
    clinic: "Panvel",
    patientCode: "P006",
    patientName: "PRIYA SINGH",
    mobile: "9876543215",
    paidAmount: 50.00,
    pendingAmount: 62.55,
  },
  {
    id: "7",
    status: "Paid",
    type: "Products",
    invoiceNumber: "0010",
    createdDate: "2017-06-05",
    expiresDate: "2017-06-19",
    fullName: "Terry Andrews",
    company: "",
    total: 1270.23,
    paymentDate: "2017-06-05",
    sent: 0,
    view: 0,
    clinic: "Pune",
    patientCode: "P007",
    patientName: "RAJESH KUMAR",
    mobile: "9876543216",
    paidAmount: 1270.23,
    pendingAmount: 0,
  },
  {
    id: "8",
    status: "Paid",
    type: "Products",
    invoiceNumber: "0009",
    createdDate: "2017-06-05",
    expiresDate: "2017-06-19",
    fullName: "Sam Engel",
    company: "",
    total: 17.28,
    paymentDate: "2017-06-05",
    sent: 0,
    view: 0,
    clinic: "Mumbai",
    patientCode: "P008",
    patientName: "ANJALI GUPTA",
    mobile: "9876543217",
    paidAmount: 17.28,
    pendingAmount: 0,
  },
  {
    id: "9",
    status: "Paid",
    type: "Services",
    invoiceNumber: "0008",
    createdDate: "2017-06-05",
    expiresDate: "2017-06-19",
    fullName: "Jack Anderson",
    company: "",
    total: 406.80,
    paymentDate: "2017-06-05",
    sent: 0,
    view: 0,
    clinic: "Nashik",
    patientCode: "P009",
    patientName: "SANJAY MISHRA",
    mobile: "9876543218",
    paidAmount: 406.80,
    pendingAmount: 0,
  },
  {
    id: "10",
    status: "Paid",
    type: "Services",
    invoiceNumber: "0007",
    createdDate: "2017-06-05",
    expiresDate: "2017-06-19",
    fullName: "Paul Robins",
    company: "University of Miami",
    total: 152.55,
    paymentDate: "2017-06-05",
    sent: 0,
    view: 0,
    clinic: "Dwarka",
    patientCode: "P010",
    patientName: "POOJA SHAH",
    mobile: "9876543219",
    paidAmount: 152.55,
    pendingAmount: 0,
  },
];

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [filters, setFilters] = useState({
    search: "",
    fromDate: undefined,
    toDate: undefined,
  });
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(undefined);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };


  const handleNewInvoice = () => {
    setEditingInvoice(undefined); // Clear any previous editing state
    setIsFormDialogOpen(true);
  };

  const handleEditInvoice = (invoice) => {
    setEditingInvoice(invoice);
    setIsFormDialogOpen(true);
  };

  const handleSaveInvoice = (newInvoice) => {
    if (newInvoice.id) {
      // Update existing invoice
      setInvoices((prev) =>
        prev.map((inv) => (inv.id === newInvoice.id ? newInvoice : inv))
      );
      toast.success("Invoice updated successfully!");
    } else {
      // Add new invoice
      const newId = (Math.max(...prev.map(inv => parseInt(inv.id))) + 1).toString(); // Simple ID generation
      setInvoices((prev) => [{ ...newInvoice, id: newId }, ...prev]);
      toast.success("Invoice added successfully!");
    }
    setIsFormDialogOpen(false);
  };

  const handleDeleteInvoice = (id) => {
    setInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
    toast.success("Invoice deleted successfully!");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">View Invoices</h1>
        <Button onClick={handleNewInvoice}>
          <Plus className="mr-2 h-4 w-4" /> New Invoice
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="all-invoices">All Invoices</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <InvoiceDashboard invoices={invoices} />
            <OutstandingInvoicesList invoices={invoices} />
            <InvoiceStatusChart invoices={invoices} /> {/* New chart */}
            <InvoiceTypeChart invoices={invoices} /> {/* New chart */}
          </div>
        </TabsContent>
        <TabsContent value="all-invoices" className="mt-6">
          <div className="mb-8">
            <InvoiceFilters onFilterChange={handleFilterChange} />
          </div>
          <div>
            <InvoiceTable
              invoices={invoices}
              filters={filters}
              onEditInvoice={handleEditInvoice}
              onDeleteInvoice={handleDeleteInvoice}
            />
          </div>
        </TabsContent>
      </Tabs>

      <Toaster />

      <InvoiceFormDialog
        open={isFormDialogOpen}
        onOpenChange={setIsFormDialogOpen}
        initialInvoice={editingInvoice}
        onSave={handleSaveInvoice}
      />
    </div>
  );
}