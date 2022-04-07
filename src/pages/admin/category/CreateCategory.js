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
    <>
      <Header />

      <div className="container mx-auto px-4">
        <h1 className="text-2xl text-blue-500">Admin Dashboard</h1>
        <div className="flex flex-row mt-4 ">
          <div className="basis-1/5">
            <AdminNav />
          </div>
          <div className="basis-4/5">
            {loading ? <h4>Loading .......... </h4> : <h4>Create Category</h4>}
            <form onSubmit={handleSubmit}>
              <input
                className="border p-2 "
                type="text"
                autoFocus
                value={name}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter Category Name"
                required
              />
              <button type="submit" className="btn-primary btn-active">
                Create Category
              </button>
            </form>

            <div className="mt-8">
              <h4>All Categories</h4>
              <LocalSearch
                keyword={searchKeyword}
                setKeyword={setSearchKeyword}
                placeholder="Search Category"
              />

              {categories.filter(searchFilter(searchKeyword)).map((cat) => (
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
    </>
  );
};

export default CreateCategory;
