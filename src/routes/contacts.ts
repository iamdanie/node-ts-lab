import { Express } from 'express'
import { ContactController } from '../endpoints/_index'

export function routes(app: Express) {

  app.get('/api/contact/list', ContactController.ContactGet.list)
  app.post('/api/contact/detail', ContactController.ContactPost.findOne)
  app.post('/api/contact/register', ContactController.ContactPost.create)

}
