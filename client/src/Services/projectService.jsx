import axios from "axios";

const urlAPI = process.env.REACT_APP_URL;

const getProjectsByOwner = async (ownerId) => {
    try {
        const res = await axios.get(urlAPI + 'projects/' + ownerId);
        return { ok: true, data: res.data };
    } catch (error) {
        const message = error.response?.data?.message || 'Error de red';
        return { ok: false, message}
    }
}

const getProjectById = async (ownerId, projectId) => {
    try {
        console.log(urlAPI + 'project/data/' + projectId);
        const res = await axios.get(urlAPI + 'project/' + ownerId + '/' + projectId);
        
        return { ok: true, data: res.data };
    } catch (error) {
        const message = error.response?.data?.message || 'Error de red';
        return { ok: false, message}
    }
}

export default {
    getProjectsByOwner,
    getProjectById
}