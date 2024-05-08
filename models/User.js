// User.js
import { sequelize } from "../config/database.js";
import { Model, DataTypes } from "sequelize";

export default class User extends Model {
  static associate(models) {
    this.hasMany(models.DoneTask);
    this.belongsTo(models.Branch);
    this.hasMany(models.Documentation);
  }
  
}

User.init({
  userID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  CIN: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  key: DataTypes.STRING,
  branchID: DataTypes.INTEGER,
  username: DataTypes.STRING
}, {
  sequelize,
  modelName: 'User',
  tableName: 'user'
});