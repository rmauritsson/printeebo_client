import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogOut = () => {
    firebase.auth().signOut();

    dispatch({
      type: "LOG_OUT",
    });

    history.push("/login");
  };

  return (
    <div className="container mx-auto mt-2">
      <div class="flex flex-row">
        <div class="basis-1/4">Home</div>
        <div class="basis-1/4">Search Bar</div>
        <div class="basis-1/2">
          <Link to="/login" className="">
            Login
          </Link>
          <Link to="/register" className="">
            Register
          </Link>
          <button onClick={handleLogOut}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
