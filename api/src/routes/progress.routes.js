const { Router } = require('express');
const { getProgressFloor } = require('../controllers/progressController');

const router = Router();

router.get('/getProgressFloor/:id', getProgressFloor);

module.exports = router;