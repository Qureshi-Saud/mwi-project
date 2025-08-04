import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MailOpen, Trash2, Eye, Search } from "lucide-react";

function Inbox() {
  const [enquiries, setEnquiries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/enquiries");
    const sorted = res.data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setEnquiries(sorted);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/enquiries/${id}`);
    fetchData();
  };

  const handleView = async (id) => {
    await axios.put(`http://localhost:5000/api/enquiries/${id}/view`);
    navigate(`/admin/enquiries/${id}`);
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
  }, []);

  const filteredEnquiries = enquiries.filter((enquiry) => {
    const query = searchQuery.toLowerCase();
    return (
      enquiry.firstName.toLowerCase().includes(query) ||
      enquiry.lastName.toLowerCase().includes(query) ||
      enquiry.email.toLowerCase().includes(query) ||
      enquiry.subject.toLowerCase().includes(query)
    );
  });

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">Inbox</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search enquiries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <Search className="absolute left-2.5 top-2.5 w-5 h-5 text-gray-500" />
        </div>
      </div>

      <div className="bg-white rounded shadow-md divide-y">
        {filteredEnquiries.length === 0 ? (
          <p className="text-center py-6 text-gray-500">No enquiries found.</p>
        ) : (
          filteredEnquiries.map((enquiry) => (
            <div
              key={enquiry._id}
              className={`flex items-center justify-between px-4 py-4 hover:bg-gray-50 transition duration-150 ${
                !enquiry.viewed ? "bg-gray-100" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <MailOpen
                  className={`w-6 h-6 mt-1 ${
                    enquiry.viewed ? "text-gray-400" : "text-blue-600"
                  }`}
                />
                <div>
                  <p className="font-medium text-lg">
                    {enquiry.firstName} {enquiry.lastName}{" "}
                    <span className="text-sm text-gray-500 ml-2">
                      {enquiry.email}
                    </span>
                  </p>
                  <p className="text-gray-700 text-sm">{enquiry.subject}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(enquiry.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                {!enquiry.viewed && (
                  <span className="text-xs text-white bg-green-500 rounded-full px-2 py-1">
                    New
                  </span>
                )}
                <button
                  onClick={() => handleView(enquiry._id)}
                  className="text-blue-600 hover:underline text-sm flex items-center gap-1"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button
                  onClick={() => handleDelete(enquiry._id)}
                  className="text-red-600 hover:underline text-sm flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Inbox;
