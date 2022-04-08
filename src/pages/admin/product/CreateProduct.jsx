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
import DefaultLayout from "../../../components/layouts/DefaultLayout";

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
    <DefaultLayout>
      <div className="flex flex-row mt-4 ">
        <div className="basis-1/5">
          <AdminNav />
        </div>
        <div className={style.contentWrapper}>
          <div className="flex justify-between items-center mb-4">
            <h5 className={style.title}>Add Product</h5>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="flex flex-col">
                <label
                  for="title"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Product Title
                </label>
                <input
                  className="inputField mb-4"
                  type="text"
                  autoFocus
                  name="title"
                  id="title"
                  value={title}
                  onChange={handleChange}
                  placeholder="Product Title"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label
                  for="description"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Product Description
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
                  onChange={handleChange}
                  placeholder="Product Description"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label
                  for="price"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Product Price
                </label>
                <input
                  className="inputField mb-4 "
                  type="number"
                  autoFocus
                  name="price"
                  id="price"
                  value={price}
                  onChange={handleChange}
                  placeholder="Product Price"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label
                  for="expectedDeliveryDate"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Number of days it takes to deliver
                </label>
                <input
                  className="inputField mb-4 "
                  type="number"
                  autoFocus
                  name="expectedDeliveryDate"
                  id="expectedDeliveryDate"
                  value={expectedDeliveryDate}
                  onChange={handleChange}
                  placeholder="Expected Date of Delivery"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  for="store"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Product Store
                </label>
                <select
                  id="store"
                  name="store"
                  onChange={handleChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>Select Store</option>
                  {stores.map((store) => (
                    <option key={store._id} value={store._id}>
                      {store.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  for="category"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Product Category
                </label>
                <select
                  id="category"
                  name="category"
                  onChange={handleCategoryChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
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
                <div className="mb-4">
                  <label
                    for="sub"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                  >
                    Product Sub Category
                  </label>
                  <select
                    id="sub"
                    name="subcategory"
                    onChange={handleChange}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option>Select Sub Category</option>
                    {subOptions.map((sub) => (
                      <option key={sub._id} value={sub._id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mb-4">
                <label
                  for="category"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Shipping Options
                </label>
                <select
                  id="shipping"
                  name="shipping"
                  onChange={handleChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>Select Shipping</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  for="category"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Product Size Options
                </label>
                <div>
                  <div>
                    <input
                      className="checkboxField"
                      type="checkbox"
                      name="size"
                      value="L"
                      id="large"
                      onChange={handleMultipleSelect}
                    />
                    <label
                      for="large"
                      className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >
                      Large
                    </label>
                  </div>
                  <div>
                    <input
                      className="checkboxField"
                      type="checkbox"
                      name="size"
                      value="S"
                      id="small"
                      onChange={handleMultipleSelect}
                    />
                    <label
                      for="small"
                      className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >
                      Small
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      name="size"
                      value="M"
                      id="medium"
                      className="checkboxField"
                      onChange={handleMultipleSelect}
                    />
                    <label
                      for="medium"
                      className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >
                      Medium
                    </label>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-dashboard">
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

const style = {
  contentWrapper:
    "basis-4/5 p-4 w-full bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700",
  title: "text-xl font-bold leading-none text-gray-900 dark:text-white",
  unorderedList: "divide-y divide-gray-200 dark:divide-gray-700",
};

export default CreateProduct;
