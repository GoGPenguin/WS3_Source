const Sequelize = require("sequelize");
const config = require("../config/db.config");

const sequelize = new Sequelize(
  config.dev.database,
  config.dev.username,
  config.dev.password,
  {
    host: config.dev.host,
    dialect: config.dev.dialect,
    port: config.dev.port,
  }
);

module.exports = sequelize;
