const client = require('prom-client');

const collectDefaultMetrics = client.collectDefaultMetrics;

const register = new client.Registry();

collectDefaultMetrics({ register, prefix: 'sos_connect_' });

module.exports = { client, register };
