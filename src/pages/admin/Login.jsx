import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "@/components/Input";
import { UserIcon } from "@heroicons/react/24/outline";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import authService from "@/service/authService";
import useAuthStore from "@/store/authStore";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await authService.login(username, password);
      setToken(token);
      setUser(user);
      navigate("/admin");
    } catch (error) {
      alert('Login failed');
      console.error(error);
    }
  };
  return (
    <>
      <div className="bg-flor-2">
        <div className="grid grid-cols-2  min-h-screen">
          <div>
            <form className="max-w-md mx-auto  flex flex-col justify-center items-center h-full">
              <h2 className="text-5xl mb-4">Iniciar sesión</h2>
              <Input
                id="username"
                value={username}
                label="Username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                icon={UserIcon}
              />
              <Input
                type="password"
                label="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={LockClosedIcon}
              />
              <button onClick={handleLogin} className="bg-flor rounded-4xl text-white px-4 py-2 w-full">
                Ingresar
              </button>
            </form>
          </div>
          <div className="relative flex justify-center items-center">
            <div className="absolute bottom-0 top-0 bg-flor rounded-t-[300px] w-[22vw]"></div>
            <img
              src="/admin.png"
              alt=""
              className="w-full max-w-[500px] object-contain mx-auto relative z-10"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
