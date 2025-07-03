import httpClient from '../api/httpClient';

const getAllProducts = async () => {
  const res = await httpClient.get('/api/products');
  return res.data;
};

const getCategoryProducts = async (categoryId) => {
  const res = await httpClient.get(`/api/products/category/${categoryId}`);
  return res.data;
};

const getAllCategories = async () => {
  const res = await httpClient.get('/api/category');
  return res.data;
};

const getProductById = async (id) => {
  const res = await httpClient.get(`/api/products/${id}`);
  return res.data;
};

const productService = {
  getAllProducts,
  getCategoryProducts,
  getAllCategories,
  getProductById
};

export default productService;
