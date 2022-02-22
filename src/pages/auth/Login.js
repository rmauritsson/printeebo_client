import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, googleAuthProvider } from "../../firebase";
import axios from "axios";

const userAuth = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/user-auth`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const roleBasedRedirect = (res) => {
    if (res.data.role === "admin") {
      history.push("/admin/dashboard");
    } else if (res.data.role === "creator") {
      history.push("/store/dashboard");
    } else {
      history.push("/user/history");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await auth.signInWithEmailAndPassword(
        userEmail,
        userPassword
      );
      console.log("Result from Login", result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      userAuth(idTokenResult.token)
        .then((res) => {
          console.log("Response from Server on Login", res);

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
          //history.push("/");
          roleBasedRedirect(res);
        })
        .catch((err) => console.log("Error from Server", err));
    } catch (err) {
      toast.error(err.message);
      console.log("Error on Login", err);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await auth.signInWithPopup(googleAuthProvider);
      console.log("Google Login", result);

      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      userAuth(idTokenResult.token)
        .then((res) => {
          console.log("Response from Server on Login", res);

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

          roleBasedRedirect(res);
        })
        .catch((err) => console.log("Error from Server", err));
    } catch (err) {
      toast.error(err.message);
      console.log("Error on Login", err);
    }
  };

  //
  return (
    <div className="container mx-auto px-12">
      <h1 className="text-2xl text-blue-500">Registration</h1>
      <Link to="/" className="p-0 text-[14px]">
        Back
      </Link>

      <div className="mt-[2rem]">
        <form onSubmit={handleSubmit}>
          <input
            className="border p-2 mb-4"
            type="text"
            autoFocus
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Enter Email"
          />
          <br />
          <input
            className="border p-2 mb-4"
            type="password"
            autoFocus
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            placeholder="Enter Password"
          />
          <br />
          <button
            type="submit"
            className={
              userEmail && userPassword
                ? "btn-primary btn-active"
                : "btn-primary btn-disabled"
            }
            disabled={!userEmail || userPassword.length < 6}
          >
            Login with Email/Password
          </button>
        </form>

        <div>
          <button
            onClick={loginWithGoogle}
            className="btn-primary bg-red-500 mt-2 rounded-2xl"
          >
            Login with Google
          </button>

          <Link to="/forgot/password" className="mt-2 text-red-300">
            Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
