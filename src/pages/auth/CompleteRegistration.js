import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";

const CompleteRegistration = () => {
  const [registrationEmail, setRegistrationEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1 className="text-2xl text-blue-500">Complete Registration</h1>
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
      </div>
    </div>
  );
};

export default CompleteRegistration;
