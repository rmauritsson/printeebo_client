import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { currentAdmin } from "../../functions/auth";
import RedirectLoader from "./RedirectLoader";

const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [isStatusValid, setIsStatusValid] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then((res) => {
          console.log("CURRENT ADMIN RES", res);
          setIsStatusValid(true);
        })
        .catch((err) => {
          console.log("CURRENT ADMIN ERROR", err);
          setIsStatusValid(false);
        });
    }
  }, [user]);

  return isStatusValid ? <Route {...rest} /> : <RedirectLoader />;
};
export default AdminRoute;
