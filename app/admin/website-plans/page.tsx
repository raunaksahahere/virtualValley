"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  Edit, 
  Save, 
  X, 
  MoreVertical,
  Loader2,
  RefreshCw,
  MessageSquare
} from "lucide-react";

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  business_name: string;
  business_type: string;
  selected_plan: string;
  message: string;
  status: string;
  notes: string | null;
  sales_executive: string | null;
  created_at: string;
}

const STATUS_OPTIONS = ["New", "Contacted", "Converted", "Lost"];

export default function WebsitePlansAdmin() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Filters and Search
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  // Edit State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ status: "", notes: "", sales_executive: "" });

  const fetchEnquiries = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (statusFilter !== "All") params.append("status", statusFilter);
      
      const res = await fetch(`/api/admin-enquiries?${params.toString()}`);
      const data = await res.json();
      if (res.ok) {
        setEnquiries(data.data || []);
      } else {
        setError(data.error || "Failed to fetch enquiries");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [search, statusFilter]);

  const handleEditClick = (enquiry: Enquiry) => {
    setEditingId(enquiry.id);
    setEditForm({
      status: enquiry.status || "New",
      notes: enquiry.notes || "",
      sales_executive: enquiry.sales_executive || ""
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    try {
      const res = await fetch(`/api/admin-enquiries`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editingId, ...editForm })
      });
      if (res.ok) {
        fetchEnquiries();
        setEditingId(null);
      } else {
        alert("Failed to update enquiry");
      }
    } catch (err) {
      alert("Error updating enquiry");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/admin-enquiries?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setEnquiries(prev => prev.filter(e => e.id !== id));
      } else {
        alert("Failed to delete enquiry");
      }
    } catch (err) {
      alert("Error deleting enquiry");
    }
  };

  const exportCSV = () => {
    if (enquiries.length === 0) return;
    
    const headers = ["Date", "Name", "Email", "Phone", "Business Name", "Business Type", "Plan", "Status", "Sales Exec", "Notes", "Message"];
    const rows = enquiries.map(e => [
      format(new Date(e.created_at), "yyyy-MM-dd HH:mm"),
      `"${e.name.replace(/"/g, '""')}"`,
      `"${e.email.replace(/"/g, '""')}"`,
      `"${e.phone.replace(/"/g, '""')}"`,
      `"${e.business_name.replace(/"/g, '""')}"`,
      `"${e.business_type.replace(/"/g, '""')}"`,
      `"${e.selected_plan.replace(/"/g, '""')}"`,
      `"${e.status.replace(/"/g, '""')}"`,
      `"${(e.sales_executive || '').replace(/"/g, '""')}"`,
      `"${(e.notes || '').replace(/"/g, '""')}"`,
      `"${(e.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `website_enquiries_${format(new Date(), "yyyyMMdd")}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'New': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Contacted': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Converted': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Lost': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] p-4 md:p-8 pt-24 font-sans">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#081F5C] mb-2">Website Plan Enquiries</h1>
            <p className="text-gray-500 text-sm">Manage, track and assign incoming subscription leads.</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button 
              onClick={() => fetchEnquiries()}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
            >
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
            <button 
              onClick={exportCSV}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-[#334EAC] text-white rounded-lg shadow-sm hover:bg-[#081F5C] transition-colors flex-1 md:flex-none"
            >
              <Download className="w-4 h-4" /> Export CSV
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by name, email, or business..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#334EAC]/20 focus:border-[#334EAC] transition-all"
            />
          </div>
          <div className="relative min-w-[200px]">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#334EAC]/20 focus:border-[#334EAC] transition-all appearance-none"
            >
              <option value="All">All Statuses</option>
              {STATUS_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50 border-b border-gray-100 text-gray-600">
                <tr>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Customer Details</th>
                  <th className="px-6 py-4 font-semibold">Business Info</th>
                  <th className="px-6 py-4 font-semibold">Plan Selected</th>
                  <th className="px-6 py-4 font-semibold">Status & Assignment</th>
                  <th className="px-6 py-4 font-semibold">Notes</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-[#334EAC] mb-2" />
                        <p>Loading enquiries...</p>
                      </div>
                    </td>
                  </tr>
                ) : enquiries.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      No enquiries found matching your filters.
                    </td>
                  </tr>
                ) : (
                  enquiries.map((enquiry) => {
                    const isEditing = editingId === enquiry.id;
                    return (
                      <tr key={enquiry.id} className="hover:bg-gray-50 transition-colors">
                        {/* Date */}
                        <td className="px-6 py-4 text-gray-500">
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-800">{format(new Date(enquiry.created_at), "MMM dd, yyyy")}</span>
                            <span className="text-xs">{format(new Date(enquiry.created_at), "hh:mm a")}</span>
                          </div>
                        </td>

                        {/* Customer Details */}
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-[#081F5C]">{enquiry.name}</span>
                            <a href={`mailto:${enquiry.email}`} className="text-sm text-[#334EAC] hover:underline">{enquiry.email}</a>
                            <a href={`tel:${enquiry.phone}`} className="text-sm text-gray-500 hover:underline">{enquiry.phone}</a>
                          </div>
                        </td>

                        {/* Business Info */}
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-800">{enquiry.business_name}</span>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full w-max mt-1">{enquiry.business_type}</span>
                          </div>
                        </td>

                        {/* Plan */}
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-sm font-bold bg-[#334EAC]/10 text-[#334EAC] border border-[#334EAC]/20">
                            {enquiry.selected_plan}
                          </span>
                        </td>

                        {/* Status & Assignment */}
                        <td className="px-6 py-4">
                          {isEditing ? (
                            <div className="flex flex-col gap-2">
                              <select 
                                value={editForm.status}
                                onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                                className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-[#334EAC]"
                              >
                                {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                              </select>
                              <input 
                                type="text"
                                placeholder="Sales Exec Name"
                                value={editForm.sales_executive}
                                onChange={(e) => setEditForm({...editForm, sales_executive: e.target.value})}
                                className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-[#334EAC]"
                              />
                            </div>
                          ) : (
                            <div className="flex flex-col items-start gap-1.5">
                              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusColor(enquiry.status)}`}>
                                {enquiry.status}
                              </span>
                              {enquiry.sales_executive ? (
                                <span className="text-xs text-gray-600 flex items-center gap-1"><User className="w-3 h-3"/> {enquiry.sales_executive}</span>
                              ) : (
                                <span className="text-xs text-gray-400 italic">Unassigned</span>
                              )}
                            </div>
                          )}
                        </td>

                        {/* Notes & Message */}
                        <td className="px-6 py-4 max-w-xs whitespace-normal">
                          {isEditing ? (
                            <textarea
                              value={editForm.notes}
                              onChange={(e) => setEditForm({...editForm, notes: e.target.value})}
                              placeholder="Add internal notes..."
                              className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-[#334EAC] resize-none h-20"
                            />
                          ) : (
                            <div className="flex flex-col gap-2">
                              <div className="group relative">
                                <div className="flex items-start gap-1.5 text-gray-600 text-sm bg-gray-50 p-2 rounded border border-gray-100">
                                  <MessageSquare className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#334EAC]" />
                                  <p className="line-clamp-2" title={enquiry.message}>{enquiry.message}</p>
                                </div>
                              </div>
                              {enquiry.notes && (
                                <div className="text-xs text-amber-700 bg-amber-50 p-2 rounded border border-amber-100 line-clamp-2" title={enquiry.notes}>
                                  <span className="font-bold">Note:</span> {enquiry.notes}
                                </div>
                              )}
                            </div>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right">
                          {isEditing ? (
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={handleSaveEdit} className="p-1.5 bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200 transition-colors" title="Save">
                                <Save className="w-4 h-4" />
                              </button>
                              <button onClick={handleCancelEdit} className="p-1.5 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors" title="Cancel">
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleEditClick(enquiry)} className="p-1.5 text-gray-500 hover:text-[#334EAC] hover:bg-blue-50 rounded transition-colors" title="Edit">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDelete(enquiry.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    </div>
  );
}

function User(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
