import axios from 'axios';

const urlAPI = process.env.REACT_APP_URL

export const loginRequest = async (email, password) => {
    try{
        if(email !== "" & password !== ""){
            const res = await axios.post(urlAPI + 'login',{
                email,
                password
            });
    
            return { ok: true, user: res.data.user, token: res.data.token };
        } else {
            const message = 'Ambos campos son obligatorios';
            return { ok: false, message}
        }
    } catch (error){
        const message = error.response?.data?.message || 'Error de red';
        return { ok: false, message}
    }
}
