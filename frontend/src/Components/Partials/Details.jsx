import Axios from "../../utils/Axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from "../Nav";
import BackendAPI from "../../utils/BackendAPI";

function Details() {
  const [detail, setDetail] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await Axios.get(`products/${id}`);
        setDetail(data);
        document.title = "Details | " + data.title;
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    }
    fetchProduct();
  }, [id]);

  if (!detail) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-lg text-gray-600 animate-pulse">Loading...</span>
      </div>
    );
  }

  const addToCart = async () => {
    try {
      await BackendAPI.post("/cart/add", {
        productId: detail.id,
        title: detail.title,
        price: detail.price,
        image: detail.image,
      });
      alert("Added to cart successfully!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add to cart. Make sure you are logged in.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Nav />
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="flex justify-center">
          <img
            src={detail.image}
            alt={detail.title}
            className="h-96 object-contain drop-shadow-md bg-white p-6 rounded-2xl"
          />
        </div>

        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-gray-800">{detail.title}</h1>
          <p className="text-gray-600 leading-relaxed">{detail.description}</p>

          <div className="flex items-center gap-2 text-yellow-600 font-semibold">
            ⭐ {detail.rating?.rate} / 5
            <span className="text-gray-500 text-sm">
              ({detail.rating?.count} reviews)
            </span>
          </div>

          <div className="text-3xl font-bold text-green-600">
            ${detail.price}
          </div>

          <div className="text-sm text-gray-500">
            Category: <span className="capitalize">{detail.category}</span>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={addToCart}
              className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition"
            >
              Add to Cart
            </button>
            <button className="px-6 py-3 rounded-xl bg-yellow-500 text-white font-semibold shadow-md hover:bg-yellow-600 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
