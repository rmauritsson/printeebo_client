import AdminNav from "../../../components/navigation/AdminNav";
import { toast } from "react-toastify";
import { getCategories } from "../../../functions/category";
import {
  createSubCategory,
  getSubCategories,
  removeSubCategory,
} from "../../../functions/subcategory";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import LocalSearch from "../../../components/forms/LocalSearch";
import DefaultLayout from "../../../components/layouts/DefaultLayout";
import { IoTrashOutline } from "react-icons/io5";

const CreateSubCategory = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
    loadSubCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((category) => setCategories(category.data));

  const loadSubCategories = () =>
    getSubCategories().then((sub) => setSubCategories(sub.data));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    createSubCategory({ name, parent: category }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} has been created`);
        loadSubCategories();
      })
      .catch((err) => {
        console.log("Error in creating category", err);
        if (err.response.status === 400) toast.error(err.response.data);
        setLoading(false);
        console.log(err.message);
      });

    //createSubCategory.cancel();
  };

  const handleDeleteCategory = async (slug) => {
    //beautify confirm
    if (window.confirm("Are you sure you want to delete")) {
      setLoading(true);
      removeSubCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.success(`${res.data.name} has been deleted`);
          loadSubCategories();
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
            <h5 className={styles.title}>Sub Categories</h5>
            <LocalSearch
              keyword={searchKeyword}
              setKeyword={setSearchKeyword}
              placeholder="Search Sub Category"
            />
          </div>

          <div>
            <div className="">
              <label
                for="category"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Select Parent Category
              </label>
            </div>

            <form onSubmit={handleSubmit} className="flex justify-between mb-4">
              <div>
                <select
                  id="category"
                  name="category"
                  onChange={(e) => setCategory(e.target.value)}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  {categories.length > 0 &&
                    categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                </select>
              </div>
              <input
                className="inputField"
                type="text"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Sub Category Name"
                required
              />
              <button type="submit" className="btn-dashboard">
                Create Sub Category
              </button>
            </form>
          </div>

          <div className="flow-root">
            <ul role="list" className={styles.unorderedList}>
              {subcategories.filter(searchFilter(searchKeyword)).map((cat) => (
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

export default CreateSubCategory;
