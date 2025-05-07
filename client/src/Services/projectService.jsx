import axios from "axios";

const urlAPI = process.env.REACT_APP_URL;

console.log('Esta dentro del servicio de projectService');

// Obtener proyectos de un cliente
const getProjectsByOwner = async (ownerId) => {
    console.log('Ejecutando función de getProjectsByOwner');
    try {
        const res = await axios.get(urlAPI + 'projects/' + ownerId);
        console.log('Ejecucion correcta: getProjectsByOwner');
        return { ok: true, data: res.data };
    } catch (error) {
        const message = error.response?.data?.message || 'Error de red';
        return { ok: false, message}
    }
}

// Obtener datos de un proyecto seleccionado
const getProjectById = async (ownerId, projectId) => {
    console.log('Ejecuntando funcion de getProjectById');
    try {
        const res = await axios.get(urlAPI + 'project/' + ownerId + '/' + projectId);
        console.log('Ejecucion correcta: getProjectById');
        return { ok: true, data: res.data };
    } catch (error) {
        const message = error.response?.data?.message || 'Error de red';
        return { ok: false, message}
    }
}

// Obtener Gastos Materiales de un proyecto
const getProjectExpenMaterials = async (projectId) => {
    console.log('Ejecutando funcion de getProjectExpenMaterials');
    try {
        const res = await axios.get(urlAPI + 'getMaterials/' + projectId);
        console.log('Ejecucion correcta: getProjectExpenMaterials');
        return { ok: true, data: res.data}
    } catch (error) {
        const message = error.response?.data?.message || 'Error de red';
        return { ok: false, message}
    }
}

// Obtener Gastos Maquinaria de un proyecto
const getProjectExpenMachines = async (projectId) => {
    console.log('Ejecutando funcion de getProjectExpenMachines');
    try {
        const res = await axios.get(urlAPI + 'getMachines/' + projectId);
        console.log('Ejecucion correcta: getProjectExpenMaterials');
        return { ok: true, data: res.data}
    } catch (error) {
        const message = error.response?.data?.message || 'Error de red';
        return { ok: false, message}
    }
}

// Obtener Gastos Tramites de un proyecto
const getProjectExpenTramits = async (projectId) => {
    console.log('Ejecutando funcion de getProjectExpenTramits');
    try {
        const res = await axios.get(urlAPI + 'getTramits/' + projectId);
        console.log('Ejecucion correcta: getProjectExpenMaterials');
        return { ok: true, data: res.data}
    } catch (error) {
        const message = error.response?.data?.message || 'Error de red';
        return { ok: false, message}
    }
}

export default {
    getProjectsByOwner,
    getProjectById,
    getProjectExpenMaterials,
    getProjectExpenMachines,
    getProjectExpenTramits
}