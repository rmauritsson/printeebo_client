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

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    //get currently logged in user from firebase and dispatch to redux store
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log("Logged in User", user);
        const idTokenResult = await user.getIdTokenResult();
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
          <Route path="/login" component={Login} />
          <Route path="/register/complete" component={CompleteRegistration} />
          <Route path="/register" component={Register} />
          <Route path="/" component={Home} exact />
        </Switch>
      </Router>
    </>
  );
}

export default App;

// user data saved in store on completion of registration and then sent to backend for verificatio of token.
//
