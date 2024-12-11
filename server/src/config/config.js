const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(process.cwd(), '.env') });

module.exports = {
  app: {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    name: process.env.APP_NAME || 'app'
  }
};
