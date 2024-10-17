import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

// Variables de entorno
const result = dotenv.config();
console.log(result)

// Url Database
const db = new Sequelize(process.env.DATABASE_URL!, {
	models: [__dirname + "/../models/**.*.ts"],
	logging: false,
});

export default db;
