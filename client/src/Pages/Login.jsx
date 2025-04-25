import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { loginRequest } from "../Services/authService";
import Spinner from "../Components/SpinnerLoading";
import { FaRegEnvelope, FaLock } from "react-icons/fa6";
import Logo from "../Images/ingenieria.png";
import "../Styles/Login.css";

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
        navigate("/projects"); // Navegar después de desactivar el spinner
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
      <div className="body">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-5 col-md-6 form-container">
              <div className="col-lg-8 col-sm-9 col-xs-12 form-box text-center">
                <div className="logo mt-5 mb-3">
                  <img
                    src={Logo}
                    width={"250px"}
                    alt="https://www.flaticon.es/iconos-gratis/ingenieria"
                  />
                </div>
                <div className="heading mb-3">
                  <h4>Inicio de sesión</h4>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-input">
                    <span>
                      <FaRegEnvelope />
                    </span>
                    <input
                      type="email"
                      placeholder="Correo"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="form-input">
                    <span>
                      <FaLock />
                    </span>
                    <input
                      type="password"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  <button
                    className="btn btn-success"
                    type="submit"
                    disabled={isLoading}
                  >
                    Ingresar
                  </button>
                </form>
              </div>
            </div>
            <div className="col-lg-7 col-md-6 d-none d-md-block image-container"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
