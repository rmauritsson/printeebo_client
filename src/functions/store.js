import axios from "axios";

export const getStores = async () => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/stores`);
};

export const getStore = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/store/${slug}`);
};

export const removeStore = async (slug, authtoken) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL}/store/${slug}`,

    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updateStore = async (slug, store, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}/store/${slug}`,
    store,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createStore = async (store, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API_URL}/store`, store, {
    headers: {
      authtoken,
    },
  });
};
