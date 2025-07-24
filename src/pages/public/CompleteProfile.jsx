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

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register/clerk`, payload);
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

  if (!isLoaded || !user) return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F8F3EC 0%, #DBCCBA 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        padding: '2rem',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        Cargando...
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '24px',
        padding: '2.5rem',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#DBCCBA',
            borderRadius: '50%',
            margin: '0 auto 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            color: '#8B7355',
            fontWeight: 'bold'
          }}>
            {user.firstName?.charAt(0).toUpperCase()}
          </div>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: '600',
            color: '#2c2c2c',
            margin: '0 0 0.5rem 0',
            letterSpacing: '-0.5px'
          }}>
            ¡Bienvenido, {user.firstName}!
          </h2>
          <p style={{
            color: '#666',
            fontSize: '1rem',
            margin: 0,
            fontWeight: '400'
          }}>
            Completa tu perfil para continuar
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{
              fontSize: '0.9rem',
              fontWeight: '500',
              color: '#4a4a4a',
              marginLeft: '4px'
            }}>
              DNI
            </label>
            <input
              type="text"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              required
              style={{
                padding: '1rem 1.25rem',
                border: '2px solid #e8e8e8',
                borderRadius: '12px',
                fontSize: '1rem',
                backgroundColor: '#fafafa',
                transition: 'all 0.3s ease',
                outline: 'none',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#DBCCBA';
                e.target.style.backgroundColor = '#ffffff';
                e.target.style.boxShadow = '0 0 0 3px rgba(219, 204, 186, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e8e8e8';
                e.target.style.backgroundColor = '#fafafa';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{
              fontSize: '0.9rem',
              fontWeight: '500',
              color: '#4a4a4a',
              marginLeft: '4px'
            }}>
              Dirección
            </label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              required
              style={{
                padding: '1rem 1.25rem',
                border: '2px solid #e8e8e8',
                borderRadius: '12px',
                fontSize: '1rem',
                backgroundColor: '#fafafa',
                transition: 'all 0.3s ease',
                outline: 'none',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#DBCCBA';
                e.target.style.backgroundColor = '#ffffff';
                e.target.style.boxShadow = '0 0 0 3px rgba(219, 204, 186, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e8e8e8';
                e.target.style.backgroundColor = '#fafafa';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{
              fontSize: '0.9rem',
              fontWeight: '500',
              color: '#4a4a4a',
              marginLeft: '4px'
            }}>
              Teléfono
            </label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
              style={{
                padding: '1rem 1.25rem',
                border: '2px solid #e8e8e8',
                borderRadius: '12px',
                fontSize: '1rem',
                backgroundColor: '#fafafa',
                transition: 'all 0.3s ease',
                outline: 'none',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#DBCCBA';
                e.target.style.backgroundColor = '#ffffff';
                e.target.style.boxShadow = '0 0 0 3px rgba(219, 204, 186, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e8e8e8';
                e.target.style.backgroundColor = '#fafafa';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: '1rem 2rem',
              backgroundColor: '#DBCCBA',
              color: '#4a4a4a',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              marginTop: '1rem',
              fontFamily: 'inherit',
              boxShadow: '0 4px 12px rgba(219, 204, 186, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#d1bfa6';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 20px rgba(219, 204, 186, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#DBCCBA';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(219, 204, 186, 0.3)';
            }}
          >
            Completar Perfil
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;