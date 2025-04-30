const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'superviewer-secret-key'; // JWT_SECRET declarado en archivo .env

const createToken = (user) => {
    return jwt.sign({
        id: user.id,
        name: user.name,
        surnamePaternal: user.surnamePaternal,
        surnameMaternal: user.surnameMaternal,
        email: user.email,
    },SECRET,{
        expiresIn: '2h'
    });
}

module.exports = {
    createToken
}