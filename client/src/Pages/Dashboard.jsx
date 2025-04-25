import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Spinner from "../Components/SpinnerLoading";
import projectService from "../Services/projectService";
import { useAuth } from "../Context/AuthContext";
import { useParams } from "react-router-dom";

const Dashboard = () => {
    const [project, setProject] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const { projectId } = useParams();

    useEffect(() => {
        const fetchProject = async () => {
            if (!user?.id) {
                setError('No hay usuario autenticado');
                return;
            }

            setIsLoading(true);
            try {
                const response = await projectService.getProjectById(user.id, projectId);
                if (response.ok) {
                    setProject(response.data);
                } else {
                    setError(response.message);
                }
            } catch (error) {
                setError('Error al cargar el proyecto');
            }
            setIsLoading(false);
        };

        fetchProject();
    }, [user, projectId]);

    if (!project) return (
        <div className="container my-5">
            <Navbar setIsLoading={setIsLoading} />
            <p>Proyecto no encontrado</p>
        </div>
    );

    return (
        <>
            {isLoading && <Spinner />}
            <Navbar setIsLoading={setIsLoading} />
            <div className="container my-3">
                <h1 className="title">Dashboard - {project.project || 'Proyecto sin nombre'}</h1>
                <p className="subtitle">Ubicación: {project.location || 'Sin descripción'}</p>
                <p className="text-resident">Residente: {project.resident}</p>
            </div>
        </>
    );
}

export default Dashboard;