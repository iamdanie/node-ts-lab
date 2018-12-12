import { Request, Response } from 'express'
import { ContactsDao } from '../../dao/_index'

export function list(req: Request, res: Response) {
  return ContactsDao
    .findAll()
    .then(contacts => res.status(200).json(contacts))
    .catch(error => res.boom.badRequest(error))
}
