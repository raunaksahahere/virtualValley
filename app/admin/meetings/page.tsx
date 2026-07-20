"use client";

import { useEffect, useState } from "react";
import { Loader2, Search, Calendar, Filter, Copy, CheckCircle, XCircle, Clock } from "lucide-react";

interface Meeting {
  rowIndex: number;
  timestamp: string;
  scheduleDate: string;
  clientName: string;
  clientPhone: string;
  clientLocation: string;
  clientEmail: string;
  service: string;
  salesGuyName: string;
  salesGuyId: string;
  status: string;
}

const SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "";

export default function AdminMeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchMeetings = async () => {
    setLoading(true);
    try {
      if (!SCRIPT_URL) {
        throw new Error("Google Script URL is not configured.");
      }
      const res = await fetch(`${SCRIPT_URL}?action=getAllMeetings`);
      const data = await res.json();
      if (data.meetings) {
        setMeetings(data.meetings);
      } else {
        setError(data.error || "Failed to load meetings.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch meetings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const updateStatus = async (rowIndex: number, newStatus: string) => {
    try {
      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({
          action: "updateStatus",
          rowIndex,
          status: newStatus
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMeetings(meetings.map(m => m.rowIndex === rowIndex ? { ...m, status: newStatus } : m));
      } else {
        alert(data.error || "Failed to update status");
      }
    } catch (err) {
      alert("Error updating status");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const exportCSV = () => {
    if (meetings.length === 0) return;
    const headers = Object.keys(meetings[0]).join(",");
    const csvRows = meetings.map(m => Object.values(m).map(val => `"${val}"`).join(","));
    const csvContent = [headers, ...csvRows].join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `meetings_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredMeetings = meetings.filter(m => {
    const matchesSearch = 
      m.clientName.toLowerCase().includes(search.toLowerCase()) ||
      m.clientEmail.toLowerCase().includes(search.toLowerCase()) ||
      m.clientPhone.includes(search) ||
      m.service.toLowerCase().includes(search.toLowerCase());
      
    const matchesStatus = statusFilter === "All" || m.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-3xl font-display font-bold">Meeting Management</h1>
            <p className="text-muted mt-1">Manage and track your bookings from Google Sheets.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={fetchMeetings} className="btn-secondary px-4 py-2 text-xs">Refresh Data</button>
            <button onClick={exportCSV} className="btn-primary px-4 py-2 text-xs">Export CSV</button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input 
              type="text" 
              placeholder="Search by name, email, phone, or service..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-premium pl-12"
            />
          </div>
          <div className="relative min-w-[144px]">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-premium pl-12 appearance-none cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Rescheduled">Rescheduled</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted">
            <Loader2 className="w-10 h-10 animate-spin mb-4" />
            <p>Fetching meetings...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-6 rounded-2xl text-center">
            {error}
          </div>
        ) : (
          <div className="glass-card-premium rounded-3xl overflow-hidden border border-border overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead>
                <tr className="border-b border-border bg-surface-secondary">
                  <th className="px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Client</th>
                  <th className="px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Service</th>
                  <th className="px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Sales Rep</th>
                  <th className="px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-muted uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredMeetings.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-muted">
                      No meetings found matching your criteria.
                    </td>
                  </tr>
                ) : filteredMeetings.map((meeting) => (
                  <tr key={meeting.rowIndex} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-accent-cyan" />
                        <span className="font-medium">{meeting.scheduleDate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-foreground">{meeting.clientName}</div>
                      <div className="text-xs text-muted">{meeting.clientEmail}</div>
                      <div className="text-xs text-muted">{meeting.clientPhone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-3 py-1 rounded-full bg-surface-secondary border border-border text-xs">
                        {meeting.service}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">{meeting.salesGuyName}</div>
                      {meeting.salesGuyId && <div className="text-xs text-muted">ID: {meeting.salesGuyId}</div>}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border
                        ${meeting.status === 'Upcoming' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : ''}
                        ${meeting.status === 'Completed' ? 'bg-primary/10 border-green/20 text-accent-cyan' : ''}
                        ${meeting.status === 'Cancelled' ? 'bg-red-500/10 border-red-500/20 text-red-400' : ''}
                        ${meeting.status === 'Rescheduled' ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' : ''}
                      `}>
                        {meeting.status === 'Upcoming' && <Clock className="w-3 h-3" />}
                        {meeting.status === 'Completed' && <CheckCircle className="w-3 h-3" />}
                        {meeting.status === 'Cancelled' && <XCircle className="w-3 h-3" />}
                        {meeting.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          title="Copy Meeting Link"
                          onClick={() => copyToClipboard('https://meet.google.com/qhx-nuog-fwj')}
                          className="p-2 bg-surface-secondary hover:bg-surface-secondary rounded-lg text-muted transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        
                        <select 
                          onChange={(e) => updateStatus(meeting.rowIndex, e.target.value)}
                          value=""
                          className="bg-surface-secondary border border-border text-xs rounded-lg px-2 py-2 outline-none cursor-pointer"
                        >
                          <option value="" disabled>Update Status</option>
                          <option value="Completed">Mark Completed</option>
                          <option value="Cancelled">Mark Cancelled</option>
                          <option value="Rescheduled">Mark Rescheduled</option>
                          <option value="Upcoming">Mark Upcoming</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
