import { Link } from "react-router-dom";

const NotFound = () => (
    <div className="text-center mt-10">
        <h1 className="title font-bold">404 - Página no encontrada</h1>
        <p className="subtitle mt-4">Parece que estas perdido. La ruta que ingresaste no existe.</p>
        <Link to={'/projects'}>Regresar al sistema</Link>
    </div>
);

export default NotFound;