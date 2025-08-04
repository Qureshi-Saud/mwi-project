import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function EnquiryDetail() {
  const { id } = useParams();
  const [enquiry, setEnquiry] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/enquiries/${id}`)
      .then(res => setEnquiry(res.data));
  }, [id]);

  if (!enquiry) return <p>Loading...</p>;

  const handleReply = () => {
    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${enquiry.email}&su=RE: ${enquiry.subject}&body=Hi ${enquiry.firstName},%0D%0A%0D%0A`;
    window.open(gmailURL, "_blank");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl mb-4">Enquiry Details</h2>
      <p><strong>Name:</strong> {enquiry.firstName} {enquiry.lastName}</p>
      <p><strong>Email:</strong> {enquiry.email}</p>
      <p><strong>Phone:</strong> {enquiry.phone}</p>
      {enquiry.companyName && enquiry.companyName.trim() !== "" && (
        <p><strong>Company Name:</strong> {enquiry.companyName}</p>
      )}
      <p><strong>Subject:</strong> {enquiry.subject}</p>
      <p><strong>Message:</strong> {enquiry.message}</p>
      <div className="mt-4">
        <button
          onClick={handleReply}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Reply
        </button>
      </div>
    </div>
  );
}

export default EnquiryDetail;
