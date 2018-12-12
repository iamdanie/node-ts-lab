import * as uuid from 'uuid'
import db from '../sqlz/models/_index'
import { ContactInstance } from './../sqlz/models/contact'
import * as BlueBird from 'bluebird'

export function create(contact: ContactInstance, id: string): BlueBird<ContactInstance> {
  return db.Contact
    .create({
      id: id,
      email: contact.email,
      firstName: contact.firstName,
      lastName: contact.lastName,
      phone: contact.phone
    })
}

export function findAll(): BlueBird<ContactInstance[]> {
  return db.Contact
    .findAll()
}

export function findOne(email: string): BlueBird<ContactInstance> {
  return db.Contact.findOne({
    where: { email: email }
  })
}


