import * as fs from 'fs'
import * as path from 'path'
import * as Sequelize from 'sequelize'

const config = require('../config/config.json')

import { ContactInstance, ContactAttributes } from './contact'
import { CategoryInstance, CategoryAttributes } from './category'

interface DbConnection {
  Contact: Sequelize.Model<ContactInstance, ContactAttributes>,
  Category: Sequelize.Model<CategoryInstance, CategoryAttributes>
}
let db = {}

const dbConfig = config[process.env.NODE_ENV]
const sequelize = new Sequelize(
  dbConfig['database'],
  dbConfig['username'],
  dbConfig['password'],
  dbConfig
)

const basename = path.basename(module.filename)
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(function(file) {
    const model = sequelize['import'](path.join(__dirname, file))
    db[model['name']] = model
  })

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db['sequelize'] = sequelize
db['Sequelize'] = Sequelize

export default <DbConnection>db
