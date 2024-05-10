'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Documentations', {
      fields: ['userID'],
      type: 'foreign key',
      name: 'fk_documentations_userID',
      references: {
        table: 'user',
        field: 'userID'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Documentations', 'fk_documentations_userID');
  }
};
