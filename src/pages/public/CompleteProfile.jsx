import { useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CompleteProfile = () => {
  const { getToken } = useAuth();
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    dni: "",
    direccion: "",
    telefono: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Formulario enviado");
  
  const token = await getToken({ template: "backend" });
  console.log("Token obtenido:", token);

  try {
    const payload = {
      nombre: user.firstName || "",
      apellidos: user.lastName || "",
      correo: user.primaryEmailAddress?.emailAddress || "",
      username: user.username || user.firstName,
      telefono: formData.telefono,
      dni: formData.dni,
    };

    console.log("Payload a enviar:", payload);

    const response = await axios.post("http://localhost:8080/api/auth/register/clerk", payload);
    console.log("Respuesta del backend:", response.data);

    if (!isLoaded || !user) {
      console.warn("User no está listo:", { isLoaded, user });
      return <div>Cargando...</div>;
    }

    console.log("Intentando actualizar metadatos…");

await user.update({
  unsafeMetadata: {
    profileCompleted: true,
    telefono: formData.telefono,
    dni: formData.dni,
  },
});


    console.log("Metadatos actualizados correctamente");

    await user.reload();
    console.log("Usuario recargado");

    navigate("/");
    alert("Perfil completado correctamente");
  } catch (err) {
    console.error("ERROR EN SUBMIT:", err?.response?.data || err.message || err);
    alert("Error al guardar los datos");
  }
};

  if (!isLoaded || !user) return <div>Cargando...</div>;

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto" }}>
      <h2>Bienvenido, {user.firstName}!</h2>
      <p>Completa tu perfil para continuar:</p>

      <form onSubmit={handleSubmit}>
        <label>DNI:</label>
        <input type="text" name="dni" value={formData.dni} onChange={handleChange} required />
        <br />

        <label>Dirección:</label>
        <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} required />
        <br />

        <label>Teléfono:</label>
        <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} required />
        <br /><br />

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default CompleteProfile;
