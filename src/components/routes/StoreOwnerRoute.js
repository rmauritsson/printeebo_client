import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { currentCreator } from "../../functions/auth";
import RedirectLoader from "./RedirectLoader";

const StoreOwnerRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [isStatusValid, setIsStatusValid] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentCreator(user.token)
        .then((res) => {
          console.log("CURRENT CREATOR RES", res);
          setIsStatusValid(true);
        })
        .catch((err) => {
          console.log("CURRENT CREATOR ERROR", err);
          setIsStatusValid(false);
        });
    }
  }, [user]);

  return isStatusValid ? <Route {...rest} /> : <RedirectLoader />;
};
export default StoreOwnerRoute;
