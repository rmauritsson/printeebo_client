import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const TopHeader = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  const history = useHistory();

  const handleLogOut = () => {
    firebase.auth().signOut();

    dispatch({
      type: "LOG_OUT",
      payload: null,
    });

    history.push("/login");
  };

  return (
    <div>
      <div className="h-[2.5rem] bg-silver w-full flex items-center justify-end">
        <ul className="flex mx-[2rem]">
          <li className="navlink">
            <Link to="/" className="header-link">
              Help
            </Link>
          </li>
          <li className="navlink">
            <Link to="/" className="header-link">
              Track Order
            </Link>
          </li>
          <li className="navlink">
            <Link to="/" className="header-link">
              Sell your art
            </Link>
          </li>
          {user && user.role === "buyer" && (
            <li className="navlink">
              <Link to="/user/history" className="header-link">
                Dashboard
              </Link>
            </li>
          )}
          {user && user.role === "creator" && (
            <li className="navlink">
              <Link to="/store/dashboard" className="header-link">
                Dashboard
              </Link>
            </li>
          )}
          {user && user.role === "admin" && (
            <li className="navlink">
              <Link to="/admin/dashboard" className="header-link">
                Dashboard
              </Link>
            </li>
          )}
          {!user && (
            <li className="navlink">
              <Link to="/login" className="header-link">
                Login
              </Link>
            </li>
          )}
          {!user && (
            <li className="navlink">
              <Link to="/register" className="header-link">
                Sign Up
              </Link>
            </li>
          )}
          {user && (
            <li className="navlink">
              <button className="navlink" onClick={handleLogOut}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TopHeader;
