import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Dashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) setItemsPerPage(15);
      else if (window.innerWidth < 1024) setItemsPerPage(18);
      else setItemsPerPage(15);
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
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in or your session has expired.");
      return;
    }

    if (!window.confirm("Delete this product?")) return;

    try {
      await api.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prev) => prev.filter((p) => p._id !== id));
      alert("Product deleted successfully.");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert("Unauthorized: Please log in with valid credentials.");
      } else {
        console.error("Error deleting:", err);
        alert("Failed to delete product. Please try again later.");
      }
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

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

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
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((p) => (
              <tr
                key={p._id}
                className="border-t transition-all cursor-pointer hover:bg-gray-50 hover:shadow-sm text-base"
              >
                {/* Image */}
                <td className="px-4 py-3">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-gray-400 italic">No Image</span>
                  )}
                </td>

                {/* Name (clickable) */}
                <td
                  className="px-4 py-3 font-medium text-blue-600 hover:underline"
                  onClick={() => navigate(`/product/${p._id}`)}
                >
                  {p.name}
                </td>

                {/* Type */}
                <td className="px-4 py-3">
                  <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600 font-medium">
                    {p.type}
                  </span>
                </td>

                {/* Status (toggle pill) */}
                <td className="px-4 py-3">
                  <span
                    onClick={() => handleStatusToggle(p._id, p.status)}
                    className={`px-3 py-1 text-xs rounded-full font-medium cursor-pointer ${
                      p.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="px-3 py-1 text-sm rounded-lg border border-red-500 text-red-500 hover:bg-red-50 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {currentItems.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No products found
                </td>
              </tr>
            )}
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
