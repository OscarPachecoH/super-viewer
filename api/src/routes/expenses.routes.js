const { Router } = require('express');
const{ getMachines, getMaterials, getTramits } = require("../controllers/expensesController");

const router = Router();

router.get('/getMaterials/:id', getMaterials);

router.get('/getMachines/:id', getMachines);

router.get('/getTramits/:id', getTramits);

module.exports = router;