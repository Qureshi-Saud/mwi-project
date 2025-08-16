// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../api";
// import { motion } from "framer-motion";


// function Products() {
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     api
//       .get("/products")
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="bg-gray-50">
//       {/* Hero Section */}
//       <section className="w-full bg-blue-900 text-white text-center py-20 px-6">
//         <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
//           Our Products
//         </h1>
//         <p className="text-center text-white max-w-2xl mx-auto">
//           Discover our high-performance solutions tailored for power, chemical,
//           and industrial sectors. Trusted quality. Engineered to last.
//         </p>
//       </section>

//       {/* Content Container */}
//       <div className="bg-white text-gray-800 font-sans py-12 px-4 container mx-auto">
//         {/* Search Bar */}
//         <div className="mb-10 max-w-md mx-auto">
//           <input
//             type="text"
//             placeholder="Search by product name..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full px-4 py-3 rounded-lg border shadow focus:outline-none focus:ring focus:border-blue-300"
//           />
//         </div>

//         {/* Product Grid */}
//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
//           {filteredProducts.map((product) => (
//             <motion.div
//               key={product._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4 }}
//             >
//               <Link
//                 to={`/product/${product._id}`}
//                 className="w-full h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden flex flex-col"
//               >
//                 <div className="relative aspect-[4/3] overflow-hidden">
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
//                   />
//                   <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
//                     <span className="text-white text-lg font-semibold">
//                       View Details
//                     </span>
//                   </div>
//                 </div>

//                 <div className="p-4 flex-1 flex flex-col justify-between">
//                   <div>
//                     <span className="text-xs font-semibold text-blue-600 uppercase">
//                       Type {product.type}
//                     </span>
//                     <h3 className="text-xl font-bold text-gray-800 mt-2">
//                       {product.name}
//                     </h3>
//                   </div>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </div>

//         {/* Empty State */}
//         {filteredProducts.length === 0 && (
//           <p className="text-center text-gray-500 mt-10">
//             No products match your search.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Products;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../api";
// import { motion } from "framer-motion";
// import header from "../assets/header.png";

// // Animation Variants
// const containerVariants = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.15,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 30 },
//   show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
// };

// function Products() {
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [itemsPerPage, setItemsPerPage] = useState(20);
//   const [currentPage, setCurrentPage] = useState(1);

//   // Fetch products
//   useEffect(() => {
//     api
//       .get("/products")
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   // Adjust items per page based on screen size
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

//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Pagination calculations
//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentProducts = filteredProducts.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   const handlePageChange = (pageNumber) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   return (
//     <motion.div
//       className="bg-gray-50"
//       initial="hidden"
//       animate="show"
//       variants={containerVariants}
//     >
//       {/* Header Section */}
//       <header
//         className="relative h-64 md:h-64 bg-cover bg-center text-white flex flex-col items-center justify-center text-center px-6"
//         style={{ backgroundImage: `url(${header})` }}
//       >
//         <div className="absolute inset-0 bg-blue-900 bg-opacity-70"></div>

//         <motion.div
//           className="relative z-10 max-w-3xl"
//           initial={{ opacity: 0, y: -40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
//           <p className="max-w-2xl mx-auto text-base md:text-lg">
//             Discover our high-performance solutions tailored for power,
//             chemical, and industrial sectors. Trusted quality. Engineered to
//             last.
//           </p>
//         </motion.div>
//       </header>

//       {/* Content Container */}
//       <motion.div
//         className="bg-white text-gray-800 py-12 px-4 container mx-auto"
//         variants={containerVariants}
//       >
//         {/* Search Bar */}
//         <motion.div className="mb-10 max-w-md mx-auto" variants={itemVariants}>
//           <input
//             type="text"
//             placeholder="Search by product name..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full px-4 py-3 rounded-lg border shadow focus:outline-none focus:ring focus:border-blue-300"
//           />
//         </motion.div>

//         {/* Product Grid */}
//         <motion.div
//           className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
//           variants={containerVariants}
//         >
//           {currentProducts.map((product) => (
//             <motion.div key={product._id} variants={itemVariants}>
//               <Link
//                 to={`/product/${product._id}`}
//                 className="w-full h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden flex flex-col"
//               >
//                 <div className="relative aspect-[4/3] overflow-hidden">
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
//                   />
//                   <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
//                     <span className="text-white text-lg font-semibold">
//                       View Details
//                     </span>
//                   </div>
//                 </div>

//                 <div className="p-4 flex-1 flex flex-col justify-between">
//                   <div>
//                     <span className="text-xs font-semibold text-blue-600 uppercase">
//                       Type {product.type}
//                     </span>
//                     <h3 className="text-xl font-bold text-gray-800 mt-2">
//                       {product.name}
//                     </h3>
//                   </div>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Empty State */}
//         {filteredProducts.length === 0 && (
//           <motion.p
//             className="text-center text-gray-500 mt-10"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//           >
//             No products match your search.
//           </motion.p>
//         )}

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center mt-10 space-x-2 flex-wrap">
//             {/* Prev Button */}
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               className={`px-4 py-2 rounded-md border ${
//                 currentPage === 1
//                   ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                   : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
//               }`}
//             >
//               Prev
//             </button>

//             {Array.from({ length: totalPages }, (_, i) => i + 1)
//               .filter((page) => {
//                 if (page === 1 || page === totalPages) return true;
//                 if (page >= currentPage - 1 && page <= currentPage + 1)
//                   return true;
//                 return false;
//               })
//               .reduce((acc, page, idx, arr) => {
//                 if (idx > 0 && page - arr[idx - 1] > 1) {
//                   acc.push("ellipsis");
//                 }
//                 acc.push(page);
//                 return acc;
//               }, [])
//               .map((item, idx) =>
//                 item === "ellipsis" ? (
//                   <span
//                     key={`ellipsis-${idx}`}
//                     className="px-3 py-2 text-gray-500"
//                   >
//                     ...
//                   </span>
//                 ) : (
//                   <button
//                     key={item}
//                     onClick={() => handlePageChange(item)}
//                     className={`px-4 py-2 rounded-md border ${
//                       currentPage === item
//                         ? "bg-blue-600 text-white border-blue-600"
//                         : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
//                     }`}
//                   >
//                     {item}
//                   </button>
//                 )
//               )}

//             {/* Next Button */}
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className={`px-4 py-2 rounded-md border ${
//                 currentPage === totalPages
//                   ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                   : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
//               }`}
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </motion.div>
//     </motion.div>
//   );
// }

// export default Products;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { motion } from "framer-motion";
import header from "../assets/header.png";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch products
  useEffect(() => {
    api
      .get("/products")
      .then((res) => {
        setProducts(res.data.filter((p) => p.status === "Active"));
      })
      .catch((err) => console.error(err));
  }, []);

  // Adjust items per page based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(15);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(18);
      } else {
        setItemsPerPage(20);
      }
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.div
      className="bg-gray-50"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      {/* Header Section */}
      <header
        className="relative h-64 md:h-64 bg-cover bg-center text-white flex flex-col items-center justify-center text-center px-6"
        style={{ backgroundImage: `url(${header})` }}
      >
        <div className="absolute inset-0 bg-blue-900 bg-opacity-70"></div>
        <motion.div
          className="relative z-10 max-w-3xl"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="max-w-2xl mx-auto text-base md:text-lg">
            Discover our high-performance solutions tailored for power,
            chemical, and industrial sectors. Trusted quality. Engineered to
            last.
          </p>
        </motion.div>
      </header>

      {/* Content Container */}
      <motion.div
        className="bg-white text-gray-800 py-12 px-4 container mx-auto"
        variants={containerVariants}
      >
        {/* Search Bar */}
        <motion.div className="mb-10 max-w-md mx-auto" variants={itemVariants}>
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border shadow focus:outline-none focus:ring focus:border-blue-300"
          />
        </motion.div>

        {/* Product Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          variants={containerVariants}
        >
          {currentProducts.map((product) => (
            <motion.div key={product._id} variants={itemVariants}>
              <Link
                to={`/product/${product._id}`}
                className="w-full h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">
                      View Details
                    </span>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-blue-600 uppercase">
                      Type {product.type}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800 mt-2">
                      {product.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.p
            className="text-center text-gray-500 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            No products match your search.
          </motion.p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 space-x-2 flex-wrap">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md border ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                if (page === 1 || page === totalPages) return true;
                if (page >= currentPage - 1 && page <= currentPage + 1)
                  return true;
                return false;
              })
              .reduce((acc, page, idx, arr) => {
                if (idx > 0 && page - arr[idx - 1] > 1) {
                  acc.push("ellipsis");
                }
                acc.push(page);
                return acc;
              }, [])
              .map((item, idx) =>
                item === "ellipsis" ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="px-3 py-2 text-gray-500"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={item}
                    onClick={() => handlePageChange(item)}
                    className={`px-4 py-2 rounded-md border ${
                      currentPage === item
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md border ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default Products;
