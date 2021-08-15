# multi-user-task-manager-backend
This repository provides a back-end for a multi-user task manager web application.

# Requirements
Node >= 12.0.0

# Starting the project
* Make a pull of this repository and install dependencies `npm install`.
* Running `docker-compose up`to up the app and test database.
* Running `npm start`.


# Testing
* Running `npm test` (Ensure the database is up)


# Database
* When you start the application the prestart script run the migrations, but if you haven't done that yet, you can run them by running `npm run migration:up`.
* Run the command `npm run seed:run` to get a sample of the data
* you can view them using mysql's built-in admin.
   address: http://localhost:8080/
   username: user
   password: user
   database: task-manager
