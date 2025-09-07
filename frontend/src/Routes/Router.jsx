import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home";
import Signup from "../auth/Signup";
import Login from "../auth/Login";
import Details from "../Components/Partials/details";
import Cart from "../Components/Cart";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/signup" element={<Signup></Signup>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/details/:id" element={<Details></Details>}></Route>
      <Route path="/cart" element={<Cart></Cart>}></Route>
    </Routes>
  );
}

export default Router;
