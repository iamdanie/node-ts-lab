import * as winston from 'winston'
import { Express, Request, Response } from 'express'
import * as ContactsRoutes from './contacts'
import * as CategoriesRoutes from './categories'

export function initRoutes(app: Express) {
  winston.log('info', 'Routes are ready')

  app.get('/api/v1', (req: Request, res: Response) => res.status(200).json({
    message: 'Welcome to the backend lab api!'
  }))

  ContactsRoutes.routes(app)
  CategoriesRoutes.routes(app)

  app.all('*', (req: Request, res: Response) => res.boom.notFound())
}
