module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Contacts', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(100),
        unique: true
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING(50),
        unique: false
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING(50),
        unique: false
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING(50),
        unique: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  ,
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Contacts')
}
