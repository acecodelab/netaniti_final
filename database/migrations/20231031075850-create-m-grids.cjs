'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('m_grids', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      module_name: {
        type: Sequelize.STRING
      },
      avl_neta: {
        type: Sequelize.STRING
      },
      neta_priority: {
        type: Sequelize.INTEGER
      },
      neta_status: {
        type: Sequelize.INTEGER
      },
      neta_image: {
        type: Sequelize.STRING
      },
      avl_public: {
        type: Sequelize.STRING
      },
      public_priority: {
        type: Sequelize.INTEGER
      },
      public_status: {
        type: Sequelize.INTEGER
      },
      public_image: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('m_grids');
  }
};