'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // return queryInterface.bulkInsert('users', [
    //   {
    //     email: 'usuario1@example.com',
    //     password: 'contraseña1',
    //     createdAt: '2023-01-15T08:00:00Z',
    //     updatedAt: '2023-01-15T08:00:00Z',
    //   },
    //   {
    //     email: 'usuario2@example.com',
    //     password: 'contraseña2',
    //     createdAt: '2023-02-20T10:30:00Z',
    //     updatedAt: '2023-02-20T10:30:00Z',
    //   },
    //   {
    //     email: 'usuario3@example.com',
    //     password: 'contraseña3',
    //     createdAt: '2023-03-25T12:45:00Z',
    //     updatedAt: '2023-03-25T12:45:00Z',
    //   },
    // ]);

    queryInterface.bulkInsert('expenses', [
      {
        description: 'Gasto 1',
        amount: 100,
        user_id: 1,
        createdAt: '2023-01-15T08:00:00Z',
        updatedAt: '2023-01-15T08:00:00Z',
      },
      {
        description: 'Gasto 2',
        amount: 200,
        user_id: 2,
        createdAt: '2023-02-20T10:30:00Z',
        updatedAt: '2023-02-20T10:30:00Z',
      },
      {
        description: 'Gasto 3',
        amount: 300,
        user_id: 3,
        createdAt: '2023-03-25T12:45:00Z',
        updatedAt: '2023-03-25T12:45:00Z',
      },
    ]);

    return queryInterface.bulkInsert('expenses_categories', [
      {
        name: 'Comida',
        user_id: 1,
        createdAt: '2023-01-15T08:00:00Z',
        updatedAt: '2023-01-15T08:00:00Z',
      },
      {
        name: 'Otro gasto',
        user_id: 2,
        createdAt: '2023-02-20T10:30:00Z',
        updatedAt: '2023-02-20T10:30:00Z',
      },
      {
        name: 'Alquiler',
        user_id: 3,
        category_id: 1,
        createdAt: '2023-03-25T12:45:00Z',
        updatedAt: '2023-03-25T12:45:00Z',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
