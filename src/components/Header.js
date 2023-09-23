import Logo from "../assets/img/Logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import { useSelector } from "react-redux";
const Title = () => {
  return (
    <a className="h-20 pl-10" href="/">
      {<img className="h-20 p-2 " src={Logo} alt="Logo" />}
    </a>
  );
};
const setIsLoggedIn = () => {
  //Authenticate User
  return true;
};
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isOnline = useOnline();

  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  return (
    <div className="flex justify-between items-center pr-16 bg-slate-100">
      <Title />
      <ul className="flex gap-5">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contactUs">Contact Us</Link>
        </li>
        <li>
          <Link to="/cart">
            Cart{" "}
            <sup className=" text-white pl-2 pt-0.5 pb-0.5  pr-2 bg-orange-600 rounded-full text-base ">
              {cartItems.reduce((acc, item) => {
                return acc + item.qty;
              }, 0)}
            </sup>{" "}
          </Link>
        </li>
      </ul>
      {isLoggedIn === true ? (
        <button onClick={() => setIsLoggedIn(false)}>Logout</button>
      ) : (
        <button onClick={() => setIsLoggedIn(true)}>Login</button>
      )}
    </div>
  );
};
export default Header;
