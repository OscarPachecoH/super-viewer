const { pool } = require('../db');
const { encrypt, comparar } = require('../helpers/encript');
const { createToken } = require('../helpers/jwt');

const query1 = 'SELECT * FROM users WHERE email = ?;';
const query2 = 'INSERT INTO users(name, surnamePaternal, surnameMaternal, email, password) VALUES (?, ?, ?, ?, ?);';

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const values = [email, password];
        const [rows] = await pool.query(query1, values);

        if (rows.length <= 0) {
            return res.status(404).json({
                message: 'Error... usuario no encontrado'
            });
        }

        const user = rows[0];
        const checkPassword = await comparar(password, user.password);

        if (checkPassword) {
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
        } else if (!checkPassword) {
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

// Seccion para cambio de contraseña
const changePassword = async (req, res) => {
    try {
        const { id } = req.params; //ID del usuario
        const { password, newPassword } = req.body; //Contraseña actual y nueva contrseña

        //Se selecciona los datos de usuario para al,macenarlos
        const [row] = await pool.query('SELECT id, password FROM users WHERE id = ?', [id]);

        //Si no hay coincidencias se termina el proceso
        if (row.length <= 0) {
            return res.status(404).json({
                message: 'Something goes wrogs'
            })
        }

        /*Se continua con la comparacion de contraseñas
        - Se pide la contraseña actual para compararla con la contraseña guardada en la BD
        */
        const checkPassword = await comparar(password, row[0].password);

        if (checkPassword) { //Si el resultado de la comparación es TRUE
            const passwordHash = await encrypt(newPassword); //Hasteo de la contraseña nueva
            const [result] = await pool.query('UPDATE users SET password = ? WHERE id = ?', [passwordHash, id]); //Se actualiza la contraseña del usuario
            //Se verifica si se realizo el UPDATE
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'No hubo cambios'
                })
            } else {
                return res.status(200).json({
                    message: 'Se realizo el cambio'
                })
            }
        } else if (!checkPassword) { //Si el resultado de la comparación es FALSE
            return res.status(404).json({
                message: 'Contraseña incorrecta'
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}


// Esta seccion es solo para pruebas, ya que esto deberia de estar en un sistema principal o maestro
const register = async (req, res) => {
    try {
        const { name, surnamePaternal, surnameMaternal, email, password } = req.body;

        const hash = await encrypt(password);

        const values = [name, surnamePaternal, surnameMaternal, email, hash];

        const [rows] = await pool.query(query2, values);

        if (rows.insertId != 0) {
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
    changePassword,
    register // Solo para depuración
}