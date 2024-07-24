const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('likes', {
      userId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: { tableName: 'users' },
          key: 'id',
        },
      },
      postId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: { tableName: 'posts' },
          key: 'id',
        },
      },
      createdAt: {
        type: DataTypes.DATE,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('likes');
  },
};
