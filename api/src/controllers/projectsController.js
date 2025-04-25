const { pool } = require('../db.js');

const query1 = 'SELECT * FROM projects WHERE owner = ?;';
const query2 = 'SELECT project, location, resident FROM projects WHERE id = ? AND owner = ?;';

//Obtiene todas las obras registradas a ese propietario.
const getAllProjects = async (req, res) => {
    const id = req.params.idOwner;
    try {
        const [rows] = await pool.query(query1, id);
        if (rows.length <= 0) {
            return res.status(404).json({
                message: 'No hay registros'
            })
        }
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

//Obtiwnw los datos de la obra seleccionada para gestionar.
const getDataProject = async (req, res) => {
    const owner = req.params.idOwner;
    const project = req.params.idProject;
    try {
        const [rows] = await pool.query(query2, [project, owner]);
        if (rows.length <= 0) {
            return res.status(404).json({
                message: 'No hay registro'
            })
        }
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

module.exports = {
    getAllProjects,
    getDataProject
}