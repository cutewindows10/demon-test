import { sequelize } from "../config/database.js";
import { Model, DataTypes } from "sequelize";

export default class DoneTask extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    this.belongsTo(models.Task, { foreignKey: 'taskID' });
    this.belongsTo(models.Equipment, { foreignKey: 'equipmentID' });
    this.belongsTo(models.User, { foreignKey: 'userID' });
    this.belongsTo(models.Room, { foreignKey: 'roomID' });
  }
}

DoneTask.init({
  doneTaskID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  taskID: DataTypes.INTEGER,
  equipmentID: DataTypes.INTEGER,
  date: DataTypes.DATE,
  photo: DataTypes.STRING,
  okay: DataTypes.BOOLEAN,
  problem: DataTypes.STRING,
  solution: DataTypes.STRING,
  userID: DataTypes.INTEGER, 
  roomID: DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'DoneTask',
  tableName: 'DoneTasks'
});
