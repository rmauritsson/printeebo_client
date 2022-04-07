import AdminNav from "../../../components/navigation/AdminNav";
import Header from "../../../components/navigation/Header";
import { toast } from "react-toastify";
import { createStore, getStores, removeStore } from "../../../functions/store";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import LocalSearch from "../../../components/forms/LocalSearch";

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
    <>
      <Header />
      <div className="container mx-auto px-4">
        <h1 className="text-2xl text-blue-500">Admin Dashboard</h1>
        <div className="flex flex-row mt-4 ">
          <div className="basis-1/5">
            <AdminNav />
          </div>
          <div className="basis-4/5">
            <p>Store owner is {owner}</p>
            {loading ? <h4>Loading .......... </h4> : <h4>Create Store</h4>}
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  className="border p-2 mt-2"
                  type="text"
                  autoFocus
                  value={name}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="Enter Store Name"
                  required
                />
                <input
                  className="border p-2 mt-2"
                  type="text"
                  autoFocus
                  value={description}
                  onChange={(e) => setStoreDescription(e.target.value)}
                  placeholder="Enter Description"
                  required
                />
              </div>

              <button type="submit" className="btn-primary btn-active mt-2">
                Create Store
              </button>
            </form>

            <div className="mt-8">
              <h4>All Stores</h4>
              <LocalSearch
                keyword={searchKeyword}
                setKeyword={setSearchKeyword}
                placeholder="Search Store"
              />

              {stores.filter(searchFilter(searchKeyword)).map((store) => (
                <ul key={store._id}>
                  <li key={store._id}>
                    {store.name}

                    <button
                      className="mx-8 text-sm"
                      onClick={() => handleDeleteStore(store.slug)}
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

export default AdminCreateStore;
