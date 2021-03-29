require("dotenv").config();
import { NODE_CONFIG_DIR } from "../config/utils/utils";
import config from "config";

import { Sequelize } from "sequelize";
import * as tedious from "tedious";

import { users } from "./models/users";

Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
  return this._applyTimezone(date, options).format("YYYY-MM-DD HH:mm:ss.SSS");
};

const database = {};

database.instance = new Sequelize(
  config.get(`database.name`),
  config.get(`database.user`),
  config.get(`database.password`),
  {
    logging: false,
    host: config.get(`database.host`),
    port: config.get(`database.port`),
    dialect: "mssql",
    dialectModule: tedious,
    omitNull: true,
    timezone: "America/Campo_Grande",
    pool: {
      max: 10,
      min: 1,
      acquire: 30000,
      idle: 10000
    },
    define: {
      syncOnAssociation: false
    }
  }
);

database.users = users(database.instance);

export { database };