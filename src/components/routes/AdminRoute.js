import { useSelector } from "react-redux";
import { Route, Link } from "react-router-dom";
import RedirectLoader from "./RedirectLoader";

const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? (
    <Route {...rest} render={() => children} />
  ) : (
    <RedirectLoader />
  );
};
export default AdminRoute;
