[![Build Status](https://travis-ci.org/Raywire/postgres-express-node.svg?branch=develop)](https://travis-ci.org/Raywire/postgres-express-node)
[![Build Status](https://ryanwire.visualstudio.com/postgres-express-node/_apis/build/status/Raywire.postgres-express-node?branchName=develop)](https://ryanwire.visualstudio.com/postgres-express-node/_build/latest?definitionId=2&branchName=develop)
[![Coverage Status](https://coveralls.io/repos/github/Raywire/postgres-express-node/badge.svg?branch=develop)](https://coveralls.io/github/Raywire/postgres-express-node?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/af62aca2e06bd8f4da6f/maintainability)](https://codeclimate.com/github/Raywire/postgres-express-node/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/af62aca2e06bd8f4da6f/test_coverage)](https://codeclimate.com/github/Raywire/postgres-express-node/test_coverage)

# postgres-express-node
Todo list backend API using express

Project: Todo List
Description:This app enables you to create Todos and add items to them.

## Getting Started

git clone the repo

### Prerequisites

Two postgres databases are required one for testing the other for development

**Setting up the database with a user who has all privileges**
```sql
sudo -u postgres psql
postgres=# create database your-database;
postgres=# create user your-username with encrypted password 'your-password';
postgres=# grant all privileges on database your-database to your-username;
```
### Contents of .env file

```sh
DATABASE_URL="postgres://username:password@localhost:5432/database"
DATABASE_URL_TEST="postgres://username:password@localhost:5432/database_test"
NODE_ENV="development"
PORT=8001
SECRET_KEY="your-secret-key"

```
## Running the app
Cd into the postgres-express-node folder

Install the dependencies

```node
npm install
```
Run the migrations

```node
sequelize db:migrate
```
Start server in development mode

```node
npm run start:dev
```

## Running the tests
Run the unit and integration tests using the command
```node
npm test
```

## Built With

*   [Express](https://expressjs.com/) - Express
*   [NodeJS](https://nodejs.org/) - NodeJS
*   [PostgreSQL](https://postgresql.org/docs/) - PostgreSQL
*   [Passport](http://passportjs.org) - Passport

## API Endpoints

### Versioning for the none auth endpoints
*  `/api/`

*  Use `http://127.0.0.1:8001` as the base URL for the endpoints

## API Documentation
[Postman API Documentation](https://documenter.getpostman.com/view/6831940/SVYtNdfm)


| Method  | Description| Route |
| ------------- | ------------- | ------------- |
| POST | Sign up | `/auth/signup` |
| POST | Log in | `/auth/login` |
| PATCH | Update password | `/api/users/:userId` |
| GET |  Get all todos | `/api/todos` |
| POST | Create a todo | `/api/todos` |
| GET |  Get a specific todo | `/api/todos/:todoId` |
| PUT |  Update a specific todo | `/api/todos/:todoId` |
| DELETE | Delete a specific todo |`/api/todos/:todoId` |
| POST | Create a todo item | `/api/todos/:todoId/items` |
| PUT | Update a todo item | `/api/todos/:todoId/items/:todoItemId` |
| DELETE | Delete a todo item | `/api/todos/:todoId/items/:todoItemId` |

## Hosted on Heroku
[Heroku Link](https://todos-node-app.herokuapp.com/)

## Hosted on Microsoft Azure
[Azure Link](https://postgres-express-node-todos.azurewebsites.net)

## Notes

All routes apart from `auth/login` and `auth/signup` require Authorization using a JSON Web Token

Add an authorization header with the token

`'Authorization': 'Bearer token'`

## Author

*   **Ryan Simiyu** 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
