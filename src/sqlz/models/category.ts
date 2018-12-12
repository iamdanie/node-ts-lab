import * as Sequelize from 'sequelize'

export interface CategoryAttributes {
  id?: string
  name?: string
}

export interface CategoryInstance extends Sequelize.Instance<CategoryAttributes> {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export default function defineCategory(sequelize: Sequelize.Sequelize, DataTypes) {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING(50)
  }, {
      classMethods: {}
    })
  return Category
}
