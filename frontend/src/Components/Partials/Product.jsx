import { useState, useEffect } from "react";
import axios from "../../utils/Axios";
import Loading from "./Loading";
import Cards from "./Cards";

function Product({ filteredProducts }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await axios.get("products");
      setProducts(data);
    }
    fetchProducts();
  }, []);

  // Decide which products to show: search results or all
  const displayProducts =
    filteredProducts && filteredProducts.length > 0
      ? filteredProducts
      : products;

  if (displayProducts.length === 0) return <Loading />;

  return (
    <div>
      <Cards product={displayProducts} />
    </div>
  );
}

export default Product;
