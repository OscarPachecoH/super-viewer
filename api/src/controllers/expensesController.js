const { pool } = require("../db");

const expensesMachines = 'SELECT COALESCE(SUM(totalCost), 0) AS totalMachines FROM expenses_machines WHERE idProjects = ?;';
const expensesMaterials = 'SELECT COALESCE(SUM(totalCost), 0) AS totalMaterials FROM expenses_materials WHERE idProjects = ?;';
const expensesTramits = 'SELECT COALESCE(SUM(totalCost), 0) AS totalTramits FROM expenses_tramits WHERE idProjects = ?;';

const getMaterials = async (req, res) => {
    try{
        const {id} = req.params;
        const [rows] = await pool.query(expensesMaterials, [id]);

        res.json(rows[0]); // No importa si no hay registros la consulta devuelve un 0
        
    } catch (error) {
        console.log(error); //Respuesta para desarrollo
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

const getMachines = async (req, res) => {
    try {
        const {id} = req.params;
        const [rows] = await pool.query(expensesMachines, [id]);

        res.json(rows[0]); // No importa si no hay registros la consulta devuelve un 0

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

const getTramits = async(req, res) => {
    try {
        const {id} = req.params;
        const [rows] = await pool.query(expensesTramits, [id]);

        res.json(rows[0]); // No importa si no hay registros la consulta devuelve un 0

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

module.exports = {
    getMaterials,
    getMachines,
    getTramits
}