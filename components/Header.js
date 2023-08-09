import { useState } from "react";
const Title = () => {
  return (
    <a href="/">
      <img
        className="logo"
        src="https://cdn.logojoy.com/wp-content/uploads/2018/05/01105800/298.png"
        alt="Logo"
      />
    </a>
  );
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
        <li>Home</li>
        <li>About</li>
        <li>Contact Us</li>
        <li>Cart</li>
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
