"use client";

import React, { useState } from "react";
import { Settings, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ItemMaster() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isView, setIsView] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [formData, setFormData] = useState({
    inventoryType: "",
    itemName: "",
    brandName: "",
    packagingType: "",
    price: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Mock data for Item Master
  const [data, setData] = useState([
    {
      id: 1,
      inventoryType: "MATERIAL",
      itemName: "Cold cure Powder",
      brandName: "DPI",
      packagingType: "Bottle",
      price: "169.50"
    },
    {
      id: 2,
      inventoryType: "MATERIAL",
      itemName: "cold cure liquid",
      brandName: "DPI",
      packagingType: "Bottle",
      price: "169.50"
    },
    {
      id: 3,
      inventoryType: "MATERIAL",
      itemName: "Composite",
      brandName: "SafeEndo",
      packagingType: "Syringe",
      price: "562.50"
    },
    {
      id: 4,
      inventoryType: "MATERIAL",
      itemName: "Epoxyseal",
      brandName: "SafeEndo",
      packagingType: "Syringe",
      price: "1120.00"
    },
    {
      id: 5,
      inventoryType: "MATERIAL",
      itemName: "Calahyd - Rc",
      brandName: "MAARC",
      packagingType: "Syringe",
      price: "885.00"
    },
    {
      id: 6,
      inventoryType: "MEDICINE",
      itemName: "Aqua Mouthwash",
      brandName: "Dente 91",
      packagingType: "Bottle",
      price: "37.12"
    },
    {
      id: 7,
      inventoryType: "MEDICINE",
      itemName: "sensitive toothpaste",
      brandName: "Dente 91",
      packagingType: "Tube",
      price: "134.92"
    },
    {
      id: 8,
      inventoryType: "MEDICINE",
      itemName: "DB Toothpaste",
      brandName: "Dente 91",
      packagingType: "Tube",
      price: "168.81"
    },
    {
      id: 9,
      inventoryType: "MEDICINE",
      itemName: "She Toothpaste",
      brandName: "Dente 91",
      packagingType: "Tube",
      price: "148.47"
    },
    {
      id: 10,
      inventoryType: "MEDICINE",
      itemName: "mouthwash",
      brandName: "Dente 91",
      packagingType: "Bottle",
      price: "134.91"
    }
  ]);

  // Unique options
  const inventoryTypes = Array.from(new Set(data.map(i => i.inventoryType))).filter(Boolean);
  const brandNames = Array.from(new Set(data.map(i => i.brandName))).filter(Boolean);
  const packagingTypes = Array.from(new Set(data.map(i => i.packagingType))).filter(Boolean);

  const filteredData = data.filter((item) =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.brandName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleAdd = () => {
    setIsView("form");
    setFormData({ inventoryType: "", itemName: "", brandName: "", packagingType: "", price: "" });
    setEditingId(null);
  };

  const handleEdit = (item) => {
    setIsView("form");
    setFormData({ ...item });
    setEditingId(item.id);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setData(data.filter((item) => item.id !== id));
      if (currentPage > 1 && Math.ceil((data.length - 1) / itemsPerPage) < currentPage) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const handleSubmit = () => {
    if (!formData.itemName) return;

    if (editingId) {
      setData(data.map(item => item.id === editingId ? { ...item, ...formData, price: parseFloat(formData.price || 0).toFixed(2) } : item));
    } else {
      const newId = data.length > 0 ? Math.max(...data.map(i => i.id)) + 1 : 1;
      setData([...data, { id: newId, ...formData, price: parseFloat(formData.price || 0).toFixed(2) }]);
    }
    setIsView("list");
  };

  const handleCancel = () => {
    setIsView("list");
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen space-y-6">
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-4">
        <Settings className="w-5 h-5 text-red-500" />
        <h1 className="text-lg font-bold text-red-500 uppercase tracking-wide">
          ITEM
        </h1>
      </div>

      {isView === "list" ? (
        <>
           <div className="space-y-4">
              <div className="flex justify-between items-end">
                 <div className="flex-1 max-w-4xl space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Search</label>
                     <div className="flex gap-2">
                        <Input
                            placeholder="Name or Brand"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 max-w-xl"
                        />
                         <Button onClick={() => setSearchTerm("")} className="bg-[#D35400] hover:bg-[#A04000] text-white px-6 font-medium shadow-sm transition-all whitespace-nowrap">
                            Clear
                        </Button>
                    </div>
                </div>

                <Button onClick={handleAdd} className="bg-[#0e7490] hover:bg-[#0891b2] text-white px-6 font-medium shadow-sm transition-all whitespace-nowrap">
                    Add New Item
                </Button>
              </div>
          </div>

           <div className="border border-gray-200 dark:border-gray-700 rounded-t-lg overflow-hidden overflow-x-auto mt-4">
            <Table>
              <TableHeader className="bg-[#E8F8F5] dark:bg-gray-800">
                <TableRow className="hover:bg-[#E8F8F5] dark:hover:bg-gray-700/50 border-gray-200 dark:border-gray-700">
                  <TableHead className="font-bold text-gray-700 dark:text-gray-300 w-[60px]">Sr. No.</TableHead>
                  <TableHead className="font-bold text-gray-700 dark:text-gray-300">Inventory Type</TableHead>
                  <TableHead className="font-bold text-gray-700 dark:text-gray-300">Item Name</TableHead>
                  <TableHead className="font-bold text-gray-700 dark:text-gray-300">Brand Name</TableHead>
                  <TableHead className="font-bold text-gray-700 dark:text-gray-300">Packaging Type</TableHead>
                  <TableHead className="font-bold text-gray-700 dark:text-gray-300">Price</TableHead>
                  <TableHead className="font-bold text-gray-700 dark:text-gray-300 w-[100px] text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.length > 0 ? (
                    currentData.map((row) => (
                    <TableRow key={row.id} className="border-gray-200 dark:border-gray-700 dark:hover:bg-gray-800/50">
                        <TableCell className="dark:text-gray-300">{row.id}</TableCell>
                        <TableCell className="dark:text-gray-300">{row.inventoryType}</TableCell>
                        <TableCell className="dark:text-gray-300">{row.itemName}</TableCell>
                        <TableCell className="dark:text-gray-300">{row.brandName}</TableCell>
                        <TableCell className="dark:text-gray-300">{row.packagingType}</TableCell>
                        <TableCell className="dark:text-gray-300">{row.price}</TableCell>
                        <TableCell className="dark:text-gray-300">
                            <div className="flex items-center justify-center gap-4">
                                <Button variant="ghost" size="icon" onClick={() => handleEdit(row)} className="h-4 w-4 text-gray-600 hover:text-blue-600">
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => handleDelete(row.id)}
                                    className="h-4 w-4 text-gray-600 hover:text-red-600"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={7} className="text-center text-gray-500 h-24">
                            No records found
                        </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

           <div className="flex justify-between items-center pt-2">
            <div className="text-sm text-gray-500">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} entries
            </div>
            <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button key={page} variant={currentPage === page ? "default" : "outline"} size="sm" onClick={() => handlePageChange(page)} className={currentPage === page ? "bg-[#1E6B8C] hover:bg-[#15526d] text-white" : ""}>
                        {page}
                    </Button>
                ))}
                <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
          </div>
        </>
      ) : (
         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Inventory Type</label>
                    <Select value={formData.inventoryType} onValueChange={(val) => setFormData({...formData, inventoryType: val})}>
                        <SelectTrigger><SelectValue placeholder="-- Select Inventory Type --" /></SelectTrigger>
                        <SelectContent>
                             {inventoryTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                             {!inventoryTypes.includes("MATERIAL") && <SelectItem value="MATERIAL">MATERIAL</SelectItem>}
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                     <label className="text-sm font-medium">Item Name*</label>
                    <Input placeholder="Item Name" value={formData.itemName} onChange={(e) => setFormData({ ...formData, itemName: e.target.value })} />
                </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium">Brand Name</label>
                    <Select value={formData.brandName} onValueChange={(val) => setFormData({...formData, brandName: val})}>
                        <SelectTrigger><SelectValue placeholder="-- Select Brand --" /></SelectTrigger>
                        <SelectContent>
                             {brandNames.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium">Packaging Type</label>
                    <Select value={formData.packagingType} onValueChange={(val) => setFormData({...formData, packagingType: val})}>
                        <SelectTrigger><SelectValue placeholder="-- Select Packaging Type --" /></SelectTrigger>
                        <SelectContent>
                             {packagingTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Price</label>
                    <Input placeholder="Price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                </div>
           </div>

          <div className="flex justify-center gap-4 pt-4">
            <Button onClick={handleSubmit} className="bg-green-700 hover:bg-green-800 text-white min-w-[100px]">Submit</Button>
            <Button onClick={handleCancel} variant="destructive" className="bg-red-700 hover:bg-red-800 min-w-[100px]">Cancel</Button>
          </div>
        </div>
      )}
    </div>
  );
}
