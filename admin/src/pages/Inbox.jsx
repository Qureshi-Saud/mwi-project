import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MailOpen, Trash2, Eye, Search } from "lucide-react";

function Inbox() {
  const [enquiries, setEnquiries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate();

  const fetchData = async () => {
    let url = "http://localhost:5000/api/enquiries";
    if (filter === "starred") url += "?starred=true";
    else if (filter === "unread") url += "?viewed=false";

    const res = await axios.get(url);
    const sorted = res.data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setEnquiries(sorted);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this enquiry?");
    if (!confirmed) return;

    await axios.delete(`http://localhost:5000/api/enquiries/${id}`);
    fetchData();
  };

  const handleView = async (id) => {
    await axios.put(`http://localhost:5000/api/enquiries/${id}/view`);
    navigate(`/admin/enquiries/${id}`);
  };

  const handleStarToggle = async (id, currentStatus) => {
    await axios.put(`http://localhost:5000/api/enquiries/${id}/star`, {
      starred: !currentStatus,
    });
    fetchData();
  };

  const handleBulkDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete the selected enquiries?");
    if (!confirmed) return;

    await Promise.all(
      selectedIds.map((id) =>
        axios.delete(`http://localhost:5000/api/enquiries/${id}`)
      )
    );
    setSelectedIds([]);
    fetchData();
  };

  const handleBulkView = async () => {
    await Promise.all(
      selectedIds.map((id) =>
        axios.put(`http://localhost:5000/api/enquiries/${id}/view`)
      )
    );
    setSelectedIds([]);
    fetchData();
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredEnquiries.map((e) => e._id));
    }
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  const filteredEnquiries = enquiries.filter((enquiry) => {
    const query = searchQuery.toLowerCase();
    return (
      enquiry.firstName.toLowerCase().includes(query) ||
      enquiry.lastName.toLowerCase().includes(query) ||
      enquiry.email.toLowerCase().includes(query) ||
      enquiry.subject.toLowerCase().includes(query)
    );
  });

  const allSelected =
    selectedIds.length === filteredEnquiries.length &&
    filteredEnquiries.length > 0;

  return (
    <div className="bg-gray-100 min-h-screen mt-0 p-6 ml-64">
      <div className="max-w-6xl">
        {/* Header & Controls Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          {/* Left controls */}
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleSelectAll}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Select All</span>
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="text-sm px-3 py-1 border rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">📥 All</option>
              <option value="starred">⭐ Starred</option>
              <option value="unread">👁 Unread</option>
            </select>

            <button
              onClick={fetchData}
              className="text-sm bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300"
              title="Refresh"
            >
              🔄 Refresh
            </button>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search mail"
              className="pl-10 pr-4 py-2 w-full bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Bulk Action Bar */}
        {selectedIds.length > 0 && (
          <div className="flex items-center justify-between bg-white border px-6 py-3 rounded-t-md shadow-sm mb-1">
            <p className="text-sm text-gray-700">{selectedIds.length} selected</p>
            <div className="flex gap-3">
              <button
                onClick={handleBulkView}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
              >
                Mark as Viewed
              </button>
              <button
                onClick={handleBulkDelete}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
              >
                Delete Selected
              </button>
            </div>
          </div>
        )}

        {/* Inbox List */}
        <div className="bg-white rounded-md shadow-sm divide-y">
          {filteredEnquiries.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No enquiries found.</p>
          ) : (
            filteredEnquiries.map((enquiry) => {
              const isChecked = selectedIds.includes(enquiry._id);
              return (
                <div
                  key={enquiry._id}
                  className={`flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-all ${
                    !enquiry.viewed ? "bg-gray-50 font-medium" : "text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleSelect(enquiry._id)}
                      className="flex-shrink-0"
                    />

                    <button
                      onClick={() =>
                        handleStarToggle(enquiry._id, enquiry.starred)
                      }
                      className={`text-xl ${
                        enquiry.starred ? "text-yellow-500" : "text-gray-400"
                      } hover:text-yellow-600`}
                      title="Star"
                    >
                      {enquiry.starred ? "★" : "☆"}
                    </button>

                    <div className="min-w-0">
                      <p className="truncate text-base">
                        {enquiry.firstName} {enquiry.lastName}{" "}
                        <span className="text-sm text-gray-500">
                          ({enquiry.email})
                        </span>
                      </p>
                      <p className="text-sm text-gray-600 truncate w-11/12">
                        {enquiry.subject}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm text-gray-500 whitespace-nowrap ml-4">
                    {formatDate(enquiry.createdAt)}
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleView(enquiry._id)}
                      className="text-blue-600 hover:text-blue-800"
                      title="View"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(enquiry._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Inbox;
