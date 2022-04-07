import axios from "axios";

export const getProducts = async () => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/products`);
};

export const getProduct = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/product/${slug}`);
};

export const createProduct = async (product, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API_URL}/product`, product, {
    headers: {
      authtoken,
    },
  });
};
