// import React, { useEffect, useState } from "react";
// import api from "../api";
// import { useNavigate } from "react-router-dom";

// function Dashboard() {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(20);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return navigate("/");
//     fetchProducts();
//   }, [navigate]);

//   useEffect(() => {
//     const updateItemsPerPage = () => {
//       if (window.innerWidth < 768) {
//         setItemsPerPage(15); // mobile
//       } else if (window.innerWidth < 1024) {
//         setItemsPerPage(18); // tablet
//       } else {
//         setItemsPerPage(20); // desktop
//       }
//     };
//     updateItemsPerPage();
//     window.addEventListener("resize", updateItemsPerPage);
//     return () => window.removeEventListener("resize", updateItemsPerPage);
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await api.get("/products");
//       setProducts(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this product?")) return;
//     try {
//       await api.delete(`/products/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setProducts(products.filter((p) => p._id !== id));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Pagination calculations
//   const totalPages = Math.ceil(products.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div className="ml-64 min-h-screen px-8 py-6 bg-gray-100">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-4xl font-bold text-gray-800">Uploaded Products</h1>
//       </div>

//       {products.length === 0 ? (
//         <p className="text-gray-500 text-lg">No products found.</p>
//       ) : (
//         <>
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white shadow rounded-lg">
//               <thead className="bg-gray-200 text-gray-700 text-sm">
//                 <tr>
//                   <th className="text-left py-3 px-4">Image</th>
//                   <th className="text-left py-3 px-4">Name</th>
//                   <th className="text-left py-3 px-4">Type</th>
//                   <th className="text-left py-3 px-4">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentProducts.map((product) => (
//                   <tr key={product._id} className="border-t hover:bg-gray-50">
//                     <td className="py-3 px-4">
//                       {product.image ? (
//                         <img
//                           src={product.image}
//                           alt={product.name}
//                           className="w-16 h-16 object-cover rounded"
//                         />
//                       ) : (
//                         <span className="text-gray-400 italic">No Image</span>
//                       )}
//                     </td>
//                     <td
//                       className="py-3 px-4 font-medium text-blue-600 hover:underline cursor-pointer"
//                       onClick={() => navigate(`/product/${product._id}`)}
//                     >
//                       {product.name}
//                     </td>
//                     <td className="py-3 px-4">
//                       <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
//                         {product.type}
//                       </span>
//                     </td>
//                     <td className="py-3 px-4">
//                       <button
//                         onClick={() => handleDelete(product._id)}
//                         className="text-red-600 hover:underline text-sm"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="flex justify-center items-center mt-6 space-x-2">
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               className={`px-3 py-1 rounded ${
//                 currentPage === 1
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-blue-500 text-white hover:bg-blue-600"
//               }`}
//             >
//               Prev
//             </button>
//             {Array.from({ length: totalPages }, (_, i) => (
//               <button
//                 key={i}
//                 onClick={() => handlePageChange(i + 1)}
//                 className={`px-3 py-1 rounded ${
//                   currentPage === i + 1
//                     ? "bg-blue-600 text-white"
//                     : "bg-gray-200 hover:bg-gray-300"
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className={`px-3 py-1 rounded ${
//                 currentPage === totalPages
//                   ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                   : "bg-blue-500 text-white hover:bg-blue-600"
//               }`}
//             >
//               Next
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Dashboard;

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Search, List, Grid } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Dashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [compactView, setCompactView] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [navigate]);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(15); // mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(18); // tablet
      } else {
        setItemsPerPage(20); // desktop
      }
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.put(`/products/${id}/status`, { status: newStatus });
      setProducts((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, status: newStatus } : p
        )
      );
    } catch (err) {
      console.error("Error updating status", err);
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    try {
      await api.put(`/products/${id}/status`, { status: newStatus });
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, status: newStatus } : p))
      );
    } catch (err) {
      console.error("Error updating status", err);
    }
  };

  // Filter products by search
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Status counters
  const activeCount = products.filter((p) => p.status === "Active").length;
  const inactiveCount = products.filter((p) => p.status === "Inactive").length;

  return (
    <div className="p-6 ml-64">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
        {/* Search Bar */}
        <div className="relative w-full sm:w-1/3">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Quick search..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full focus:ring-2 focus:ring-blue-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Counters */}
        <div className="flex gap-4 text-sm font-medium">
          <span className="text-green-600">Active: {activeCount}</span>
          <span className="text-red-600">Inactive: {inactiveCount}</span>
        </div>

      {products.length === 0 ? (
        <p className="text-gray-500 text-lg">No products found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-lg">
              <thead className="bg-gray-200 text-gray-700 text-sm">
                <tr>
                  <th className="text-left py-3 px-4">Image</th>
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product) => (
                  <tr key={product._id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <span className="text-gray-400 italic">No Image</span>
                      )}
                    </td>
                    <td
                      className="py-3 px-4 font-medium text-blue-600 hover:underline cursor-pointer"
                      onClick={() => navigate(`/product/${product._id}`)}
                    >
                      {product.name}
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                        {product.type}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-gray-600">
          Showing {indexOfFirstItem + 1}–
          {Math.min(indexOfLastItem, filteredProducts.length)} of{" "}
          {filteredProducts.length}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 border rounded-lg hover:bg-gray-100 disabled:opacity-40"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="px-3">
            {currentPage} / {totalPages || 1}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 border rounded-lg hover:bg-gray-100 disabled:opacity-40"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
