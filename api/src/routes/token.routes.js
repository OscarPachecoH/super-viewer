const Router = require('express');
const token = require('../middleware/verifyToken')

const router = Router();

router.get('/verify-token', token, (req, res) => {
    setTimeout(() => {
        res.json({ ok: true, user: req.user });
    }, 2000)
});

module.exports = router;