import axios from "axios";

export const getSubCategories = async () => {
  return await axios.get(`${process.env.REACT_APP_API_URL}/subcategories`);
};

export const getSubCategory = async (slug) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/subcategory/${slug}`
  );
};

export const removeSubCategory = async (slug, authtoken) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_URL}/subcategory/${slug}`,

    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updateSubCategory = async (slug, subcategory, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API_URL}/subcategory/${slug}`,
    subcategory,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createSubCategory = async (subcategory, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/subcategory`,
    subcategory,
    {
      headers: {
        authtoken,
      },
    }
  );
};
