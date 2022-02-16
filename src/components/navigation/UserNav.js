import { Link } from "react-router-dom";

const UserNav = () => {
  return (
    <nav>
      <ul>
        <li className="pt-2 pb-2">
          <Link to="/user/history">History</Link>
        </li>
        <li className="pt-2 pb-2">
          <Link to="/user/password">Password</Link>
        </li>
        <li className="pt-2 pb-2">
          <Link to="/user/wishlist">Wishlist</Link>
        </li>
      </ul>
    </nav>
  );
};

export default UserNav;
