[![Build Status](https://travis-ci.org/Raywire/postgres-express-node.svg?branch=develop)](https://travis-ci.org/Raywire/postgres-express-node)
[![Coverage Status](https://coveralls.io/repos/github/Raywire/postgres-express-node/badge.svg?branch=develop)](https://coveralls.io/github/Raywire/postgres-express-node?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/af62aca2e06bd8f4da6f/maintainability)](https://codeclimate.com/github/Raywire/postgres-express-node/maintainability)

# postgres-express-node
Todo list backend API using express

Project: Todo List
Description:This app enables you to create Todos and add items to them.

## Getting Started

git clone the repo

### Prerequisites

Two postgres databases are required one for testing the other for development

**Setting up the database with a user who has all privileges**
```
sudo -u postgres psql
postgres=# create database your-database;
postgres=# create user your-username with encrypted password 'your-password';
postgres=# grant all privileges on database your-database to your-username;
```
### Contents of .env file

```
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

## Built With

*   [Express](https://expressjs.com/) - Express
*   [NodeJS](https://nodejs.org/) - NodeJS
*   [PostgreSQL](https://postgresql.org/docs/) - PostgreSQL
*   [Passport](http://passportjs.org) - Passport

## API Endpoints

versioning for the endpoints
/api/

## API Documentation
[Postman API Documentation](https://documenter.getpostman.com/view/6831940/SVYtNdfm)

```json
POST http://127.0.0.1:8001/auth/signup

POST http://127.0.0.1:8001/auth/login

GET http://127.0.0.1:8001/api/todos/

POST http://127.0.0.1:8001/api/todos/

GET http://127.0.0.1:8001/api/todos/<id>

PUT http://127.0.0.1:8001/api/todos/<id>

DELETE GET http://127.0.0.1:8001/api/todos/<id>

POST http://127.0.0.1:8001/api/todos/<id>

PUT http://127.0.0.1:8001/api/todos/<id>/items/<todoItemId>

DELETE http://127.0.0.1:8001/api/todos/<id>/items/<todoItemId>
```

### Hosted on Heroku
[Heroku Link](https://todos-node-app.herokuapp.com/)

### Notes

All routes apart from /login and /signuprequire Authorization using a Bearer Token

## Author

*   **Ryan Simiyu** 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
