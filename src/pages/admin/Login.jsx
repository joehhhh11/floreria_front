import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "@/components/Input";
import { UserIcon } from "@heroicons/react/24/outline";
import { LockClosedIcon } from "@heroicons/react/24/outline";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-flor-2">
        <div className="grid grid-cols-2  min-h-screen">
          <div>
            <form className="max-w-md mx-auto  flex flex-col justify-center items-center h-full">
              <h2 className="text-5xl mb-4">Iniciar sesión</h2>
              <Input
                id="username"
                value={email}
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
              <button className="bg-flor rounded-4xl text-white px-4 py-2 w-full">
                Ingresar
              </button>
            </form>
          </div>
          <div className="relative flex justify-center items-center">
            {/* Pilar de fondo */}
            <div className="absolute bottom-0 top-0 bg-flor rounded-t-[300px] w-[22vw]"></div>

            {/* Imagen */}
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
