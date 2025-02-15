import Logo from "../assets/img/Logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import { useSelector } from "react-redux";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { CLIENT_ID } from "./Constants";
import jwt_decode from "jwt-decode";
import { FaBars, FaTimes } from "react-icons/fa";

const Title = () => {
  return (
   <a className="h-20 flex items-center pl-10" href="/">
      <img className="h-20 w-auto p-2" src={Logo} alt="Logo" />
    </a>
  );
};

// const setIsLoggedIn = () => {
//   //Authenticate User
//   return true;
// };
const Header = () => {
  const [user, setUser] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setUser({});
  };

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isOnline = useOnline();
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  return (
<div className="flex items-center px-10 py-2 bg-slate-100 relative">
      <Title />

      {/* Mobile Menu Toggle Button */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <ul
        className={`absolute md:flex md:justify-center md:items-center md:static top-full left-0 w-full bg-slate-100 p-4 md:p-0 md:gap-4 text-lg transition-all duration-300 ease-in-out ${
          menuOpen ? "block" : "hidden md:flex"
        }`}
      >
        <li className="py-2 md:py-0 text-center md:px-2">
          <Link to="/">Home</Link>
        </li>
        <li className="py-2 md:py-0 text-center md:px-2">
          <Link to="/about">About</Link>
        </li>
        <li className="py-2 md:py-0 text-center md:px-2">
          <Link to="/contactUs">Contact Us</Link>
        </li>
        <li className="py-2 md:py-0 text-center md:px-2">
          <Link to="/cart">
            Cart
            <sup className="text-white pl-2 pt-0.5 pb-0.5 pr-2 bg-orange-600 rounded-full text-base">
              {cartItems.reduce((acc, item) => acc + item.qty, 0)}
            </sup>
          </Link>
        </li>
      </ul>

      {/* Google Authentication */}
      <div className="hidden md:block">
        {/* {isLoggedIn === true ? (
          <button onClick={() => setIsLoggedIn(false)}>Logout</button>
        ) : (
          <button onClick={() => setIsLoggedIn(true)}>Login</button>
        )} */}
        {Object.keys(user).length !== 0 && (
          <button className="text-lg" onClick={() => handleLogout()}>
            Logout
          </button>
        )}
        {Object.keys(user).length === 0 && (
          <GoogleOAuthProvider clientId={CLIENT_ID}>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                var decodedUserObject = jwt_decode(
                  credentialResponse.credential
                );
                setUser(decodedUserObject);
                console.log(decodedUserObject);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </GoogleOAuthProvider>
        )}
      </div>
    </div>
  );
};
export default Header;
