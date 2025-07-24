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

const getCupones = async () => {
  const res = await httpClient.get('/api/cupones');
  return res.data;
};

const importProducts = async (data) => {
  const res = await httpClient.post('/api/products/import', data);
  return res.data;
};

const postReview = async (data) => {
  const res = await httpClient.post('/api/reviews', data);
  return res.data;
};

const productService = {
  getAllProducts,
  getCategoryProducts,
  getAllCategories,
  getProductById,
  getCupones,
  importProducts,
  postReview,
};

export default productService;
