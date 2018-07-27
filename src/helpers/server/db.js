import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');

/* Connection URL */
const url = process.env.NODE_ENV === 'development' ? process.env.DEV_DB_CONN : process.env.PROD_DB_CONN;

mongoose.connect(url, {
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000
}, (err) => {
  err ? logger.error(err) : logger.info('Connected to database');
});
