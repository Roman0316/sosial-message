/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, { DataTypes }) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('tags', {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        value: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
        },
        updatedAt: {
          type: DataTypes.DATE,
        },
      }, { transaction });

      await queryInterface.createTable('postTags', {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        postId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: { tableName: 'posts' },
            key: 'id',
          },
        },
        tagId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: { tableName: 'tags' },
            key: 'id',
          },
        },
        createdAt: {
          type: DataTypes.DATE,
        },
        updatedAt: {
          type: DataTypes.DATE,
        },
      }, { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('postTags', { transaction });
      await queryInterface.dropTable('tags', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
