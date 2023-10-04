import Sequelize, {DataTypes, Model} from "sequelize";
import sequelize from "../config/sequelize-config.js";
class ManufacturingProcesses extends Model {
}

ManufacturingProcesses.init({
    id: {
        type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true,
    }, name: {
        type: DataTypes.STRING, allowNull: false,
    }, description: {
        type: DataTypes.STRING, allowNull: true,
    },
}, {
    sequelize, timestamps: true, paranoid: true, modelName: "ManufacturingProcesses",
});

export default ManufacturingProcesses;