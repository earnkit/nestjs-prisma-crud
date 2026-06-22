# NestJS Prisma CRUD API

A simple backend CRUD API built with **NestJS**, **Prisma**, **PostgreSQL**, and **Docker**.
This project includes basic CRUD modules, unit tests, and e2e tests for learning and portfolio practice.

## Tech Stack

* NestJS
* TypeScript
* Prisma ORM
* PostgreSQL
* Docker
* Jest
* Supertest

## Features

* User CRUD API
* Product CRUD API
* Category CRUD API
* Prisma database connection
* PostgreSQL with Docker Compose
* Unit test examples
* E2E test examples

## Project Structure

```bash
src/
  category/
    dto/
    category.controller.ts
    category.service.ts
    category.module.ts

  product/
    dto/
    product.controller.ts
    product.service.ts
    product.module.ts

  users/
    dto/
    users.controller.ts
    users.service.ts
    users.module.ts

  prisma/
    prisma.module.ts
    prisma.service.ts

prisma/
  migrations/
  schema.prisma

test/
  category.e2e-spec.ts
  product.e2e-spec.ts
  user.e2e-spec.ts
```

## Installation

```bash
npm install
```

## Environment Variables

This project uses environment variables for database connection and application configuration.

Create a `.env` file in the root project by copying `.env.example`.

```bash
cp .env.example .env
```

Example:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
PORT=3000
```

### Environment Variables Description

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string used by Prisma |
| `PORT` | Application port. Default is `3000` |

> Do not commit the real `.env` file to GitHub because it may contain sensitive information.

## Run Database with Docker

```bash
docker compose up -d
```

## Prisma Setup

Run database migration:

```bash
npx prisma migrate dev
```

Open Prisma Studio:

```bash
npx prisma studio
```

## Run the Project

```bash
npm run start:dev
```

The API will run at:

```bash
http://localhost:3000
```

## Run Tests

Run unit tests:

```bash
npm run test
```

Run e2e tests:

```bash
npm run test:e2e
```

Run test coverage:

```bash
npm run test:cov
```

## API Modules

### Users

* `GET /users`
* `GET /users/:id`
* `POST /users`
* `PATCH /users/:id`
* `DELETE /users/:id`

### Products

* `GET /product`
* `GET /product/:id`
* `POST /product`
* `PATCH /product/:id`
* `DELETE /product/:id`

### Categories

* `GET /category`
* `GET /category/:id`
* `POST /category`
* `PATCH /category/:id`
* `DELETE /category/:id`

## Notes

This project was created as part of backend practice for learning:

* NestJS project structure
* REST API design
* Prisma ORM
* PostgreSQL database
* Unit testing
* E2E testing
* Git and GitHub workflow

## Author

Kittiya Treesuk
