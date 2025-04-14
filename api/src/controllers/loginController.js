const { pool } = require('../db');
const { encrypt, comparar } = require('../helpers/encript');
const { createToken } = require('../helpers/jwt');

const query1 = 'SELECT * FROM users WHERE email = ?;';
const query2 = 'INSERT INTO users(name, surnamePaternal, surnameMaternal, email, password) VALUES (?, ?, ?, ?, ?);';

const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const values = [email, password];
        const [rows] = await pool.query(query1, values);

        if(rows.length <= 0){
            return res.status(404).json({
                message: 'Error... usuario no encontrado'
            });
        }

        const user = rows[0];
        const checkPassword = await comparar(password, user.password);

        if(checkPassword){
            const token = createToken(user);
            return res.json({
                message: 'Login Correcto',
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    surnamePaternal: user.surnamePaternal,
                    surnameMaternal: user.surnameMaternal,
                    email: user.email
                }
            })
        } else if(!checkPassword){
            return res.status(404).json({
                message: 'Contraseña incorrecta'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno'
        });
    }
}

// Esta seccion es solo para pruebas, ya que esto deberia de estar en un sistema principal o maestro
const register = async(req, res) => {
    try {
        const { name, surnamePaternal, surnameMaternal, email, password } = req.body;
        
        const hash = await encrypt(password);
        
        const values = [name, surnamePaternal, surnameMaternal, email, hash];
        
        const [rows] = await pool.query(query2, values);

        if(rows.insertId != 0){
            return res.status(200).json({
                message: 'Registro realizado'
            });
        } else {
            return res.status(200).json({
                message: 'Registro no realizado'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Error interno'
        })
    }
}

module.exports = {
    login,
    register
}