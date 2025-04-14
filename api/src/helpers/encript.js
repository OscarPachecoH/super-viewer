const bcrypt = require('bcryptjs');

module.exports.encrypt = async(textPlain) => {
    const hash = await bcrypt.hash(textPlain, 10)
    return hash;
}

module.exports.comparar = async(passwordPlain, hashPassword) => {
    return await bcrypt.compare(passwordPlain, hashPassword);
}