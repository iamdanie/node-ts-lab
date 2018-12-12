import { ContactInstance } from '../../sqlz/models/contact'
import { Request, Response } from 'express'
import { ContactsDao } from '../../dao/_index'
import * as uuid from 'uuid'

const directoryTemp = __dirname + '/../temp/'

export function create(req: Request, res: Response) {

    req.checkBody('firstName', 'firstName is required').notEmpty()
    req.checkBody('lastName', 'lastName is required').notEmpty()
    req.checkBody('email', 'Email is required').notEmpty()
    req.checkBody('email', 'A valid email is required').isEmail()
    req.checkBody('phone', 'A phone with at least 10 digits is required').notEmpty().len({min: 10, max: 50})

    req.getValidationResult()
      .then(function(result) {
        if (result.isEmpty()) {
          const id = uuid.v4()
          const newContact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone
          }

          return ContactsDao.create(newContact as ContactInstance, id)
            .then(contact => res.status(200).json(contact))
            .catch(error => res.boom.badRequest(error))

        } else {
          res.boom.badRequest('Validation errors', result.mapped())
        }
      })
}

export function findOne(req: Request, res: Response) {
  return ContactsDao.findOne(req.body.email)
    .then(contact => res.status(200).json(contact))
    .catch(error => res.boom.badRequest(error))
}
