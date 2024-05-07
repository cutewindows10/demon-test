import { sequelize } from "../config/database.js";
import { Model, DataTypes } from "sequelize";

export default class Equipment extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    this.belongsTo(models.Room, { foreignKey: 'roomID' });
    this.hasMany(models.DoneTask, { foreignKey: 'equipmentID' });
  }
}

Equipment.init({
  equipmentID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  roomID: DataTypes.INTEGER,
  equipmentName: DataTypes.STRING,
  checklistID: DataTypes.INTEGER,
}, {
  sequelize,
  modelName: 'Equipment',
  tableName: 'Equipment'
});
