import { sequelize } from "../config/database.js";
import { Model, DataTypes } from "sequelize";

export default class Checklist extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
  this.hasMany(models.Task, { foreignKey: 'checklistID' });
  }
}

Checklist.init({
  checklistID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  checklistType: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'Checklist',
  tableName: 'Checklists'
});
