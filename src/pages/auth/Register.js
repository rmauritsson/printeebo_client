import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../firebase";

const Register = () => {
  const [registrationEmail, setRegistrationEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const notification = () =>
    toast.success(
      `Using the same device, click the link sent to ${registrationEmail} to complete your registration`
    );

  const emailValidation = () => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return !(!registrationEmail || regex.test(registrationEmail) === false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Send email for verification in firebase
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    //validate email address
    const isEmailValid = emailValidation();

    if (isEmailValid) {
      setIsValid(isEmailValid);
      setValidationMessage("Email Address is Valid!");

      //send link to firebase
      await auth.sendSignInLinkToEmail(registrationEmail, config);
      notification();
      //save user to local storage
      localStorage.setItem("emailForRegistration", registrationEmail);

      setRegistrationEmail("");
    } else {
      setIsValid(isEmailValid);
      setValidationMessage("Email Address is Not Valid!");
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
            className="border p-2 mx-2"
            type="text"
            autoFocus
            value={registrationEmail}
            onChange={(e) => setRegistrationEmail(e.target.value)}
            placeholder="Enter email to receive link"
          />
          <button
            type="submit"
            className={
              registrationEmail
                ? "btn-primary btn-active"
                : "btn-primary btn-disabled"
            }
          >
            Register
          </button>
        </form>
        {isValid ? "" : <p>{validationMessage}</p>}
      </div>
    </div>
  );
};
export default Register;
