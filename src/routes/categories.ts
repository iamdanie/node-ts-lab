import { Express } from 'express'
import { CategoryController } from '../endpoints/_index'

export function routes(app: Express) {

  app.post('/api/category/list', CategoryController.CategoryPost.list)
  app.post('/api/category/detail', CategoryController.CategoryPost.findOne)
  app.post('/api/category/register', CategoryController.CategoryPost.create)
}
