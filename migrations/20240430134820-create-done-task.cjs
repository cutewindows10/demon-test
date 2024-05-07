'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DoneTasks', {
      doneTaskID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      taskID: {
        type: Sequelize.INTEGER
      },
      equipmentID: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      photo: {
        type: Sequelize.STRING
      },
      okay: {
        type: Sequelize.BOOLEAN
      },
      problem: {
        type: Sequelize.STRING
      },
      solution: {
        type: Sequelize.STRING
      },
      userID: {
        type: Sequelize.INTEGER
      },
      roomID: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DoneTasks');
  }
};