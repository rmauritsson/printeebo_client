import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Header = () => {
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
    <div className="container mx-auto mt-2">
      <div className="flex flex-row">
        <div className="basis-1/4">Home</div>

        <div className="basis-1/4">Search Bar</div>
        <div className="basis-1/2">
          {!user && (
            <Link to="/login" className="">
              Login
            </Link>
          )}
          {!user && (
            <Link to="/register" className="">
              Register
            </Link>
          )}
          {user && (
            <button className="btn-active btn-primary" onClick={handleLogOut}>
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
