import httpClient from "../api/httpClient";

const createPaymentSession = async (orderId) => {
  const res = await httpClient.post(`/api/pay-order/${orderId}`);
  return res.data;
};

const paymentService = {
  createPaymentSession,
};

export default paymentService;
