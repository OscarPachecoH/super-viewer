import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaRightFromBracket, FaHouse, FaClipboardList, FaClipboard, FaUser } from "react-icons/fa6";
import { TfiMoney } from "react-icons/tfi";
import Spinner from "../Components/SpinnerLoading";
import '../Styles/Navbar.css'

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { projectId } = useParams();
  const location = useLocation();

  const handleLogout = async () => {

    setIsLoading(true);
    
    try {
      logout();
      
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Spinner visible por 2000ms
      
      setIsLoading(false);
      navigate("/login"); // Navegar después de desactivar el spinner
    } catch (error) {
      console.log("Error al cerrar sesión");
      setIsLoading(false);
      navigate("/login"); // Navegar incluso si hay error
    }
  };

  const isProjectRoute = location.pathname.startsWith('/dashboard');

  return (
    <>
      {isLoading && <Spinner />}
      <div>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <Link className="navbar-brand" to={"/projects"}><h5><span><FaHouse /> Home</span></h5></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {user.name} {user.surnamePaternal} {user.surnameMaternal}
                  </a>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to={'/profile'}><FaUser /> Profile</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item" onClick={handleLogout}><span><FaRightFromBracket /> Log out</span></Link></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;