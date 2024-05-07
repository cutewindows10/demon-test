import { sequelize } from "../config/database.js";
import { Model, DataTypes } from "sequelize";

export default class Task extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    this.belongsTo(models.Checklist, { foreignKey: 'checklistID' });
    this.hasMany(models.DoneTask, { foreignKey: 'taskID' });
  }
}

Task.init({
  taskID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  taskTitle: DataTypes.STRING,
  checklistID: DataTypes.INTEGER,
}, {
  sequelize,
  modelName: 'Task',
  tableName: 'Tasks'
});
