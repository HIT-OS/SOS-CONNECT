const router = require('express').Router();

const { validate } = require('../../middlewares');
const { locationValidation } = require('../../validations');
const { locationController } = require('../../controllers');

router.post('/', validate(locationValidation.postLocation), locationController.postLocation);

module.exports = router;
