import AdminNav from "../../../components/navigation/AdminNav";
import Header from "../../../components/navigation/Header";
import { toast } from "react-toastify";
import { createStore, getStores, removeStore } from "../../../functions/store";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import LocalSearch from "../../../components/forms/LocalSearch";
import DefaultLayout from "../../../components/layouts/DefaultLayout";
import { IoTrashOutline } from "react-icons/io5";

const AdminCreateStore = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [owner] = useState(user._id);
  const [name, setStoreName] = useState("");
  const [description, setStoreDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [stores, setStores] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = () => getStores().then((store) => setStores(store.data));

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    createStore({ name, owner, description }, user.token)
      .then((res) => {
        setLoading(false);
        setStoreName("");
        toast.success(`${res.data.name} has been created`);
        loadStores();
      })
      .catch((err) => {
        console.log("Error in creating Store", err);
        if (err.response.status === 400) toast.error(err.response.data);
        setLoading(false);
        console.log(err.message);
      });
  };

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
            <h5 className={styles.title}>Add Store</h5>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col">
            <div>
              <div className="flex flex-col">
                <label
                  for="title"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Store Name
                </label>
                <input
                  className="inputField mb-4"
                  type="text"
                  autoFocus
                  name="title"
                  id="title"
                  value={name}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="Store Name"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label
                  for="description"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Store Description
                </label>
                <textarea
                  cols="30"
                  rows="10"
                  className="inputField mb-4"
                  type="text"
                  autoFocus
                  name="description"
                  id="description"
                  value={description}
                  onChange={(e) => setStoreDescription(e.target.value)}
                  placeholder="Product Description"
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn-dashboard">
              Add Store
            </button>
          </form>
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

export default AdminCreateStore;
