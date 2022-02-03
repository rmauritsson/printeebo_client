import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, googleAuthProvider } from "../../firebase";

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

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

      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          name: user.displayName,
          email: user.email,
          phone: user.phoneNumber,
          //role: role,
          token: idTokenResult.token,
        },
      });
      history.push("/");

      // dispatch to redux
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

      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          name: user.displayName,
          email: user.email,
          phone: user.phoneNumber,
          //role: role,
          token: idTokenResult.token,
        },
      });
      history.push("/");
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
        </div>
      </div>
    </div>
  );
};
export default Login;
