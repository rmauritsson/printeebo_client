import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import LocalSearch from "../../../components/forms/LocalSearch";
import DefaultLayout from "../../../components/layouts/DefaultLayout";
import AdminNav from "../../../components/navigation/AdminNav";
import Header from "../../../components/navigation/Header";

const ViewProducts = () => {
  const history = useHistory();
  return (
    <DefaultLayout>
      <div className="flex flex-row mt-4 ">
        <div className="basis-1/5">
          <AdminNav />
        </div>
        <div className={styles.contentWrapper}>
          <div className="flex justify-between items-center mb-4">
            <h5 className={styles.title}>View all Products</h5>

            <button
              type="button"
              onClick={() => history.push("/admin/product")}
              className="text-gray-900 font-semibold bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2"
            >
              Add Product
            </button>
          </div>

          <div className="flow-root"></div>
        </div>
      </div>
    </DefaultLayout>
  );
};

const styles = {
  contentWrapper:
    "basis-4/5 p-4 w-full bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700",
  title: "text-xl font-bold leading-none text-gray-900 dark:text-white",
  unorderedList: "divide-y divide-gray-200 dark:divide-gray-700",
};

export default ViewProducts;
