import { useState } from "react";
import { toast } from "react-toastify";
import Header from "../../components/navigation/Header";
import UserNav from "../../components/navigation/UserNav";
import { auth } from "../../firebase";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(true);
        toast.success("Passowrd successfully update");
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        toast.error(err.message);
      });
  };

  return (
    <>
      <Header />
      <div className="container mx-auto flex flex-row mt-4 ">
        <div className="basis-1/5">
          <UserNav />
        </div>
        <div className="basis-4/5">
          <h3>Update Password</h3>
          <div className="mt-[2rem]">
            <form onSubmit={handleSubmit}>
              <input
                className="border p-2 mb-4"
                type="password"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new Password"
                disabled={loading}
              />
              <br />
              <button
                type="submit"
                disabled={!password || loading}
                className="btn-primary btn-active"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
