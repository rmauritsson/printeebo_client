import AdminNav from "../../../components/navigation/AdminNav";
import Header from "../../../components/navigation/Header";
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
    <div>
      <Header />
      <h1 className="container mx-auto">Admin Dashboard</h1>
      <div className="container mx-auto flex flex-row mt-4 ">
        <div className="basis-1/5">
          <AdminNav />
        </div>
        <div className="basis-4/5">
          {loading ? (
            <h4>Loading .......... </h4>
          ) : (
            <h4>Create and View Sub Category</h4>
          )}
          <div className="my-4">
            <label>Parent Category</label>
            <select
              name="category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Please select </option>
              {categories.length > 0 &&
                categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              className="border p-2 "
              type="text"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Sub Category Name"
              required
            />
            <button type="submit" className="btn-primary btn-active">
              Create Sub Category
            </button>
          </form>

          <div className="mt-8">
            <h4>All Categories</h4>
            <LocalSearch
              keyword={searchKeyword}
              setKeyword={setSearchKeyword}
              placeholder="Search Sub Category"
            />

            {subcategories.filter(searchFilter(searchKeyword)).map((cat) => (
              <ul key={cat._id}>
                <li key={cat._id}>
                  {cat.name}

                  <button
                    className="mx-8 text-sm"
                    onClick={() => handleDeleteCategory(cat.slug)}
                  >
                    delete
                  </button>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSubCategory;
