import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

function EnquiryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState([]);
  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all enquiries
  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/enquiries");
        setEnquiries(res.data);
      } catch (err) {
        console.error("Failed to fetch enquiries", err);
      }
    };
    fetchEnquiries();
  }, []);

  // Fetch current enquiry
  useEffect(() => {
    const fetchCurrent = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/enquiries/${id}`);
        setEnquiry(res.data);
      } catch (err) {
        console.error("Failed to fetch enquiry", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCurrent();
  }, [id]);

  // Guard: still loading or missing data
  if (loading || !enquiry) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  // Determine current index only after enquiries are loaded
  const currentIndex = enquiries.findIndex((e) => e._id === id);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < enquiries.length - 1;

  const goToPrevious = () => {
    if (hasPrevious) {
      navigate(`/admin/enquiries/${enquiries[currentIndex - 1]._id}`);
    }
  };

  const goToNext = () => {
    if (hasNext) {
      navigate(`/admin/enquiries/${enquiries[currentIndex + 1]._id}`);
    }
  };

  const handleReply = () => {
    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${enquiry.email}&su=RE: ${enquiry.subject}&body=Hi ${enquiry.firstName},%0D%0A%0D%0A`;
    window.open(gmailURL, "_blank");
  };

  return (
    <div className="bg-[#f1f3f4] min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-md p-6 text-sm shadow-sm relative">

        {/* Back and Navigation Buttons */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => navigate("/admin/enquiries")}
            className="text-gray-600 hover:text-gray-900 hover:underline text-sm"
          >
            ← Back to Inbox
          </button>

          <div className="flex gap-2">
            <button
              onClick={goToPrevious}
              disabled={!hasPrevious}
              className={`p-1 rounded-full ${
                hasPrevious ? "text-gray-700 hover:text-black" : "text-gray-300 cursor-not-allowed"
              }`}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goToNext}
              disabled={!hasNext}
              className={`p-1 rounded-full ${
                hasNext ? "text-gray-700 hover:text-black" : "text-gray-300 cursor-not-allowed"
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Subject */}
        <h1 className="text-xl font-medium text-gray-900 mb-4">{enquiry.subject}</h1>

        {/* Meta Info */}
        <div className="flex justify-between text-gray-700 text-sm mb-4">
          <div>
            <p className="font-semibold">
              {enquiry.firstName} {enquiry.lastName}{" "}
              <span className="font-normal text-gray-600">
                &lt;{enquiry.email}&gt;
              </span>
            </p>
            <p className="mt-1 text-gray-600">
              Phone: <span className="text-gray-800">{enquiry.phone}</span>
            </p>
            {enquiry.companyName && enquiry.companyName.trim() !== "" && (
              <p className="mt-1 text-gray-600">
                Company:{" "}
                <span className="text-gray-800">{enquiry.companyName}</span>
              </p>
            )}
          </div>
          <div className="text-gray-500 text-right">
            {enquiry.createdAt
              ? new Date(enquiry.createdAt).toLocaleString()
              : new Date().toLocaleString()}
          </div>
        </div>

        <hr className="my-4 border-gray-200" />

        {/* Message */}
        <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
          {enquiry.message}
        </div>

        {/* Reply Button */}
        <div className="pt-6 text-right">
          <button
            onClick={handleReply}
            className="text-blue-600 hover:underline font-medium text-sm"
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}

export default EnquiryDetail;
