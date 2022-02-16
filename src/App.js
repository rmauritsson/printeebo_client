import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CompleteRegistration from "./pages/auth/CompleteRegistration";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { currentUser } from "./functions/auth";
import UserHistory from "./pages/user/History";
import StoreDashboard from "./pages/store/Dashboard";
import UserRoute from "./components/routes/UserRoute";
import UpdatePassword from "./pages/user/UpdatePassword";
import Wishlist from "./pages/user/Wishlist";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    //get currently logged in user from firebase and dispatch to redux store
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        //console.log("Logged in User", user);
        const idTokenResult = await user.getIdTokenResult();

        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                _id: res.data._id,
                name: res.data.name,
                email: res.data.email,
                phone: res.data.phone,
                role: res.data.role,
                token: idTokenResult.token,
              },
            });
            // history.push("/");
            console.log("Logged in User", res.data);
          })
          .catch((err) => console.log("Error from Server on App Load", err));
      } else {
        console.log("No user");
      }
    });

    // clean up
    return () => unsubscribe();
  }, []);

  return (
    <>
      <ToastContainer />
      <Router>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} exact />
          <Route
            exact
            path="/register/complete"
            component={CompleteRegistration}
          />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgot/password" component={ForgotPassword} />
          <UserRoute exact path="/user/history" component={UserHistory} />
          <UserRoute exact path="/user/password" component={UpdatePassword} />
          <UserRoute exact path="/user/wishlist" component={Wishlist} />
          <Route exact path="/store/dashboard" component={StoreDashboard} />
        </Switch>
      </Router>
    </>
  );
}

export default App;

// user data saved in store on completion of registration and then sent to backend for verificatio of token.
//
