import { useEffect, useState } from "react";
import BackendAPI from "../utils/BackendAPI";
import { CiShoppingCart } from "react-icons/ci";

function Cart() {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCart() {
      try {
        const { data } = await BackendAPI.get("/cart"); // use BackendAPI
        setCart(data);
      } catch (err) {
        console.error("Error fetching cart:", err.response || err);
      } finally {
        setLoading(false);
      }
    }
    fetchCart();
  }, []);

  const removeItem = async (productId) => {
    try {
      const { data } = await BackendAPI.post("/cart/remove", { productId });
      setCart(data);
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const increaseQuantity = async (item) => {
    try {
      const { data } = await BackendAPI.post("/cart/add", {
        productId: item.productId,
        title: item.title,
        price: item.price,
        image: item.image,
      });
      setCart(data);
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  if (loading) return <div className="p-6">Loading Cart...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <CiShoppingCart /> Your Cart
      </h2>

      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between border p-4 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-600">${item.price}</p>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => increaseQuantity(item)}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.productId)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6 text-right font-semibold text-xl">
            Total: $
            {cart.items
              .reduce((acc, item) => acc + item.price * item.quantity, 0)
              .toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
