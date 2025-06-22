import httpClient from '../api/httpClient';

const login = async (username, password) => {
  const res = await httpClient.post('/api/auth/login', { username, password });
  return res.data;
};

const logout = async () => {
  await httpClient.post('/api/auth/logout');
};

export default { login, logout };
