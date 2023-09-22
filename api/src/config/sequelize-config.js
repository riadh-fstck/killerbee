import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.POSTGRES_URI, {
    logging: false, // Désactive les logs Sequelize
});

sequelize.sync({ force: true });

export default sequelize;
