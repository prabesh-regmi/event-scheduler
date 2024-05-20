const app = require('./app');
const config = require('./config/config');
const { sequelize } = require('./config/database');
const logger = require('./config/logger');

let server;

const syncDatabase = async (sequelize) => sequelize.sync({ force: true }).catch((err) => console.log("error-db", err));

sequelize.authenticate()
  .then(() => {
    logger.info('Connected to Postgres');
    // syncDatabase(sequelize);
    server = app.listen(config.port, () => {
      logger.info(`Listening to port ${config.port}`);
    });
  })
  .catch(err => {
    logger.error('Unable to connect to the database:', err);
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      // Ensure the database connection is properly closed
      sequelize.close();
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
    sequelize.close();
  }
});
