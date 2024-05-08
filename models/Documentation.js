import { sequelize } from "../config/database.js";
import { Model, DataTypes } from "sequelize";

export default class Documentation extends Model {

    static associate(models) {
      Documentation.belongsTo(models.User, { foreignKey: 'userID' });
    }
  }
  Documentation.init({
    documentationID: DataTypes.INTEGER,
    userID: DataTypes.INTEGER,
    data: DataTypes.DATE,
    file: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Documentation',
    tableName: 'Documentations'
  });
  return Documentation;
};