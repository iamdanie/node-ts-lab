import { CategoryInstance } from '../../sqlz/models/category'
import { Request, Response } from 'express'
import { CategoriesDao } from '../../dao/_index'
import * as uuid from 'uuid'
import { withPagination, returnPaginationResponse } from '../../sqlz/utils/pagination'

export function create(req: Request, res: Response) {

  req.checkBody('name', 'name is required').notEmpty()

  req.getValidationResult()
    .then(function(result) {
      if (result.isEmpty()) {
        const id = uuid.v4()
        const newCategory = {
          name: req.body.name
        }

        return CategoriesDao.create(newCategory as CategoryInstance, id)
          .then(category => res.status(200).json(category))
          .catch(error => res.boom.badRequest(error))

      } else {
        res.boom.badRequest('Validation errors', result.mapped())
      }
    })
}

export function findOne(req: Request, res: Response) {
  return CategoriesDao.findOne(req.body.id)
    .then(category => res.status(200).json({ category }))
    .catch(error => res.boom.badRequest(error))
}

export function list(req: Request, res: Response) {
  const parameters = req.body

  return CategoriesDao
    .findAll(withPagination(parameters))
    .then(categories => res.status(200).json({ items: categories, ...returnPaginationResponse(categories, parameters) }))
    .catch(error => res.boom.badRequest(error))
}
