import { Link } from "react-router-dom";
import BackendAPI from "../../utils/BackendAPI";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function Cards({ product }) {
  const [id, setid] = useState();

  useEffect(() => {
    async function addtoCart() {
      if (!id) return; // prevent auto-trigger on mount
      const res = await BackendAPI.get("/cart/add", { params: { query: id } });

      if (res.data.success) {
        toast("Product added in the cart", {
          theme: "dark",
        });
      }
    }
    addtoCart();
  }, [id]);

  return (
    <div className="w-full h-[80vh] overflow-scroll flex items-center justify-between flex-wrap">
      {product.map((p, i) => (
        <div
          key={i}
          className="w-[15vw] h-[50vh] shadow-2xl flex flex-col gap-4 py-3 hover:scale-102 transition duration-300 mb-4 bg-blue-100"
        >
          <Link
            to={`/details/${p.id}`}
            className="w-[100%] h-[70%] overflow-hidden"
          >
            <img className="object-cover w-full h-full" src={p.image} alt="" />
          </Link>
          <div className="text-xl text-wrap">{p.title}</div>
          <div>${p.price}</div>
          <div className="flex items-center justify-between px-2 py-1 text-xs">
            <div className="box-shadow">{p.rating.rate}</div>
            <div>{p.rating.count}</div>
          </div>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer transition"
            onClick={() => setid(p.id)}
          >
            Add to Cart
          </button>
          <ToastContainer theme="dark" position="top-right" />
        </div>
      ))}
      {/* ✅ Correct placement */}
    </div>
  );
}

export default Cards;
