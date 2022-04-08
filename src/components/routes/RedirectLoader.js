import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";

const RedirectLoader = () => {
  const history = useHistory();

  const [count, setCount] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && history.push("/");

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <DefaultLayout>
      <div className="flex items-center justify-center">
        <p>Unauthorized access, Redirecting you in {count} seconds</p>
      </div>
    </DefaultLayout>
  );
};
export default RedirectLoader;
