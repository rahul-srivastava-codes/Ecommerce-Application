import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { useState, useEffect } from "react";

import BackendAPI from "../utils/BackendAPI";

function Nav() {
  const [search, setsearch] = useState("");
  const [product, setproduct] = useState([]);

  useEffect(() => {
    async function fetch() {
      if (search.length != 0) {
        const { data } = await BackendAPI.get("/search/product/id", {
          params: { query: search },
        });
        console.log(data);

        if (!data.success) {
          alert("No such product exist");
        }
        setproduct(data.product);
        console.log(data.product);
      }
    }
    fetch();
  }, [search]);

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
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
        </div>

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
