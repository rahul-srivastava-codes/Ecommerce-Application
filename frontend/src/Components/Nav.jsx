import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { useState, useEffect } from "react";
import axios from "../utils/Axios";

function Nav({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);

  // Fetch all products once
  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get("products");
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }
    fetchProducts();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (onSearch) {
      const filtered = products.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      );
      onSearch(filtered);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-indigo-600">
          <Link to="/">Shopify</Link>
        </div>

        {/* Search */}
        <div className="flex-1 mx-6">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/login"
            className="text-gray-700 font-medium hover:text-indigo-600 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition"
          >
            Signup
          </Link>
          <Link
            to="/cart"
            className="px-4 py-2 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition"
          >
            <CiShoppingCart />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
