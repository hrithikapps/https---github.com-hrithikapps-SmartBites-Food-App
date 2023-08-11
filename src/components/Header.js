import Logo from "../assets/img/Logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
const Title = () => {
  return <a href="/">{<img className="logo" src={Logo} alt="Logo" />}</a>;
};
const setIsLoggedIn = () => {
  //Authenticate User
  return true;
};
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="nav-items">
      <Title />
      <ul>
        {/* <li><a href="">Home</a></li>
            <li><a href="">About</a></li>
            <li><a href="">Contact Us</a></li>
            <li><a href="">Cart</a></li> */}
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
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
      {isLoggedIn === true ? (
        <button onClick={() => setIsLoggedIn(false)}>Logout</button>
      ) : (
        <button onClick={() => setIsLoggedIn(true)}>login</button>
      )}
    </div>
  );
};
export default Header;
