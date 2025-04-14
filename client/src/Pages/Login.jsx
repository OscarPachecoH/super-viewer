import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { loginRequest } from "../Services/authService";
import Spinner from "../Components/SpinnerLoading";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <Spinner />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Iniciando login");
    setIsLoading(true);
    try {
      const res = await loginRequest(email, password);
      if (res.ok) {
        login({ user: res.user, token: res.token });
        console.log("Esperando retraso");
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Spinner visible por 2000ms
        console.log("Finalizando login");
        setIsLoading(false);
        navigate("/dashboard"); // Navegar después de desactivar el spinner
      } else {
        alert(res.message);
        setIsLoading(false); // Desactivar spinner si hay error
      }
    } catch (error) {
      console.log("Error al iniciar sesión");
      alert("Error al iniciar sesión");
      setIsLoading(false); // Desactivar spinner en caso de error
    }
  };

  return (
    <>
      {isLoading && <Spinner />}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
        <button className="btn btn-success" type="submit" disabled={isLoading}>
          Ingresar
        </button>
      </form>
    </>
  );
};

export default Login;