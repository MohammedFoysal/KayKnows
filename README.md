# KayKnows

KayKnows presents the new design for the career lattice, no longer will you have to look at a table. Now you can navigate the career ladder with a wonderful tree!!!!

## Setup the Database

+ Navigate to the `KayKnows-database` directory.

+ Open a mysql environment and run the `knows_db_tables.sql` file to setup the development/production database.

+ In the same environment run the `knows_test_db.sql` file to set up the test database.

+ Make a user that has permissions to `SELECT` for the generated tables.

+ If you want the development database to be populated with some dummy data run the `chunky_dummy.sql` file.

## How to Run

### Running Express

To run express first make sure that the database is [setup](#setup-the-database).

+ To run express first navigate to the `KayKnows-backend` directory.

+ Then ensure that npm is set up by running

  ```shell
  npm install
  ```

+ Ensure that a `config.env` file is located within the directory with the following content:

  ```shell
  cp config.env.example config.env
  ```

  ```properties
    DB_HOST=localhost
    DB_USER=database_user
    DB_PASS=database_password
    DB_DATABASE=database_name
    DB_TEST_DATABASE=test_database_name

    AUTH_SECRET=auth_client_secret_here
  ```

+ Install [nodemon](https://github.com/remy/nodemon)

+ To start express run

  ```shell
  npm start
  ```

### Running Angular

To ensure that data is being transfered make sure that you follow the steps to [run express](#running-express) and [setup mysql](#setup-the-database).

+ To run angular first navigate to the `KayKnows-frontend` directory.

+ Ensure that everything is setup by running:
  
  ```shell
  npm install
  ```

+ To start the application run:
  
  ```shell
  npm start
  ```

## How to Test

### Testing Express

To test express first ensure that the database is setup from the [mysql section](#setup-the-database).

+ Set up npm with:

  ```shell
  npm install
  ```

+ Run with:

  ```shell
  npm test
  ```

+ A HTML report is generated in the `results` directory

### Testing Angular

When testing the angular front end ensure that express is [setup and running](#running-express).

+ Ensure that everything is installed with:
  
  ```shell
  npm install
  ```

+ To start the tests run:

  ```shell
  ng test
  ```

## API Document Generator

Install your generator of choice, this guide will assume that you are using [raml2html](https://github.com/raml2html/raml2html).

From the root directory run the following command:

```shell
raml2html -i kayknows_api.raml -o kayknows_api.html
```

The generated file can then be viewed. Whilst the generated file can be called anything, to ensure that it is still ignored by the `.gitignore` make sure that the name of the file is `kayknows_api`.
