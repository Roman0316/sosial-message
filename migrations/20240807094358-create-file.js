/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, { DataTypes }) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('files', {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        mimeType: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        size: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        s3Key: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
        },
        updatedAt: {
          type: DataTypes.DATE,
        },
      }, { transaction });

      await queryInterface.createTable('postFiles', {
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
          onDelete: 'CASCADE',
        },
        fileId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: { tableName: 'files' },
            key: 'id',
          },
          onDelete: 'CASCADE',
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
      await queryInterface.dropTable('postFiles', { transaction });
      await queryInterface.dropTable('files', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
