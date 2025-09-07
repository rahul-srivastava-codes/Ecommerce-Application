import { Link } from "react-router-dom";
import BackendAPI from "../../utils/BackendAPI";

function Cards({ product }) {
  const addToCart = async (item) => {
    try {
      const res = await BackendAPI.post("/cart/add", {
        productId: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
      });
      if (res.data.success) alert("Added to cart successfully!");
    } catch (err) {
      console.error("Error adding to cart:", err.response || err);
      alert("Failed to add to cart. Make sure you are logged in.");
    }
  };

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
            onClick={() => addToCart(p)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Cards;
