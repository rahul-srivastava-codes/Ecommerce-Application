import Nav from "./Nav";
import Product from "./Partials/Product";

function Home() {
  document.title = "Shopify";

  return (
    <div>
      <Nav />
      <Product />
    </div>
  );
}

export default Home;
