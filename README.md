[![Build Status](https://travis-ci.org/iamdanie/web-phone-book-backend.svg?branch=master)](https://travis-ci.org/iamdanie/web-phone-book-backend)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)]

# Introduction

Phone Book Demo Application built on Typescript, NodeJS + Express + Sequelize (with MySQL).

## Installation

Run one of the command below

```bash
npm install
```

```bash
npm install -g yarn
yarn
```

The build tasks use **Gulp tasks runner**. Typescript will be transpiled to Javascript in the /build directory.

## Configure your database

First, open a mysql session and create all the necessary databases for all the environments:

```sql
CREATE DATABASE `phonebook_dev`;
CREATE DATABASE `phonebook_test`;
CREATE DATABASE `phonebook`;
```

Sequelize configuration and entities can be found in /src/sqlz directory.

| Directory | Description |
|---|---|
| src/sqlz/config  | Database configuration for all environments. |
| src/sqlz/migrations  | Your database migrations scripts. Keep this files in Javascript and run sequelize db:migrate to migrate your database schema. |
| src/sqlz/models | Entities for SQL in Sequelize format. |

Define your database schema in config/config.json file, and then run:
```bash
npm run sqlz:migrate
```

## Run the application

```bash
npm start
```

Your web server will be running on http://localhost:3001

## API Reference

### GET   /api/contact/list
http://localhost:3001/api/contact/list

### POST   /api/contact/register
curl -X POST -H 'Content-Type: application/json' -d '{"firstName":"Foo","lastName":"Bar","email":"foo@bar.baz","phone":"5215521918211"}' http://localhost:3001/api/contact/register

### POST  /api/contact/detail
curl -X POST -H 'Content-Type: application/json' -d '{"email":"foo@bar.com"}'
http://localhost:3001/api/contact/detail

## Build for production

```bash
npm run build
```

## Running linter and prettifying code

When running the linter, it will evaluate source based on tslint.json configuration files through husky gulp task.

```bash
git commit -m "Commit message"
```
```bash
husky - npm run -s precommit
```

You may also run the command with a npm script

```bash
npm run prettify
```
