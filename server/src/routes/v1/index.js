const router = require('express').Router();

const locationRouter = require('./location.route');

router.use('/location', locationRouter);

module.exports = router;
