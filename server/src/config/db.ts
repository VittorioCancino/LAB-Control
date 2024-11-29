import { Sequelize } from "sequelize-typescript";

// Variables de entorno
const config = require("./config")
console.log(config)

// Url Database
const db = new Sequelize(config.DATABASE_URL!, {
	models: [__dirname + "/../models/**.*.ts"],
	logging: false,
});

export default db;
