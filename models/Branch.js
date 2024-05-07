
import { sequelize } from "../config/database.js";
import { Model, DataTypes } from "sequelize";

export default class Branch extends Model {
  static associate(models) {
    this.hasMany(models.Room);
    this.hasMany(models.User);
  }
}

Branch.init({
  branchID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  branchName: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Branch',
  tableName: 'Branches'
});
