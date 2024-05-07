import { sequelize } from "../config/database.js";
import { Model, DataTypes } from "sequelize";

export default class Room extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    this.belongsTo(models.Branch, { foreignKey: 'branchID' });
    this.hasMany(models.Equipment, { foreignKey: 'roomID' });
    this.hasMany(models.DoneTask, { foreignKey: 'roomID' });
  }
}

Room.init({
  roomID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  branchID: DataTypes.INTEGER,
  status: DataTypes.INTEGER,
  roomName: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Room',
  tableName: 'Rooms'
});
