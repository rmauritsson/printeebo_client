import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <nav>
      <ul>
        <li className="pt-2 pb-2">
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li className="pt-2 pb-2">
          <Link to="/admin/store">Create Store</Link>
        </li>
        <li className="pt-2 pb-2">
          <Link to="/admin/stores">View Stores</Link>
        </li>
        <li className="pt-2 pb-2">
          <Link to="/admin/product">Create Product</Link>
        </li>
        <li className="pt-2 pb-2">
          <Link to="/admin/products">View Products</Link>
        </li>
        <li className="pt-2 pb-2">
          <Link to="/admin/category">Create Category</Link>
        </li>
        <li className="pt-2 pb-2">
          <Link to="/admin/categories">View Category</Link>
        </li>
        <li className="pt-2 pb-2">
          <Link to="/admin/sub-category">Sub Category</Link>
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

export default AdminNav;
