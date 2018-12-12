import * as uuid from 'uuid'
import db from '../sqlz/models/_index'
import { CategoryInstance } from './../sqlz/models/category'
import * as BlueBird from 'bluebird'
import { withPagination } from '../sqlz/utils/pagination'

export function create(category: CategoryInstance, id: string): BlueBird<CategoryInstance> {
  return db.Category
    .create({
      id: id,
      name: category.name
    })
}

export function findAll(pagination: any): BlueBird<CategoryInstance[]> {
  return db.Category
    .findAll(pagination)
}

export function findOne(id: string): BlueBird<CategoryInstance> {
  return db.Category.findOne({
    where: { id: id }
  })
}
