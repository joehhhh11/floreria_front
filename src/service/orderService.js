import httpClient from '../api/httpClient';

const createOrder = async (data) => {
  const res = await httpClient.post('/api/orders', data);
  return res.data;
};

const getOrderById = async (id) => {
  const res = await httpClient.get(`/api/orders/${id}`);
  return res.data;
};

const getAllOrders = async () => {
  const res = await httpClient.get('/api/orders');
  return res.data;
};

const orderService = {
  createOrder,
  getOrderById,
  getAllOrders
};
export default orderService;