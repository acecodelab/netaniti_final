'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('m_grids', [
      {
        module_name: 'POSTS',
        avl_neta: 'Y',
        neta_priority: 1,
        neta_status: 1,
        avl_public: 'Y',
        public_priority: 1,
        public_status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        module_name: 'STORIES',
        avl_neta: 'Y',
        neta_priority: 1,
        neta_status: 1,
        avl_public: 'Y',
        public_priority: 1,
        public_status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        module_name: 'REELS',
        avl_neta: 'Y',
        neta_priority: 1,
        neta_status: 1,
        avl_public: 'Y',
        public_priority: 1,
        public_status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        module_name: 'RWA',
        avl_neta: 'N',
        neta_priority: 1,
        neta_status: 1,
        avl_public: 'Y',
        public_priority: 1,
        public_status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        module_name: 'POLLS',
        avl_neta: 'Y',
        neta_priority: 1,
        neta_status: 1,
        avl_public: 'N',
        public_priority: 1,
        public_status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        module_name: 'APPOINTMENT',
        avl_neta: 'Y',
        neta_priority: 1,
        neta_status: 1,
        avl_public: 'Y',
        public_priority: 1,
        public_status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        module_name: 'VOULNTEER',
        avl_neta: 'Y',
        neta_priority: 1,
        neta_status: 1,
        avl_public: 'Y',
        public_priority: 1,
        public_status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('m_grids', null, {});
  }
};
