import httpClient from '../api/httpClient';


const getCupones = async () => {
  const res = await httpClient.get('/api/cupones');
  return res.data;
};
const deleteCupon = async (cupon) => {
  const res = await httpClient.delete(`/api/cupones?codigo=${cupon}`);
  return res.data;
};
const createCupon = async (data) => {
  const res = await httpClient.post('/api/cupones', data);
  return res.data;
};

const updateCupon = async (codigo, data) => {
  const res = await httpClient.put(`/api/cupones/estado?codigo=${codigo}&activo=${data.active}`);
  return res.data;
};
const getCuponByCodigo = async (codigo) => {
  const res = await httpClient.get(`/api/cupones?codigo=${codigo}`);
  return res.data;
};


const productService = {
  deleteCupon,
  createCupon,
  getCupones,
  updateCupon,
  getCuponByCodigo
};

export default productService;
