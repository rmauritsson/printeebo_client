import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <h1 className="text-2xl text-blue-500">Login Page</h1>
      <Link to="/" className="p-2">
        Back
      </Link>
    </div>
  );
};
export default Login;
