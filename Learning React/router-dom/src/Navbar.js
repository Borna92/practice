import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <div>
      Navbar
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/menu">Menu</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
    </div>
  );
}
