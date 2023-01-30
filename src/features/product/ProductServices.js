import axios from "axios";


// create New Product

const createProduct = async (formData) => {
  const response = await axios.post(
    "http://localhost:4500/api/products/",
    formData
  );
  return response.data;
};

const getProducts = async () => {
  const response = await axios.get("http://localhost:4500/api/products/");
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(
    "http://localhost:4500/api/products/" + id
  );
  return response.data;
};

const getProduct = async (id) => {
  const response = await axios.get("http://localhost:4500/api/products/" + id);
  return response.data;
};

const updateProduct = async (id, formData) => {
  const response = await axios.patch(
    "http://localhost:4500/api/products/" + id,
    formData
  );
  return response.data;
};

export const productService = {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
  getProducts,
};
