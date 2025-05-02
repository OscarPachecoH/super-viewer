import { changePassword } from "../Services/authService";
import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";

const Profile = () => {
    const [formData, setFormData] = useState({
        password: '',
        newPassword: '',
        confirmPassword: ''
    }); // Variables de estado
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { user } = useAuth();

    // Timer para "desvanecer" mensajes (error, success) de la pantalla
    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                setError(null);
                setSuccess(null);
            }, 3000)
            return () => clearTimeout(timer);
        }
    }, [error, success])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const validateForm = () => {
        if (!formData.password || !formData.newPassword || !formData.confirmPassword) {
            return 'Todos los campos son obligatorios';
        }
        if (formData.newPassword.length < 8) {
            return 'La contraseña debe de ser de almenos 8 caracteres'
        }
        if (formData.newPassword !== formData.confirmPassword) {
            return 'Las contraseñas no son iguiales'
        }
        return null;
    }

    // Función de cambio de contraseña
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene que la pantalla recarge.
        setError(null);
        setSuccess(null)

        const validationError = validateForm(); //Valida el formulario.
        
        //Si hay un error se almacena en la variable de error
        if (validationError) {
            setError(validationError);
            return;
        }

        //Verificador de seccion activa
        if (!user?.id) {
            setError('No hay usuario autentificado')
            return;
        }

        const response = await changePassword(user.id, formData.password, formData.newPassword); //Usa el servicio para cmabio de contraseña

        //Si el procesos se realiza bien muestra mensaje de satisfacción.
        if (response.ok) {
            setSuccess(response.message);
            setFormData({ password: '', newPassword: '', confirmPassword: '' }); //"Blanquea" los campos del formulario
        } else { //De lo contrario se muestra mensaje de error
            setError(response.message)
        }
    }

    return (
        <>
            <Navbar />
            <div className="p-4 mx-auto my-4" style={{ maxWidth: '400px' }}>
                <h2 className="title text-center mb-4">Cambiar Contraseña</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <form onSubmit={handleSubmit} className="form-box-profile">
                    <div className="mb-3">
                        <label htmlFor="currentPassword" className="form-label title">
                            Contraseña Actual
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label title">
                            Nueva Contraseña
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="newPassword"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label title">
                            Confirmar Nueva Contraseña
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-succes">
                        Cambiar Contraseña
                    </button>
                </form>
            </div>
        </>
    );
}

export default Profile;