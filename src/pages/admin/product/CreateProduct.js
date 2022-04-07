import AdminNav from "../../../components/navigation/AdminNav";
import Header from "../../../components/navigation/Header";
import { toast } from "react-toastify";
import {
  createProduct,
  getProducts,
  getProduct,
} from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import { getStores } from "../../../functions/store";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import LocalSearch from "../../../components/forms/LocalSearch";
import ListboxLayout from "../../../components/partials/Listbox";

const initialValues = {
  title: "",
  description: "",
  price: "",
  category: "",
  subcategories: [],
  store: "",
  //quantity: "",
  //images: [],
  shipping: "",
  colors: [
    "Black",
    "Red",
    "Navy Blue",
    "Army Green",
    "White",
    "Gray",
    "Yellow",
  ],
  styles: [
    "Short Sleeved V-Neck",
    "Long Sleeved V-Neck",
    "Polo",
    "Short Sleeved",
    "Long Sleeved",
  ],
  expectedDeliveryDate: "",
  sizes: [],
};

const CreateProduct = () => {
  const [values, setValues] = useState(initialValues);
  const {
    title,
    description,
    price,
    category,
    subcategories,
    store,
    quantity,
    sold,
    images,
    shipping,
    colors,
    styles,
    expectedDeliveryDate,
    sizes,
  } = values;

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [stores, setStores] = useState([]);
  const [sizeChart, setSizeChart] = useState("Adult", "Child");
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
    loadStores();
    console.log("Categories", categories);
  }, []);

  const loadCategories = () =>
    getCategories().then((category) => setCategories(category.data));

  const loadStores = () => getStores().then((store) => setStores(store.data));

  const handleChange = (e) => {
    //setValues(e.target.value);
    const { name, value } = e.target;
    console.log("Select", values);
    setValues((inputs) => ({ ...inputs, [name]: value }));
    //setValues({ ...values, [name]: value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();

    console.log("Clicked Cat", e.target.value);
    setValues((inputs) => ({ ...inputs, category: e.target.value }));
    getCategorySubs(e.target.value)
      .then((res) => {
        console.log("Sub Options", res);
        setSubOptions(res.data);
      })
      .catch((err) => {
        //if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.message);
        setLoading(false);
      });
  };

  const handleMultipleSelect = (e) => {
    if (e.target.checked) {
      const selectedSize = values.sizes.push(e.target.value);
      //setValues({ ...values, sizes: selectedSize });
      //setValues({...values, sizes: []})
      console.log("Options", values.sizes);
    } else {
      const size = values.sizes.indexOf(e.target.value);
      values.sizes.splice(size, 1);
      console.log("Options", values.sizes);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);

    createProduct(values, user.token)
      .then((res) => {
        setLoading(false);
        console.log("product res", res);
        toast.success(`${res.data.title} has been created`);
        //loadCategories();
        setInterval(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((err) => {
        //if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
        setLoading(false);
      });
  };

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
            {loading ? <h4>Loading .......... </h4> : <h4>Create Product</h4>}
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  className="border p-2 mt-2 "
                  type="text"
                  autoFocus
                  name="title"
                  value={title}
                  onChange={handleChange}
                  placeholder="Product Title"
                  required
                />
                <input
                  className="border p-2 mt-2 "
                  type="text"
                  autoFocus
                  name="description"
                  value={description}
                  onChange={handleChange}
                  placeholder="Product Description"
                  required
                />
                <input
                  className="border p-2 mt-2 "
                  type="number"
                  autoFocus
                  name="price"
                  value={price}
                  onChange={handleChange}
                  placeholder="Product Price"
                  required
                />

                <input
                  className="border p-2 mt-2 "
                  type="number"
                  autoFocus
                  name="expectedDeliveryDate"
                  value={expectedDeliveryDate}
                  onChange={handleChange}
                  placeholder="Expected Date of Delivery"
                  required
                />
                <div className="p-2 mt-2 ">
                  <label>Category</label>
                  <select name="category" onChange={handleCategoryChange}>
                    <option>Select Category</option>
                    {categories.length > 0 &&
                      categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                  </select>
                </div>
                {subOptions.length > 0 && (
                  <div className="p-2 mt-2 ">
                    <label>Sub Categories</label>
                    <select name="store" onChange={handleChange}>
                      <option>Select Subs</option>

                      {subOptions.map((sub) => (
                        <option key={sub._id} value={sub._id}>
                          {sub.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="p-2 mt-2 ">
                  <label>Store</label>
                  <select name="store" onChange={handleChange}>
                    <option>Select Store</option>

                    {stores.map((store) => (
                      <option key={store._id} value={store._id}>
                        {store.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-2 mt-2 ">
                  <label>shipping</label>
                  <select name="shipping" onChange={handleChange}>
                    <option>Select Shipping</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="p-2 mt-2 ">
                  <label>Size</label>
                  <div>
                    <div>
                      <input
                        type="checkbox"
                        name="size"
                        value="L"
                        onChange={handleMultipleSelect}
                      />
                      <label>Large</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        name="size"
                        value="S"
                        onChange={handleMultipleSelect}
                      />
                      <label>Small</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        name="size"
                        value="M"
                        onChange={handleMultipleSelect}
                      />
                      <label>Medium</label>
                    </div>
                  </div>
                </div>
              </div>
              <button type="submit" className="mt-2 btn-primary btn-active">
                Create Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
