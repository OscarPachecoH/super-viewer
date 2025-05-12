import axios from "axios";

const urlAPI = process.env.REACT_APP_URL;

const getProgressFlootByProject = async (idProject) => {
    try {
        const res = await axios.get(urlAPI + 'getProgressFloor/' + idProject);
        return { ok: true, data: res.data }
    } catch (error) {
        const message = error.response?.data?.message || 'Error de red';
        return { ok: false, message}
    }
}

export default {
    getProgressFlootByProject
}