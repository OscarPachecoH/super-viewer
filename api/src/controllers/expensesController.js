const { pool } = require("../db");

const expensesMachines = 'SELECT * FROM expensesMachines WHERE idProject = ?;';
const expensesMaterials = 'SELECT * FROM expensesMaterial WHERE idProject = ?;';
const expensesTramits = 'SELECT * FROM expensesTramitis WHERE idProject = ?;';

const getMaterials = async (req, res) => {
    try{
        const {id} = req.params;
        const {rows} = await pool.query(expensesMaterials, id);
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

const getMachines = async (req, res) => {
    try {
        const {id} = req.params;
        const {rows} = await pool.query(expensesMachines, id);
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

const getTramits = async(req, res) => {
    try {
        const {id} = req.params;
        const {rows} = await pool.query(expensesTramits, id);
        res.json(rows);
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