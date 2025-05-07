import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Spinner from "../Components/SpinnerLoading";
import projectService from "../Services/projectService";
import { useAuth } from "../Context/AuthContext";
import { useParams } from "react-router-dom";
import Table from "../Components/Table";

const Dashboard = () => {

    const [project, setProject] = useState(null); // Variable para almacenar el proyecto
    const [expenses, setExpenses] = useState([]); // Variable para almacenar todos los gastos relacionados con el proyecto

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
                // Peticiones al servicio
                const projectResponse = await projectService.getProjectById(user.id, projectId);
                const materialsResponse = await projectService.getProjectExpenMaterials(projectId);
                const machinesResponse = await projectService.getProjectExpenMachines(projectId);
                const tramitsResponse = await projectService.getProjectExpenTramits(projectId);

                // Comporbacion de existencia de usuario
                if (projectResponse.ok) {

                    setProject(projectResponse.data);

                } else {
                    setError(projectResponse.message);
                    return;
                }

                const expensesData = [];// Arreglo para datos de gastos

                if(materialsResponse.ok){
                    expensesData.push({
                        id: 'materiales',
                        category: 'Materiales',
                        total: materialsResponse.data.totalMaterials,
                    });
                }
                if(machinesResponse.ok){
                    expensesData.push({
                        id: 'machines',
                        category: 'Maquinaria',
                        total: machinesResponse.data.totalMachines,
                    });
                }
                if(tramitsResponse.ok){
                    expensesData.push({
                        id: 'tramits',
                        category: 'Tramites',
                        total: tramitsResponse.data.totalTramits,
                    });
                }

                setExpenses(expensesData);

            } catch (error) {
                setError('Error al cargar datos');
            }
            setIsLoading(false);
        };

        fetchProject();
    }, [user, projectId]);

    const totalGastos = expenses.reduce((sum, item) => sum + item.total, 0); // Suma de todos los gastos

    // Funcion para dar formato a catidades
    function number(x){
        return x.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    }

    // Creacion de columnas
    const columns = [
        { key: 'category', label: 'Concepto' },
        {
            key: 'total',
            label: 'Total',
            render: (value) => `$${number(value)}`
        },
    ]

    // Creacion de footer
    const footer = [
        { content: 'Total:', className: 'total' },
        { content: `$${number(totalGastos)}` },
    ]

    // Comprueba si la variable tiene datos
    if (!project) return (
        <>
            <Navbar setIsLoading={setIsLoading} />
            <h1 className="title">Proyecto no encontrado</h1>
        </>
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
            <div>
                <h1 className="title">Gastos de obra</h1>
                <Table 
                    columns={columns}
                    data={expenses}
                    rowKey="id"
                    footer={footer}
                />
            </div>
        </>
    );
}

export default Dashboard;