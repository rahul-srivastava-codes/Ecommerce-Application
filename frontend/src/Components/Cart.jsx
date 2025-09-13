import { useEffect, useState } from "react";
import BackendAPI from "../utils/BackendAPI";
import { CiShoppingCart } from "react-icons/ci";

function Cart() {
  

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <CiShoppingCart /> Your Cart
      </h2>
    </div>
  );
}

export default Cart;
