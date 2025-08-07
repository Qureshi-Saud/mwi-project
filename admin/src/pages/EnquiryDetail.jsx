// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";

// function EnquiryDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [enquiries, setEnquiries] = useState([]);
//   const [enquiry, setEnquiry] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchEnquiries = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/enquiries");
//         setEnquiries(res.data);
//       } catch (err) {
//         console.error("Failed to fetch enquiries", err);
//       }
//     };
//     fetchEnquiries();
//   }, []);

//   useEffect(() => {
//     const fetchCurrent = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(`http://localhost:5000/api/enquiries/${id}`);
//         setEnquiry(res.data);
//       } catch (err) {
//         console.error("Failed to fetch enquiry", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (id) fetchCurrent();
//   }, [id]);

//   const currentIndex = enquiries.findIndex((e) => e._id === id);
//   const hasPrevious = currentIndex > 0;
//   const hasNext = currentIndex >= 0 && currentIndex < enquiries.length - 1;

//   const goToPrevious = () => {
//     if (hasPrevious) {
//       navigate(`/admin/enquiries/${enquiries[currentIndex - 1]._id}`);
//     }
//   };

//   const goToNext = () => {
//     if (hasNext) {
//       navigate(`/admin/enquiries/${enquiries[currentIndex + 1]._id}`);
//     }
//   };

//   const handleReply = () => {
//     const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${enquiry.email}&su=RE: ${enquiry.subject}&body=Hi ${enquiry.firstName},%0D%0A%0D%0A`;
//     window.open(gmailURL, "_blank");
//   };

//   const handleDelete = async () => {
//     const confirmed = window.confirm("Are you sure you want to delete this enquiry?");
//     if (confirmed) {
//       try {
//         await axios.delete(`http://localhost:5000/api/enquiries/${id}`);
//         navigate("/admin/enquiries");
//       } catch (err) {
//         console.error("Delete failed", err);
//         alert("Failed to delete enquiry.");
//       }
//     }
//   };

//   // Show skeleton while loading
//   if (loading) {
//     return (
//       <div className="bg-[#f1f3f4] min-h-screen py-8 px-4">
//         <div className="max-w-3xl mx-auto bg-white rounded-md p-6 shadow-sm animate-pulse">
//           <div className="h-4 w-1/3 bg-gray-300 mb-4 rounded"></div>
//           <div className="flex justify-between mb-4">
//             <div className="space-y-2">
//               <div className="h-4 w-40 bg-gray-300 rounded"></div>
//               <div className="h-4 w-24 bg-gray-200 rounded"></div>
//             </div>
//             <div className="h-4 w-20 bg-gray-200 rounded"></div>
//           </div>
//           <div className="h-32 bg-gray-200 rounded my-4"></div>
//         </div>
//       </div>
//     );
//   }

//   if (!enquiry) {
//     return (
//       <div className="flex justify-center items-center h-screen text-gray-500">
//         Enquiry not found.
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#f1f3f4] min-h-screen py-8 px-4">
//       <div className="max-w-3xl mx-auto bg-white rounded-md p-6 shadow-sm relative text-sm">

//         {/* Header Buttons */}
//         <div className="flex justify-between items-center mb-6">
//           <button
//             onClick={() => navigate("/admin/enquiries")}
//             className="text-gray-600 hover:text-gray-900 hover:underline text-sm"
//           >
//             ← Back to Inbox
//           </button>

//           <div className="flex items-center gap-3">
//             <button
//               onClick={goToPrevious}
//               disabled={!hasPrevious}
//               className={`p-1 rounded-full ${
//                 hasPrevious ? "text-gray-700 hover:text-black" : "text-gray-300 cursor-not-allowed"
//               }`}
//             >
//               <ChevronLeft size={20} />
//             </button>
//             <button
//               onClick={goToNext}
//               disabled={!hasNext}
//               className={`p-1 rounded-full ${
//                 hasNext ? "text-gray-700 hover:text-black" : "text-gray-300 cursor-not-allowed"
//               }`}
//             >
//               <ChevronRight size={20} />
//             </button>
//             <button
//               onClick={handleDelete}
//               className="text-red-600 hover:text-red-800"
//               title="Delete Enquiry"
//             >
//               <Trash2 size={20} />
//             </button>
//           </div>
//         </div>

//         {/* Subject */}
//         <h1 className="text-xl font-semibold text-gray-900 mb-4">{enquiry.subject}</h1>

//         {/* Info Section */}
//         <div className="flex flex-col sm:flex-row justify-between text-gray-700 mb-4 gap-4">
//           <div className="space-y-1">
//             <p className="font-medium">
//               {enquiry.firstName} {enquiry.lastName}{" "}
//               <span className="font-normal text-gray-600">&lt;{enquiry.email}&gt;</span>
//             </p>
//             <p>
//               Phone: <span className="text-gray-800">{enquiry.phone}</span>
//             </p>
//             {enquiry.companyName && (
//               <p>
//                 Company: <span className="text-gray-800">{enquiry.companyName}</span>
//               </p>
//             )}
//           </div>
//           <div className="text-gray-500 text-sm sm:text-right">
//             {enquiry.createdAt
//               ? new Date(enquiry.createdAt).toLocaleString()
//               : new Date().toLocaleString()}
//           </div>
//         </div>

//         <hr className="my-4 border-gray-200" />

//         {/* Message Body */}
//         <div className="text-gray-800 whitespace-pre-wrap leading-relaxed mb-6">
//           {enquiry.message}
//         </div>

//         {/* Reply Button */}
//         <div className="text-right">
//           <button
//             onClick={handleReply}
//             className="text-blue-600 hover:underline font-medium text-sm"
//           >
//             Reply
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default EnquiryDetail;










import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Mail,
  Phone,
  Building2,
  User,
  MessageSquareText,
  Reply,
  FileText,
} from "lucide-react";

function EnquiryDetail() {
  const { id } = useParams();
  const [enquiry, setEnquiry] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/enquiries/${id}`)
      .then((res) => setEnquiry(res.data));
  }, [id]);

  if (!enquiry) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500 text-lg animate-pulse">Loading enquiry details...</p>
      </div>
    );
  }

  const handleReply = () => {
    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${enquiry.email}&su=RE: ${enquiry.subject}&body=Hi ${enquiry.firstName},%0D%0A%0D%0A`;
    window.open(gmailURL, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white py-12 px-6">
      <h2 className="text-4xl font-bold text-gray-800 text-center mb-10 tracking-tight">
        📩 Enquiry Overview
      </h2>

      <div className="max-w-3xl mx-auto space-y-6 text-gray-800 text-[17px] leading-relaxed">
        <div className="grid grid-cols-[24px_auto] gap-3 items-start">
          <User className="text-blue-600 w-5 h-5" />
          <p><span className="font-semibold">Name:</span> {enquiry.firstName} {enquiry.lastName}</p>

          <Mail className="text-emerald-600 w-5 h-5" />
          <p><span className="font-semibold">Email:</span> {enquiry.email}</p>

          <Phone className="text-yellow-600 w-5 h-5" />
          <p><span className="font-semibold">Phone:</span> {enquiry.phone}</p>

          {enquiry.companyName?.trim() !== "" && (
            <>
              <Building2 className="text-purple-600 w-5 h-5" />
              <p><span className="font-semibold">Company:</span> {enquiry.companyName}</p>
            </>
          )}

          <MessageSquareText className="text-pink-600 w-5 h-5" />
          <p><span className="font-semibold">Subject:</span> {enquiry.subject}</p>

          <FileText className="text-pink-600 w-5 h-5 mt-1" />
          <p>
            <span className="font-semibold">Message: </span>{" "}
            <span className="whitespace-pre-wrap">{enquiry.message}</span>
          </p>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={handleReply}
            className="inline-flex items-center gap-2 bg-blue-600 hover:scale-105 transition-transform text-white px-6 py-3 rounded-xl shadow-md"
          >
            <Reply size={18} />
            Reply via Gmail
          </button>
        </div>
      </div>
    </div>
  );
}

export default EnquiryDetail;