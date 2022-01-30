import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="container mx-auto mt-2">
      <Link to="/login" className="p-2">
        Login
      </Link>
      <Link to="/register" className="p-2">
        Register
      </Link>
    </div>
  );
};

export default Header;
