import * as Sequelize from 'sequelize'

export interface ContactAttributes {
  id?: string
  email?: string
  firstName?: string
  lastName?: string
  phone?: string
}

export interface ContactInstance extends Sequelize.Instance<ContactAttributes> {
  id: string
  email: string
  createdAt: Date
  updatedAt: Date

  firstName: string
  lastName: string
  phone: string
}

export default function defineContact(sequelize: Sequelize.Sequelize, DataTypes) {
  const Contact = sequelize.define('Contact', {
    email: DataTypes.STRING(100),
    firstName: DataTypes.STRING(50),
    lastName: DataTypes.STRING(50),
    phone: DataTypes.STRING(50)
  }, {
      classMethods: {}
    })
  return Contact
}
