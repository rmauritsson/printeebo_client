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
import { Link } from "react-router-dom";

const CreateCategory = () => {
  const [name, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, [categories]);

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
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          setLoading(false);
        });
    }
  };

  return (
    <div>
      <Header />
      <h1 className="container mx-auto">Admin Dashboard</h1>
      <div className="container mx-auto flex flex-row mt-4 ">
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
            {categories.map((cat) => (
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

export default CreateCategory;
