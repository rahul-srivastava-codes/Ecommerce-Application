import { useState } from "react";
import Nav from "./Nav";
import Product from "./Partials/Product";

function Home() {
  document.title = "Shopify";

  const [filteredProducts, setFilteredProducts] = useState([]);

  // Pass this to Nav to update filtered products on search
  const handleSearch = (results) => {
    setFilteredProducts(results);
  };

  return (
    <div>
      <Nav onSearch={handleSearch} />
      <Product filteredProducts={filteredProducts} />
    </div>
  );
}

export default Home;
