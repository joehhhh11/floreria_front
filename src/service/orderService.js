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
const updateOrder = async (id, data) => {
  const res = await httpClient.put(`/api/orders/${id}`, data);
  return res.data;
};

const getOrdersByCustomer = async () => {
  const res = await httpClient.get(`/api/orders/me`);
  return res.data;
};
const updateOrderStatus = async (id, estado) => {
  const res = await httpClient.put(`/api/orders/${id}/estado?estado=${estado}`);
  return res.data;
};

const orderService = {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
  getOrdersByCustomer,
  updateOrderStatus
};
export default orderService;