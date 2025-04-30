import axios from 'axios';

const urlAPI = process.env.REACT_APP_URL

// Servicio para inicio de sesion
export const loginRequest = async (email, password) => {
    try {
        if (email !== "" & password !== "") { //Verifica que las variables no esten vacias
            //Resliaza la petición
            const res = await axios.post(urlAPI + 'login', {
                email,
                password
            });
            //Retorna la respuesta
            return { ok: true, user: res.data.user, token: res.data.token };
        } else {
            const message = 'Ambos campos son obligatorios';
            return { ok: false, message }
        }
    } catch (error) {
        const message = error.response?.data?.message || 'Error de red';
        return { ok: false, message }
    }
}

// Servicio para cambio de contrseña
export const changePassword = async (userId, password, newPassword) => {
    try {
        if (userId !== "" && password !== "" && newPassword !== "") { //Verifica que las variables no esten vacias
            //Resliaza la petición
            const response = await axios.patch(`${urlAPI}passwordchange/${userId}`, { password, newPassword });
            return { ok: true, message: response.data.message || 'Contraseña cambiada exitosamente' };
        } else {
            const message = 'Campos vacios'
            return { ok: false, message }
        }
    } catch (error) {
        const message = error.response?.data?.message || 'Error al cambiar la contraseña';
        return { ok: false, message };
    }
}