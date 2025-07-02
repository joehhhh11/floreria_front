// userService.js
import axios from "axios";
import useAuthStore from "../store/authStore";

const getAllUsers = async () => {
  const token = useAuthStore.getState().token;

  const client = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  const res = await client.get("/api/users");
  return res.data;
};

export default { getAllUsers };
