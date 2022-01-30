import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react/cjs/react.development";
import { auth } from "../../firebase";

const CompleteRegistration = ({ history }) => {
  const [registrationEmail, setRegistrationEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("emailForRegistration");
    setRegistrationEmail(email);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sign in user without password

      if (password && phoneNumber && role) {
        const url = window.location.href;
        const result = await auth.signInWithEmailLink(registrationEmail, url);

        if (result.user.emailVerified) {
          //remove email from localStorage
          localStorage.removeItem("emailForRegistration");
          //get user id token

          let user = auth.currentUser;
          await user.updatePassword(password);

          const idTokenResult = await user.getIdTokenResult();

          //populate user in redux store
          //result.user.displayName
          //redirect
          history.push("/");
        }
      } else {
        toast.error("Please fill in all the fields and submit");
      }
    } catch (err) {
      toast.error(err.message);
      console.log("Error on Complete Registration", err);
    }
  };

  return (
    <div className="container mx-auto px-12">
      <h1 className="text-2xl text-blue-500">Complete Registration</h1>
      <Link to="/" className="p-0 text-[14px]">
        Back
      </Link>

      <div className="mt-[2rem]">
        <form className="flex flex-col w-[22rem]" onSubmit={handleSubmit}>
          <div className="flex mb-2" onChange={(e) => setRole(e.target.value)}>
            <div className="p-2 mx-2">
              <input type="radio" name="role" id="buyer" value="buyer" />
              <label htmlFor="buyer">Buyer</label>
            </div>
            <div className="p-2 mx-2">
              <input type="radio" name="role" id="creator" value="creator" />
              <label htmlFor="creator">Creator</label>
            </div>
          </div>

          <input
            className="border p-2 mx-2 mb-2"
            type="text"
            value={registrationEmail}
            onChange={(e) => setRegistrationEmail(e.target.value)}
            placeholder="Email address"
            readOnly
          />
          <input
            className="border p-2 mx-2 mb-2"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
          />
          <input
            className="border p-2 mx-2 mb-2"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button
            className="border p-2 mx-2"
            type="submit"
            className="btn-primary btn-active"
          >
            Complete Registration
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteRegistration;
