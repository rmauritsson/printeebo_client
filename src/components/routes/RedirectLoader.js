import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const RedirectLoader = () => {
  const history = useHistory();

  const [count, setCount] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && history.push("/");

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div>
      <p>Unauthorized acess, Redirecting you in {count} seconds</p>
    </div>
  );
};
export default RedirectLoader;
