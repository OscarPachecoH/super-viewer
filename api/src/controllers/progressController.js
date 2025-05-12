const { pool } = require("../db");

const totalFloors = 'SELECT floors_projects.numPiso as `piso`, floors_advance.totalAdvance as `avance` FROM floors_advance JOIN floors_projects ON floors_advance.idPiso = floors_projects.id WHERE floors_projects.idProject = ?';

const getProgressFloor = async (req, res) => {
    try {
        const {id} = req.params;
        
        const [rows] =  await pool.query(totalFloors, id);

        res.json(rows);

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

module.exports = {
    getProgressFloor
}