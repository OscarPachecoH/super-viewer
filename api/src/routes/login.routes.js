const { Router } = require('express');
const { login, register, changePassword } =  require('../controllers/loginController');

const router = Router();

router.post('/login', login);

router.patch('/passwordchange/:id', changePassword);

router.post('/register', register);

module.exports = router;