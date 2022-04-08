import AdminNav from "../../../components/navigation/AdminNav";
import Header from "../../../components/navigation/Header";
import { toast } from "react-toastify";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import LocalSearch from "../../../components/forms/LocalSearch";
import DefaultLayout from "../../../components/layouts/DefaultLayout";
import { IoTrashOutline } from "react-icons/io5";

const CreateCategory = () => {
  const [name, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((category) => setCategories(category.data));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false);
        setCategoryName("");
        toast.success(`${res.data.name} has been created`);
        loadCategories();
      })
      .catch((err) => {
        console.log("Error in creating category", err);
        if (err.response.status === 400) toast.error(err.response.data);
        setLoading(false);
        console.log(err.message);
      });
  };

  const handleDeleteCategory = async (slug) => {
    //beautify confirm
    if (window.confirm("Are you sure you want to delete")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.success(`${res.data.name} has been deleted`);
          loadCategories();
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          setLoading(false);
        });
    }
  };

  const searchFilter = (searchKeyword) => (category) =>
    category.name.toLowerCase().includes(searchKeyword);

  return (
    <DefaultLayout>
      <div className="flex flex-row mt-4 ">
        <div className="basis-1/5">
          <AdminNav />
        </div>
        <div className={styles.contentWrapper}>
          <div className="flex justify-between items-center mb-4">
            <h5 className={styles.title}>All Categories</h5>
            <LocalSearch
              keyword={searchKeyword}
              setKeyword={setSearchKeyword}
              placeholder="Search Category"
            />
          </div>

          <div>
            <form onSubmit={handleSubmit} className="flex justify-between mb-4">
              <input
                className="inputField"
                type="text"
                autoFocus
                value={name}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter Category Name"
                required
              />
              <button type="submit" className="btn-dashboard">
                Create Category
              </button>
            </form>
          </div>

          <div className="flow-root">
            <ul role="list" className={styles.unorderedList}>
              {categories.filter(searchFilter(searchKeyword)).map((cat) => (
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
                        {cat.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {/**cat.description */}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteCategory(cat.slug)}
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

export default CreateCategory;
