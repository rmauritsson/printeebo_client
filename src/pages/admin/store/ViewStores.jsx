import { toast } from "react-toastify";
import { IoTrashOutline } from "react-icons/io5";
import AdminNav from "../../../components/navigation/AdminNav";
import { createStore, getStores, removeStore } from "../../../functions/store";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import LocalSearch from "../../../components/forms/LocalSearch";
import DefaultLayout from "../../../components/layouts/DefaultLayout";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ViewStores = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [stores, setStores] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = () => getStores().then((store) => setStores(store.data));

  const handleDeleteStore = async (slug) => {
    //beautify confirm
    if (window.confirm("Are you sure you want to delete")) {
      setLoading(true);
      removeStore(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.success(`${res.data.name} has been deleted`);
          loadStores();
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          setLoading(false);
        });
    }
  };

  const searchFilter = (searchKeyword) => (store) =>
    store.name.toLowerCase().includes(searchKeyword);

  return (
    <DefaultLayout>
      <div className="flex flex-row mt-4 ">
        <div className="basis-1/5">
          <AdminNav />
        </div>
        <div className={styles.contentWrapper}>
          <div className="flex justify-between items-center mb-4">
            <h5 className={styles.title}>All Stores</h5>
            <LocalSearch
              keyword={searchKeyword}
              setKeyword={setSearchKeyword}
              placeholder="Look up a store"
            />
            <button
              type="button"
              onClick={() => history.push("/admin/store")}
              className="text-gray-900 font-semibold bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2"
            >
              Create Store
            </button>
          </div>

          <div className="flow-root">
            <ul role="list" className={styles.unorderedList}>
              {stores.filter(searchFilter(searchKeyword)).map((store) => (
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/image/rDtN98Qoishumwih/abstract-blue-light-background_SvZPryOnfl_thumb.jpg"
                        alt="Neil image"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {store.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {/**store.description */}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteStore(store.slug)}
                      className="inline-flex cursor-pointer items-center text-base font-semibold text-gray-900 dark:text-white"
                    >
                      <IoTrashOutline />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
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

export default ViewStores;
