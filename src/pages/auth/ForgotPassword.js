import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { auth } from "../../firebase";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const notification = () =>
    toast.success(
      `Using the same device, click the link sent to ${email} to complete your registration`
    );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
        handleCodeInApp: true,
      };

      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          setEmail("");
          notification();
        })
        .catch((err) => {
          toast.error(err.message);
          console.log("Error on Forgot Password in Err");
        });
    } catch (err) {
      toast.error(err.message);
      console.log("Error on Forgot Password", err);
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 mx-2 mb-2"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          readOnly
        />
        <button className="btn-primary btn-active" type="submit">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
