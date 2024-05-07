'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

  await queryInterface.addConstraint('user', { 
    fields: ['branchID'],
    type: 'foreign key',
    name: 'fk_users_branchID', 
    references: {
      table: 'Branches',
      field: 'branchID'
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  });

  await queryInterface.addConstraint('Tasks', {
    fields: ['checklistID'],
    type: 'foreign key',
    name: 'fk_tasks_checklistID',
    references: {
      table: 'Checklists',
      field: 'checklistID'
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  });

  await queryInterface.addConstraint('Equipment', {
    fields: ['roomID'],
    type: 'foreign key',
    name: 'fk_equipment_roomID',
    references: {
      table: 'Rooms',
      field: 'roomID'
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  });

  await queryInterface.addConstraint('Equipment', {
    fields: ['checklistID'],
    type: 'foreign key',
    name: 'fk_equipment_checklistID',
    references: {
      table: 'Checklists',
      field: 'checklistID'
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  });

  await queryInterface.addConstraint('DoneTasks', {
    fields: ['taskID'],
    type: 'foreign key',
    name: 'fk_doneTasks_taskID',
    references: {
      table: 'Tasks',
      field: 'taskID'
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  });

  await queryInterface.addConstraint('DoneTasks', {
    fields: ['equipmentID'],
    type: 'foreign key',
    name: 'fk_doneTasks_equipmentID',
    references: {
      table: 'Equipment',
      field: 'equipmentID'
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  });

  await queryInterface.addConstraint('DoneTasks', {
    fields: ['userID'],
    type: 'foreign key',
    name: 'fk_doneTasks_userID',
    references: {
      table: 'user', // Changed 'Users' to 'user'
      field: 'userID'
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  });

  await queryInterface.addConstraint('DoneTasks', {
    fields: ['roomID'],
    type: 'foreign key',
    name: 'fk_doneTasks_roomID',
    references: {
      table: 'Rooms',
      field: 'roomID'
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  });

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeConstraint('user', 'fk_users_branchID'); 
    await queryInterface.removeConstraint('Tasks', 'fk_tasks_checklistID');
    await queryInterface.removeConstraint('Equipment', 'fk_equipment_roomID');
    await queryInterface.removeConstraint('Equipment', 'fk_equipment_checklistID');
    await queryInterface.removeConstraint('DoneTasks', 'fk_doneTasks_taskID');
    await queryInterface.removeConstraint('DoneTasks', 'fk_doneTasks_equipmentID');
    await queryInterface.removeConstraint('DoneTasks', 'fk_doneTasks_userID');
    await queryInterface.removeConstraint('DoneTasks', 'fk_doneTasks_roomID');
  }

};

