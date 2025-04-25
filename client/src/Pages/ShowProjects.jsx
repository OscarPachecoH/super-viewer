import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import Navbar from "../Components/Navbar";
import Spinner from "../Components/SpinnerLoading";
import Card from "../Components/Card";
import '../Styles/Styles.css'
import projectService from "../Services/projectService";

const ShowProjects = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchProjects = async () => {
            if (!user?.id) {
                setError('No hay usuario autenticado');
                return;
            }

            setIsLoading(true);
            const response = await projectService.getProjectsByOwner(user.id);
            if (response.ok) {
                setProjects(response.data);
            } else {
                setError(response.message);
            }
            setIsLoading(false);
        };

        fetchProjects();
    }, [user]);

    return (
        <>
            {isLoading && <Spinner />}
            <Navbar setIsLoading={setIsLoading} />
            <h1 className="title">Lista de proyectos</h1>
            <div className="container my-5">
                {error && <div className="alert alert-danger">{error}</div>}
                {projects.length === 0 && !error && !isLoading ? (
                    <p>No tienes proyectos.</p>
                ) : (
                    <div className="row">
                        {projects.map((project) => (
                            <div key={project.id} className="col-md-4 mb-4">
                                <Card project={project} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default ShowProjects;