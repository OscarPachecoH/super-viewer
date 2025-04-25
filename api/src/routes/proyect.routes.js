const { Router } = require("express");
const { getAllProjects, getDataProject } = require("../controllers/projectsController");

const router = Router();

router.get('/projects/:idOwner', getAllProjects);

router.get('/project/:idOwner/:idProject', getDataProject);

module.exports = router;