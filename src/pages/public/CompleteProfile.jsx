import { useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";

const CompleteProfile = () => {
  const { getToken } = useAuth();
  const { user } = useUser();

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
    const token = await getToken({ template: "backend" }); 

    try {
      await axios.post("http://localhost:8080/api/usuarios", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

    await user.update({
      publicMetadata: {
        profileCompleted: true
      }
    });
      alert("Perfil completado correctamente");
    } catch (err) {
      console.error(err);
      alert("Error al guardar los datos");
    }
  };

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
