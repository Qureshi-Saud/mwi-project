// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { MailOpen, Trash2, Eye, Search } from "lucide-react";

// function Inbox() {
//   const [enquiries, setEnquiries] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedIds, setSelectedIds] = useState([]);
//   const [filter, setFilter] = useState("all");
//   const [selectMenuOpen, setSelectMenuOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   // Added states for sorting & pagination
//   const [sortOption, setSortOption] = useState("newest");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);

//   const navigate = useNavigate();

//   const fetchData = async () => {
//     let url = "http://localhost:5000/api/enquiries";
//     if (filter === "starred") url += "?starred=true";
//     else if (filter === "unread") url += "?viewed=false";

//     const res = await axios.get(url);
//     const sorted = res.data.sort(
//       (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//     );
//     setEnquiries(sorted);
//   };

//   const handleDelete = async (id) => {
//     const confirmed = window.confirm("Are you sure you want to delete this enquiry?");
//     if (!confirmed) return;

//     await axios.delete(`http://localhost:5000/api/enquiries/${id}`);
//     fetchData();
//   };

//   const handleView = async (id) => {
//     await axios.put(`http://localhost:5000/api/enquiries/${id}/view`);
//     navigate(`/admin/enquiries/${id}`);
//   };

//   const handleStarToggle = async (id, currentStatus) => {
//     await axios.put(`http://localhost:5000/api/enquiries/${id}/star`, {
//       starred: !currentStatus,
//     });
//     fetchData();
//   };

//   const handleBulkDelete = async () => {
//     const confirmed = window.confirm("Are you sure you want to delete the selected enquiries?");
//     if (!confirmed) return;

//     await Promise.all(
//       selectedIds.map((id) =>
//         axios.delete(`http://localhost:5000/api/enquiries/${id}`)
//       )
//     );
//     setSelectedIds([]);
//     fetchData();
//   };

//   const handleBulkView = async () => {
//     await Promise.all(
//       selectedIds.map((id) =>
//         axios.put(`http://localhost:5000/api/enquiries/${id}/view`)
//       )
//     );
//     setSelectedIds([]);
//     fetchData();
//   };

//   const toggleSelect = (id) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//     );
//   };

//   const toggleSelectAll = () => {
//     if (allSelected) {
//       setSelectedIds([]);
//     } else {
//       setSelectedIds(filteredEnquiries.map((e) => e._id));
//     }
//   };

//   const handleSelectionMenuClick = (option) => {
//     switch (option) {
//       case "all":
//         setSelectedIds(filteredEnquiries.map((e) => e._id));
//         break;
//       case "none":
//         setSelectedIds([]);
//         break;
//       case "read":
//         setSelectedIds(filteredEnquiries.filter((e) => e.viewed).map((e) => e._id));
//         break;
//       case "unread":
//         setSelectedIds(filteredEnquiries.filter((e) => !e.viewed).map((e) => e._id));
//         break;
//       case "starred":
//         setSelectedIds(filteredEnquiries.filter((e) => e.starred).map((e) => e._id));
//         break;
//       case "unstarred":
//         setSelectedIds(filteredEnquiries.filter((e) => !e.starred).map((e) => e._id));
//         break;
//       default:
//         break;
//     }
//     setSelectMenuOpen(false);
//   };

//   const formatDate = (isoDate) => {
//     const date = new Date(isoDate);
//     return date.toLocaleString("en-IN", {
//       timeZone: "Asia/Kolkata",
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   useEffect(() => {
//     fetchData();
//   }, [filter]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setSelectMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const filteredEnquiries = enquiries
//     .filter((enquiry) => {
//       const query = searchQuery.toLowerCase();
//       const formattedDate = formatDate(enquiry.createdAt).toLowerCase();
//       const rawDate = enquiry.createdAt.toLowerCase();
//       return (
//         enquiry.firstName.toLowerCase().includes(query) ||
//         enquiry.lastName.toLowerCase().includes(query) ||
//         enquiry.email.toLowerCase().includes(query) ||
//         enquiry.subject.toLowerCase().includes(query) ||
//         formattedDate.includes(query) || // search in displayed date
//         rawDate.includes(query)           // search in ISO date string
//       );
//     })
//     .sort((a, b) => {
//       if (sortOption === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
//       if (sortOption === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
//       if (sortOption === "az") return a.firstName.localeCompare(b.firstName);
//       if (sortOption === "za") return b.firstName.localeCompare(a.firstName);
//       return 0;
//     });

//   const allSelected =
//     selectedIds.length === filteredEnquiries.length && filteredEnquiries.length > 0;

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredEnquiries.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage);

//   return (
//     <div className="bg-gray-100 min-h-screen mt-0 p-6 ml-64">
//       <div className="max-w-6xl">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
//           <div className="flex items-center gap-4 relative">
//             <input
//               type="checkbox"
//               checked={allSelected}
//               onChange={toggleSelectAll}
//               className="w-4 h-4 border-gray-400 rounded-sm"
//               title="Select All"
//             />
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 onClick={() => setSelectMenuOpen(!selectMenuOpen)}
//                 className="w-5 h-5 border border-gray-400 rounded-sm flex items-center justify-center hover:bg-gray-100"
//                 title="Selection Options"
//               >
//                 <span className="text-xs">▾</span>
//               </button>
//               {selectMenuOpen && (
//                 <div className="absolute left-0 mt-1 w-36 bg-white border rounded-md shadow-lg z-10">
//                   {["All", "None", "Read", "Unread", "Starred", "Unstarred"].map((label) => (
//                     <button
//                       key={label}
//                       onClick={() => handleSelectionMenuClick(label.toLowerCase())}
//                       className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
//                     >
//                       {label}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//             <select
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="text-sm px-3 py-1 border rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="all">📥 All</option>
//               <option value="starred">⭐ Starred</option>
//               <option value="unread">👁 Unread</option>
//             </select>
//             <select
//               value={sortOption}
//               onChange={(e) => setSortOption(e.target.value)}
//               className="text-sm px-3 py-1 border rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="newest">🆕 Newest First</option>
//               <option value="oldest">📜 Oldest First</option>
//               <option value="az">🔤 A-Z</option>
//               <option value="za">🔡 Z-A</option>
//             </select>
//             <button
//               onClick={fetchData}
//               className="text-sm bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300"
//               title="Refresh"
//             >
//               🔄 Refresh
//             </button>
//           </div>
//           <div className="relative w-full md:w-80">
//             <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search mail or date"
//               className="pl-10 pr-4 py-2 w-full bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>

//         {selectedIds.length > 0 && (
//           <div className="flex items-center justify-between bg-white border px-6 py-3 rounded-t-md shadow-sm mb-1">
//             <p className="text-sm text-gray-700">{selectedIds.length} selected</p>
//             <div className="flex gap-3">
//               <button
//                 onClick={handleBulkView}
//                 className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
//               >
//                 Mark as Viewed
//               </button>
//               <button
//                 onClick={handleBulkDelete}
//                 className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
//               >
//                 Delete Selected
//               </button>
//             </div>
//           </div>
//         )}

//         <div className="bg-white rounded-md shadow-sm divide-y">
//           {currentItems.length === 0 ? (
//             <p className="text-center py-8 text-gray-500">No enquiries found.</p>
//           ) : (
//             currentItems.map((enquiry) => {
//               const isChecked = selectedIds.includes(enquiry._id);
//               return (
//                 <div
//                   key={enquiry._id}
//                   className={`flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-all ${
//                     !enquiry.viewed ? "bg-gray-50 font-medium" : "text-gray-700"
//                   }`}
//                 >
//                   <div className="flex items-center gap-4 flex-1 min-w-0">
//                     <input
//                       type="checkbox"
//                       checked={isChecked}
//                       onChange={() => toggleSelect(enquiry._id)}
//                       className="w-4 h-4 border-gray-400 rounded-sm"
//                     />
//                     <button
//                       onClick={() => handleStarToggle(enquiry._id, enquiry.starred)}
//                       className={`text-xl ${
//                         enquiry.starred ? "text-yellow-500" : "text-gray-400"
//                       } hover:text-yellow-600`}
//                       title="Star"
//                     >
//                       {enquiry.starred ? "★" : "☆"}
//                     </button>
//                     <div className="min-w-0">
//                       <p className="truncate text-base">
//                         {enquiry.firstName} {enquiry.lastName}{" "}
//                         <span className="text-sm text-gray-500">({enquiry.email})</span>
//                       </p>
//                       <p className="text-sm text-gray-600 truncate w-11/12">
//                         {enquiry.subject}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="text-sm text-gray-500 whitespace-nowrap ml-4">
//                     {formatDate(enquiry.createdAt)}
//                   </div>
//                   <div className="flex items-center gap-2 ml-4">
//                     <button
//                       onClick={() => handleView(enquiry._id)}
//                       className="text-blue-600 hover:text-blue-800"
//                       title="View"
//                     >
//                       <Eye className="w-5 h-5" />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(enquiry._id)}
//                       className="text-red-600 hover:text-red-800"
//                       title="Delete"
//                     >
//                       <Trash2 className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>

//         {/* Pagination Controls */}
//         {totalPages > 1 && (
//           <div className="flex justify-between items-center mt-4">
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="px-3 py-1 border rounded disabled:opacity-50"
//               >
//                 Prev
//               </button>
//               <span>
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//                 className="px-3 py-1 border rounded disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//             <div>
//               <select
//                 value={itemsPerPage}
//                 onChange={(e) => {
//                   setItemsPerPage(Number(e.target.value));
//                   setCurrentPage(1);
//                 }}
//                 className="border px-2 py-1 rounded"
//               >
//                 {[5, 10, 20, 50].map((num) => (
//                   <option key={num} value={num}>
//                     {num} per page
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Inbox;


// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { MailOpen, Trash2, Eye, Search } from "lucide-react";

// function Inbox() {
//   const [enquiries, setEnquiries] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterDate, setFilterDate] = useState("");  // New date filter state
//   const [selectedIds, setSelectedIds] = useState([]);
//   const [filter, setFilter] = useState("all");
//   const [selectMenuOpen, setSelectMenuOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   // Sorting & pagination states
//   const [sortOption, setSortOption] = useState("newest");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);

//   const navigate = useNavigate();

//   const fetchData = async () => {
//     let url = "http://localhost:5000/api/enquiries";
//     if (filter === "starred") url += "?starred=true";
//     else if (filter === "unread") url += "?viewed=false";

//     const res = await axios.get(url);
//     const sorted = res.data.sort(
//       (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//     );
//     setEnquiries(sorted);
//   };

//   const handleDelete = async (id) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this enquiry?"
//     );
//     if (!confirmed) return;

//     await axios.delete(`http://localhost:5000/api/enquiries/${id}`);
//     fetchData();
//   };

//   const handleView = async (id) => {
//     await axios.put(`http://localhost:5000/api/enquiries/${id}/view`);
//     navigate(`/admin/enquiries/${id}`);
//   };

//   const handleStarToggle = async (id, currentStatus) => {
//     await axios.put(`http://localhost:5000/api/enquiries/${id}/star`, {
//       starred: !currentStatus,
//     });
//     fetchData();
//   };

//   const handleBulkDelete = async () => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete the selected enquiries?"
//     );
//     if (!confirmed) return;

//     await Promise.all(
//       selectedIds.map((id) => axios.delete(`http://localhost:5000/api/enquiries/${id}`))
//     );
//     setSelectedIds([]);
//     fetchData();
//   };

//   const handleBulkView = async () => {
//     await Promise.all(
//       selectedIds.map((id) => axios.put(`http://localhost:5000/api/enquiries/${id}/view`))
//     );
//     setSelectedIds([]);
//     fetchData();
//   };

//   const toggleSelect = (id) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//     );
//   };

//   const toggleSelectAll = () => {
//     if (allSelected) {
//       setSelectedIds([]);
//     } else {
//       setSelectedIds(filteredEnquiries.map((e) => e._id));
//     }
//   };

//   const handleSelectionMenuClick = (option) => {
//     switch (option) {
//       case "all":
//         setSelectedIds(filteredEnquiries.map((e) => e._id));
//         break;
//       case "none":
//         setSelectedIds([]);
//         break;
//       case "read":
//         setSelectedIds(filteredEnquiries.filter((e) => e.viewed).map((e) => e._id));
//         break;
//       case "unread":
//         setSelectedIds(filteredEnquiries.filter((e) => !e.viewed).map((e) => e._id));
//         break;
//       case "starred":
//         setSelectedIds(filteredEnquiries.filter((e) => e.starred).map((e) => e._id));
//         break;
//       case "unstarred":
//         setSelectedIds(filteredEnquiries.filter((e) => !e.starred).map((e) => e._id));
//         break;
//       default:
//         break;
//     }
//     setSelectMenuOpen(false);
//   };

//   const formatDate = (isoDate) => {
//     const date = new Date(isoDate);
//     return date.toLocaleString("en-IN", {
//       timeZone: "Asia/Kolkata",
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   useEffect(() => {
//     fetchData();
//   }, [filter]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setSelectMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Filtering logic with single date filter and text search fallback
//   const filteredEnquiries = enquiries
//     .filter((enquiry) => {
//       if (filterDate) {
//         const enquiryDate = new Date(enquiry.createdAt);
//         const selectedDate = new Date(filterDate);
//         return (
//           enquiryDate.getFullYear() === selectedDate.getFullYear() &&
//           enquiryDate.getMonth() === selectedDate.getMonth() &&
//           enquiryDate.getDate() === selectedDate.getDate()
//         );
//       }

//       const query = searchQuery.trim().toLowerCase();
//       const formattedDate = formatDate(enquiry.createdAt).toLowerCase();
//       const rawDate = enquiry.createdAt.toLowerCase();

//       return (
//         enquiry.firstName.toLowerCase().includes(query) ||
//         enquiry.lastName.toLowerCase().includes(query) ||
//         enquiry.email.toLowerCase().includes(query) ||
//         enquiry.subject.toLowerCase().includes(query) ||
//         formattedDate.includes(query) ||
//         rawDate.includes(query)
//       );
//     })
//     .sort((a, b) => {
//       if (sortOption === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
//       if (sortOption === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
//       if (sortOption === "az") return a.firstName.localeCompare(b.firstName);
//       if (sortOption === "za") return b.firstName.localeCompare(a.firstName);
//       return 0;
//     });

//   const allSelected =
//     selectedIds.length === filteredEnquiries.length && filteredEnquiries.length > 0;

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredEnquiries.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage);

//   return (
//     <div className="bg-gray-100 min-h-screen mt-0 p-6 ml-64">
//       <div className="max-w-6xl">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
//           <div className="flex items-center gap-4 relative">
//             <input
//               type="checkbox"
//               checked={allSelected}
//               onChange={toggleSelectAll}
//               className="w-4 h-4 border-gray-400 rounded-sm"
//               title="Select All"
//             />
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 onClick={() => setSelectMenuOpen(!selectMenuOpen)}
//                 className="w-5 h-5 border border-gray-400 rounded-sm flex items-center justify-center hover:bg-gray-100"
//                 title="Selection Options"
//               >
//                 <span className="text-xs">▾</span>
//               </button>
//               {selectMenuOpen && (
//                 <div className="absolute left-0 mt-1 w-36 bg-white border rounded-md shadow-lg z-10">
//                   {["All", "None", "Read", "Unread", "Starred", "Unstarred"].map(
//                     (label) => (
//                       <button
//                         key={label}
//                         onClick={() => handleSelectionMenuClick(label.toLowerCase())}
//                         className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
//                       >
//                         {label}
//                       </button>
//                     )
//                   )}
//                 </div>
//               )}
//             </div>
//             <select
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="text-sm px-3 py-1 border rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="all">📥 All</option>
//               <option value="starred">⭐ Starred</option>
//               <option value="unread">👁 Unread</option>
//             </select>
//             <select
//               value={sortOption}
//               onChange={(e) => setSortOption(e.target.value)}
//               className="text-sm px-3 py-1 border rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="newest">🆕 Newest First</option>
//               <option value="oldest">📜 Oldest First</option>
//               <option value="az">🔤 A-Z</option>
//               <option value="za">🔡 Z-A</option>
//             </select>
//             <button
//               onClick={fetchData}
//               className="text-sm bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300"
//               title="Refresh"
//             >
//               🔄 Refresh
//             </button>
//           </div>

//           {/* Search Input and Date Picker */}
//           <div className="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-80">
//             <div className="relative flex-1 w-full">
//               <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search mail"
//                 disabled={!!filterDate} // disable when date filter is active
//                 className={`pl-10 pr-4 py-2 w-full bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                   filterDate ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//               />
//             </div>
//             <div>
//               <input
//                 type="date"
//                 value={filterDate}
//                 onChange={(e) => setFilterDate(e.target.value)}
//                 className="border rounded px-3 py-2"
//                 title="Filter by Date"
//               />
//               {filterDate && (
//                 <button
//                   onClick={() => setFilterDate("")}
//                   className="ml-2 text-red-600 hover:underline text-sm"
//                   title="Clear Date Filter"
//                 >
//                   Clear
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         {selectedIds.length > 0 && (
//           <div className="flex items-center justify-between bg-white border px-6 py-3 rounded-t-md shadow-sm mb-1">
//             <p className="text-sm text-gray-700">{selectedIds.length} selected</p>
//             <div className="flex gap-3">
//               <button
//                 onClick={handleBulkView}
//                 className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
//               >
//                 Mark as Viewed
//               </button>
//               <button
//                 onClick={handleBulkDelete}
//                 className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
//               >
//                 Delete Selected
//               </button>
//             </div>
//           </div>
//         )}

//         <div className="bg-white rounded-md shadow-sm divide-y">
//           {currentItems.length === 0 ? (
//             <p className="text-center py-8 text-gray-500">No enquiries found.</p>
//           ) : (
//             currentItems.map((enquiry) => {
//               const isChecked = selectedIds.includes(enquiry._id);
//               return (
//                 <div
//                   key={enquiry._id}
//                   className={`flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-all ${
//                     !enquiry.viewed ? "bg-gray-50 font-medium" : "text-gray-700"
//                   }`}
//                 >
//                   <div className="flex items-center gap-4 flex-1 min-w-0">
//                     <input
//                       type="checkbox"
//                       checked={isChecked}
//                       onChange={() => toggleSelect(enquiry._id)}
//                       className="w-4 h-4 border-gray-400 rounded-sm"
//                     />
//                     <button
//                       onClick={() => handleStarToggle(enquiry._id, enquiry.starred)}
//                       className={`text-xl ${
//                         enquiry.starred ? "text-yellow-500" : "text-gray-400"
//                       } hover:text-yellow-600`}
//                       title="Star"
//                     >
//                       {enquiry.starred ? "★" : "☆"}
//                     </button>
//                     <div className="min-w-0">
//                       <p className="truncate text-base">
//                         {enquiry.firstName} {enquiry.lastName}{" "}
//                         <span className="text-sm text-gray-500">({enquiry.email})</span>
//                       </p>
//                       <p className="text-sm text-gray-600 truncate w-11/12">
//                         {enquiry.subject}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="text-sm text-gray-500 whitespace-nowrap ml-4">
//                     {formatDate(enquiry.createdAt)}
//                   </div>
//                   <div className="flex items-center gap-2 ml-4">
//                     <button
//                       onClick={() => handleView(enquiry._id)}
//                       className="text-blue-600 hover:text-blue-800"
//                       title="View"
//                     >
//                       <Eye className="w-5 h-5" />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(enquiry._id)}
//                       className="text-red-600 hover:text-red-800"
//                       title="Delete"
//                     >
//                       <Trash2 className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>

//         {/* Pagination Controls */}
//         {totalPages > 1 && (
//           <div className="flex justify-between items-center mt-4">
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="px-3 py-1 border rounded disabled:opacity-50"
//               >
//                 Prev
//               </button>
//               <span>
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//                 className="px-3 py-1 border rounded disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//             <div>
//               <select
//                 value={itemsPerPage}
//                 onChange={(e) => {
//                   setItemsPerPage(Number(e.target.value));
//                   setCurrentPage(1);
//                 }}
//                 className="border px-2 py-1 rounded"
//               >
//                 {[5, 10, 20, 50].map((num) => (
//                   <option key={num} value={num}>
//                     {num} per page
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Inbox;






import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MailOpen, Trash2, Eye, Search, Calendar } from "lucide-react";

function Inbox() {
  const [enquiries, setEnquiries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [dateInputOpen, setDateInputOpen] = useState(false); // controls date input visibility
  const [selectedIds, setSelectedIds] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectMenuOpen, setSelectMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [sortOption, setSortOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
    const confirmed = window.confirm(
      "Are you sure you want to delete this enquiry?"
    );
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
    const confirmed = window.confirm(
      "Are you sure you want to delete the selected enquiries?"
    );
    if (!confirmed) return;

    await Promise.all(
      selectedIds.map((id) => axios.delete(`http://localhost:5000/api/enquiries/${id}`))
    );
    setSelectedIds([]);
    fetchData();
  };

  const handleBulkView = async () => {
    await Promise.all(
      selectedIds.map((id) => axios.put(`http://localhost:5000/api/enquiries/${id}/view`))
    );
    setSelectedIds([]);
    fetchData();
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredEnquiries.map((e) => e._id));
    }
  };

  const handleSelectionMenuClick = (option) => {
    switch (option) {
      case "all":
        setSelectedIds(filteredEnquiries.map((e) => e._id));
        break;
      case "none":
        setSelectedIds([]);
        break;
      case "read":
        setSelectedIds(filteredEnquiries.filter((e) => e.viewed).map((e) => e._id));
        break;
      case "unread":
        setSelectedIds(filteredEnquiries.filter((e) => !e.viewed).map((e) => e._id));
        break;
      case "starred":
        setSelectedIds(filteredEnquiries.filter((e) => e.starred).map((e) => e._id));
        break;
      case "unstarred":
        setSelectedIds(filteredEnquiries.filter((e) => !e.starred).map((e) => e._id));
        break;
      default:
        break;
    }
    setSelectMenuOpen(false);
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSelectMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredEnquiries = enquiries
    .filter((enquiry) => {
      if (filterDate) {
        const enquiryDate = new Date(enquiry.createdAt);
        const selectedDate = new Date(filterDate);
        return (
          enquiryDate.getFullYear() === selectedDate.getFullYear() &&
          enquiryDate.getMonth() === selectedDate.getMonth() &&
          enquiryDate.getDate() === selectedDate.getDate()
        );
      }

      const query = searchQuery.trim().toLowerCase();
      const formattedDate = formatDate(enquiry.createdAt).toLowerCase();
      const rawDate = enquiry.createdAt.toLowerCase();

      return (
        enquiry.firstName.toLowerCase().includes(query) ||
        enquiry.lastName.toLowerCase().includes(query) ||
        enquiry.email.toLowerCase().includes(query) ||
        enquiry.subject.toLowerCase().includes(query) ||
        formattedDate.includes(query) ||
        rawDate.includes(query)
      );
    })
    .sort((a, b) => {
      if (sortOption === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOption === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortOption === "az") return a.firstName.localeCompare(b.firstName);
      if (sortOption === "za") return b.firstName.localeCompare(a.firstName);
      return 0;
    });

  const allSelected =
    selectedIds.length === filteredEnquiries.length && filteredEnquiries.length > 0;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEnquiries.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage);

  return (
    <div className="bg-gray-100 min-h-screen mt-0 p-6 ml-64">
      <div className="max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div className="flex items-center gap-4 relative">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleSelectAll}
              className="w-4 h-4 border-gray-400 rounded-sm"
              title="Select All"
            />
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setSelectMenuOpen(!selectMenuOpen)}
                className="w-5 h-5 border border-gray-400 rounded-sm flex items-center justify-center hover:bg-gray-100"
                title="Selection Options"
              >
                <span className="text-xs">▾</span>
              </button>
              {selectMenuOpen && (
                <div className="absolute left-0 mt-1 w-36 bg-white border rounded-md shadow-lg z-10">
                  {["All", "None", "Read", "Unread", "Starred", "Unstarred"].map(
                    (label) => (
                      <button
                        key={label}
                        onClick={() => handleSelectionMenuClick(label.toLowerCase())}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        {label}
                      </button>
                    )
                  )}
                </div>
              )}
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
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="text-sm px-3 py-1 border rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">🆕 Newest First</option>
              <option value="oldest">📜 Oldest First</option>
              <option value="az">🔤 A-Z</option>
              <option value="za">🔡 Z-A</option>
            </select>
            <button
              onClick={fetchData}
              className="text-sm bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300"
              title="Refresh"
            >
              🔄 Refresh
            </button>
          </div>

          {/* Search Input and Collapsible Date Picker */}
          <div className="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-80">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search mail"
                disabled={!!filterDate} // disable text search when date filter active
                className={`pl-10 pr-4 py-2 w-full bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  filterDate ? "opacity-50 cursor-not-allowed" : ""
                }`}
              />
            </div>

            <div className="flex items-center gap-2">
              {!dateInputOpen && !filterDate && (
                <button
                  onClick={() => setDateInputOpen(true)}
                  title="Select Date"
                  className="p-2 rounded hover:bg-gray-200"
                >
                  <Calendar className="w-6 h-6 text-gray-600" />
                </button>
              )}

              {(dateInputOpen || filterDate) && (
                <>
                  <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    onBlur={() => {
                      if (!filterDate) setDateInputOpen(false);
                    }}
                    className="border rounded px-3 py-2"
                    title="Filter by Date"
                    autoFocus
                  />
                  {filterDate && (
                    <button
                      onClick={() => {
                        setFilterDate("");
                        setDateInputOpen(false);
                      }}
                      className="ml-2 text-red-600 hover:underline text-sm"
                      title="Clear Date Filter"
                    >
                      Clear
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

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

        <div className="bg-white rounded-md shadow-sm divide-y">
          {currentItems.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No enquiries found.</p>
          ) : (
            currentItems.map((enquiry) => {
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
                      className="w-4 h-4 border-gray-400 rounded-sm"
                    />
                    <button
                      onClick={() => handleStarToggle(enquiry._id, enquiry.starred)}
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
                        <span className="text-sm text-gray-500">({enquiry.email})</span>
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border px-2 py-1 rounded"
              >
                {[5, 10, 20, 50].map((num) => (
                  <option key={num} value={num}>
                    {num} per page
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Inbox;


// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { MailOpen, Trash2, Eye, Search } from "lucide-react";

// function Inbox() {
//   const [enquiries, setEnquiries] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedIds, setSelectedIds] = useState([]);
//   const [filter, setFilter] = useState("all");
//   const [selectMenuOpen, setSelectMenuOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   // Added states for sorting & pagination
//   const [sortOption, setSortOption] = useState("newest");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);

//   const navigate = useNavigate();

//   const fetchData = async () => {
//     let url = "http://localhost:5000/api/enquiries";
//     if (filter === "starred") url += "?starred=true";
//     else if (filter === "unread") url += "?viewed=false";

//     const res = await axios.get(url);
//     const sorted = res.data.sort(
//       (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//     );
//     setEnquiries(sorted);
//   };

//   const handleDelete = async (id) => {
//     const confirmed = window.confirm("Are you sure you want to delete this enquiry?");
//     if (!confirmed) return;

//     await axios.delete(`http://localhost:5000/api/enquiries/${id}`);
//     fetchData();
//   };

//   const handleView = async (id) => {
//     await axios.put(`http://localhost:5000/api/enquiries/${id}/view`);
//     navigate(`/admin/enquiries/${id}`);
//   };

//   const handleStarToggle = async (id, currentStatus) => {
//     await axios.put(`http://localhost:5000/api/enquiries/${id}/star`, {
//       starred: !currentStatus,
//     });
//     fetchData();
//   };

//   const handleBulkDelete = async () => {
//     const confirmed = window.confirm("Are you sure you want to delete the selected enquiries?");
//     if (!confirmed) return;

//     await Promise.all(
//       selectedIds.map((id) =>
//         axios.delete(`http://localhost:5000/api/enquiries/${id}`)
//       )
//     );
//     setSelectedIds([]);
//     fetchData();
//   };

//   const handleBulkView = async () => {
//     await Promise.all(
//       selectedIds.map((id) =>
//         axios.put(`http://localhost:5000/api/enquiries/${id}/view`)
//       )
//     );
//     setSelectedIds([]);
//     fetchData();
//   };

//   const toggleSelect = (id) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//     );
//   };

//   const toggleSelectAll = () => {
//     if (allSelected) {
//       setSelectedIds([]);
//     } else {
//       setSelectedIds(filteredEnquiries.map((e) => e._id));
//     }
//   };

//   const handleSelectionMenuClick = (option) => {
//     switch (option) {
//       case "all":
//         setSelectedIds(filteredEnquiries.map((e) => e._id));
//         break;
//       case "none":
//         setSelectedIds([]);
//         break;
//       case "read":
//         setSelectedIds(filteredEnquiries.filter((e) => e.viewed).map((e) => e._id));
//         break;
//       case "unread":
//         setSelectedIds(filteredEnquiries.filter((e) => !e.viewed).map((e) => e._id));
//         break;
//       case "starred":
//         setSelectedIds(filteredEnquiries.filter((e) => e.starred).map((e) => e._id));
//         break;
//       case "unstarred":
//         setSelectedIds(filteredEnquiries.filter((e) => !e.starred).map((e) => e._id));
//         break;
//       default:
//         break;
//     }
//     setSelectMenuOpen(false);
//   };

//   const formatDate = (isoDate) => {
//     const date = new Date(isoDate);
//     return date.toLocaleString("en-IN", {
//       timeZone: "Asia/Kolkata",
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   useEffect(() => {
//     fetchData();
//   }, [filter]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setSelectMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const filteredEnquiries = enquiries
//     .filter((enquiry) => {
//       const query = searchQuery.toLowerCase();
//       return (
//         enquiry.firstName.toLowerCase().includes(query) ||
//         enquiry.lastName.toLowerCase().includes(query) ||
//         enquiry.email.toLowerCase().includes(query) ||
//         enquiry.subject.toLowerCase().includes(query)
//       );
//     })
//     .sort((a, b) => {
//       if (sortOption === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
//       if (sortOption === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
//       if (sortOption === "az") return a.firstName.localeCompare(b.firstName);
//       if (sortOption === "za") return b.firstName.localeCompare(a.firstName);
//       return 0;
//     });

//   const allSelected =
//     selectedIds.length === filteredEnquiries.length && filteredEnquiries.length > 0;

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredEnquiries.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage);

//   return (
//     <div className="bg-gray-100 min-h-screen mt-0 p-6 ml-64">
//       <div className="max-w-6xl">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
//           <div className="flex items-center gap-4 relative">
//             <input
//               type="checkbox"
//               checked={allSelected}
//               onChange={toggleSelectAll}
//               className="w-4 h-4 border-gray-400 rounded-sm"
//               title="Select All"
//             />
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 onClick={() => setSelectMenuOpen(!selectMenuOpen)}
//                 className="w-5 h-5 border border-gray-400 rounded-sm flex items-center justify-center hover:bg-gray-100"
//                 title="Selection Options"
//               >
//                 <span className="text-xs">▾</span>
//               </button>
//               {selectMenuOpen && (
//                 <div className="absolute left-0 mt-1 w-36 bg-white border rounded-md shadow-lg z-10">
//                   {["All", "None", "Read", "Unread", "Starred", "Unstarred"].map((label) => (
//                     <button
//                       key={label}
//                       onClick={() => handleSelectionMenuClick(label.toLowerCase())}
//                       className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
//                     >
//                       {label}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//             <select
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="text-sm px-3 py-1 border rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="all">📥 All</option>
//               <option value="starred">⭐ Starred</option>
//               <option value="unread">👁 Unread</option>
//             </select>
//             <select
//               value={sortOption}
//               onChange={(e) => setSortOption(e.target.value)}
//               className="text-sm px-3 py-1 border rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="newest">🆕 Newest First</option>
//               <option value="oldest">📜 Oldest First</option>
//               <option value="az">🔤 A-Z</option>
//               <option value="za">🔡 Z-A</option>
//             </select>
//             <button
//               onClick={fetchData}
//               className="text-sm bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300"
//               title="Refresh"
//             >
//               🔄 Refresh
//             </button>
//           </div>
//           <div className="relative w-full md:w-80">
//             <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search mail"
//               className="pl-10 pr-4 py-2 w-full bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>

//         {selectedIds.length > 0 && (
//           <div className="flex items-center justify-between bg-white border px-6 py-3 rounded-t-md shadow-sm mb-1">
//             <p className="text-sm text-gray-700">{selectedIds.length} selected</p>
//             <div className="flex gap-3">
//               <button
//                 onClick={handleBulkView}
//                 className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
//               >
//                 Mark as Viewed
//               </button>
//               <button
//                 onClick={handleBulkDelete}
//                 className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
//               >
//                 Delete Selected
//               </button>
//             </div>
//           </div>
//         )}

//         <div className="bg-white rounded-md shadow-sm divide-y">
//           {currentItems.length === 0 ? (
//             <p className="text-center py-8 text-gray-500">No enquiries found.</p>
//           ) : (
//             currentItems.map((enquiry) => {
//               const isChecked = selectedIds.includes(enquiry._id);
//               return (
//                 <div
//                   key={enquiry._id}
//                   className={`flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-all ${
//                     !enquiry.viewed ? "bg-gray-50 font-medium" : "text-gray-700"
//                   }`}
//                 >
//                   <div className="flex items-center gap-4 flex-1 min-w-0">
//                     <input
//                       type="checkbox"
//                       checked={isChecked}
//                       onChange={() => toggleSelect(enquiry._id)}
//                       className="w-4 h-4 border-gray-400 rounded-sm"
//                     />
//                     <button
//                       onClick={() => handleStarToggle(enquiry._id, enquiry.starred)}
//                       className={`text-xl ${
//                         enquiry.starred ? "text-yellow-500" : "text-gray-400"
//                       } hover:text-yellow-600`}
//                       title="Star"
//                     >
//                       {enquiry.starred ? "★" : "☆"}
//                     </button>
//                     <div className="min-w-0">
//                       <p className="truncate text-base">
//                         {enquiry.firstName} {enquiry.lastName}{" "}
//                         <span className="text-sm text-gray-500">({enquiry.email})</span>
//                       </p>
//                       <p className="text-sm text-gray-600 truncate w-11/12">
//                         {enquiry.subject}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="text-sm text-gray-500 whitespace-nowrap ml-4">
//                     {formatDate(enquiry.createdAt)}
//                   </div>
//                   <div className="flex items-center gap-2 ml-4">
//                     <button
//                       onClick={() => handleView(enquiry._id)}
//                       className="text-blue-600 hover:text-blue-800"
//                       title="View"
//                     >
//                       <Eye className="w-5 h-5" />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(enquiry._id)}
//                       className="text-red-600 hover:text-red-800"
//                       title="Delete"
//                     >
//                       <Trash2 className="w-5 h-5" />
//                     </button>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>

//         {/* Pagination Controls */}
//         {totalPages > 1 && (
//           <div className="flex justify-between items-center mt-4">
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="px-3 py-1 border rounded disabled:opacity-50"
//               >
//                 Prev
//               </button>
//               <span>
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button
//                 onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//                 className="px-3 py-1 border rounded disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//             <div>
//               <select
//                 value={itemsPerPage}
//                 onChange={(e) => {
//                   setItemsPerPage(Number(e.target.value));
//                   setCurrentPage(1);
//                 }}
//                 className="border px-2 py-1 rounded"
//               >
//                 {[5, 10, 20, 50].map((num) => (
//                   <option key={num} value={num}>
//                     {num} per page
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Inbox;
