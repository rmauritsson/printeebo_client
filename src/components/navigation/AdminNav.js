import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <nav>
      <ul>
        <li className="navlink py-2">
          <Link to="/admin/dashboard" className="header-link">
            Dashboard
          </Link>
        </li>
        <li className="navlink py-2">
          <Link to="/admin/store" className="header-link">
            Create Store
          </Link>
        </li>
        <li className="navlink py-2">
          <Link to="/admin/stores" className="header-link">
            View Stores
          </Link>
        </li>
        <li className="navlink py-2">
          <Link to="/admin/product" className="header-link">
            Create Product
          </Link>
        </li>
        <li className="navlink py-2">
          <Link to="/admin/products" className="header-link">
            View Products
          </Link>
        </li>
        <li className="navlink py-2">
          <Link to="/admin/category" className="header-link">
            Create Category
          </Link>
        </li>

        <li className="navlink py-2">
          <Link to="/admin/subcategory" className="header-link">
            Sub Category
          </Link>
        </li>
        <li className="navlink py-2">
          <Link to="/admin/coupons" className="header-link">
            Coupons
          </Link>
        </li>
        <li className="navlink py-2">
          <Link to="/user/password" className="header-link">
            Password
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
