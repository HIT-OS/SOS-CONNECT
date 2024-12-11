const { status: httpStatus } = require('http-status');

const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const response = require('../utils/response');
const { updateSosLocation } = require('../metrics/location.metric');

const postLocation = catchAsync(async (req, res) => {
  const { name, phone, latitude, longitude } = pick(req.body, [
    'name',
    'phone',
    'latitude',
    'longitude'
  ]);
  updateSosLocation({ name, phone, latitude, longitude });
  return res
    .status(httpStatus.OK)
    .json(response({ statusCode: httpStatus.OK, data: { name, phone, latitude, longitude } }));
});

module.exports = { postLocation };
