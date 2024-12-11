const { client, register } = require('.');

// Gauge cho latitude
const sosLatitudeGauge = new client.Gauge({
  name: 'sos_latitude',
  help: 'Latitude of the sos',
  labelNames: ['name', 'phone'],
  registers: [register]
});

// Gauge cho longitude
const sosLongitudeGauge = new client.Gauge({
  name: 'sos_longitude',
  help: 'Longitude of the sos',
  labelNames: ['name', 'phone'],
  registers: [register]
});

// Gauge cho longitude
const sosLocationGauge = new client.Gauge({
  name: 'sos_location',
  help: 'Location of the sos',
  labelNames: ['name', 'phone', 'latitude', 'longitude'],
  registers: [register]
});

function updateSosLocation({ name, phone, latitude, longitude }) {
  sosLatitudeGauge.labels({ name, phone }).set(Number(latitude));
  sosLongitudeGauge.labels({ name, phone }).set(Number(longitude));
  sosLocationGauge.labels({ name, phone, latitude, longitude }).set(1);
}

module.exports = { updateSosLocation };
