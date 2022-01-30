import "./App.css";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CompleteRegistration from "./pages/auth/CompleteRegistration";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/register/complete" component={CompleteRegistration} />
          <Route path="/" component={Home} exact />
        </Switch>
      </Router>
    </>
  );
}

export default App;
