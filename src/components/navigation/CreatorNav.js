import { Link } from "react-router-dom";

const CreatorNav = () => {
  return (
    <nav>
      <ul>
        <li className="pt-2 pb-2">
          <Link to="/store/dashboard">Dashboard</Link>
        </li>
        <li className="pt-2 pb-2">
          <Link to="/store/add">Create Store</Link>
        </li>

        <li className="pt-2 pb-2">
          <Link to="/store/product">Create Product</Link>
        </li>
        <li className="pt-2 pb-2">
          <Link to="/store/products">View Products</Link>
        </li>
        <li className="pt-2 pb-2">
          <Link to="/admin/coupons">Coupons</Link>
        </li>
        <li className="pt-2 pb-2">
          <Link to="/user/password">Password</Link>
        </li>
      </ul>
    </nav>
  );
};

export default CreatorNav;
