# Bookaroo

A personal simple project to showcase some of my knowledge regarding several fundamental programming topics learned so far, such as:

- databases
- routing
- http requests
- structuring (models, services)

Please note that the styling has been kept at a minimal/basic/outdated format as I'm prioritizing the above mentioned topics.
I might restyle and restructure the whole project once I've gotten handy with a FED framework such as React for example.

## Installation & Use

- Download the main branch of the repository with all its documents and export them to a new folder.

- Open the new folder in VScode and make sure you are in its root.

- Open the VScode terminal and run `NPM install` to make sure that all dependencies are installed and up to date.

- Start a local instance of mySql (I used mySql workbench) and with a SQL query, create a new database, example:

```
CREATE DATABASE hotelproject;
```

- Add a .env file into your main root (at the same level as app.js) and add and save the following lines in it (make sure to add your relevant data):

```
ADMIN_USERNAME = "yourAdminUser"
ADMIN_PASSWORD = "yourPassword"
DATABASE_NAME = "yourNewlyCreatedDatabaseName"
DIALECT = "mysql"
PORT = "3000"
HOST = "localhost"
```

if you don't have a personal admin user with admin permissions for such databse you can create one with a query, example:

```
CREATE USER yourAdminUser@localhost IDENTIFIED WITH mysql_native_password BY 'yourPassword';
GRANT ALL ON yourNewlyCreatedDatabaseName.* TO 'yourAdminUser'@'localhost';
```

- Now, you can go back to VScode and run `NPM start` in your terminal. This will start the server and will trigger the creation of the database tables (/models).
  The creation of such tables will happen only if they do not already exist in that specific database, avoiding overwriting of existing tables.

- Going forward, you can choose 2 ways of populating your DBs tables:

  - you can sign in from the /signin page, therafter find the user you created in the user table of your mySql database and change its role to 'Admin' and apply the changes.
    (by default, created users have the role of 'User' and only a user with 'Admin' role can operate the add and delete features in the website, plus only admins can see a full list of every user and their reservations)
    Now, as you are logged in as an Admin user, you can start adding all the data you want to in your DB, directly from the website.
  - you can otherwise populate some of the tables using sql queries, example:

  ```
  adding hotels:
  INSERT INTO yourNewlyCreatedDatabaseName.hotels (Name, Location) VALUE
  ('Hilton', 'Malta'),
  ('Best Western', 'Nice'),
  ('Radisson', 'London');

  adding rooms to the respective hotels:
  INSERT INTO yourNewlyCreatedDatabaseName.rooms (PricePerDay, Capacity, HotelId) VALUE
  (90, 2, 1),
  (110, 4, 1),
  (78, 2, 2),
  (140, 6, 2),
  (70, 2, 3),
  (65, 1, 3);

  adding a reservation to user with id 1:
  INSERT INTO yourNewlyCreatedDatabaseName.reservations (StartDate, EndDate, RoomId, UserId) VALUE
  ('2023-10-01 10:00:00', '2023-10-05 10:00:00', 3, 1);

  Please note that adding users with queries will create issues when attempting a login, as passport is
  set up to use unique password encryption and salting(which would need to match upon validation).
  ```

- We also need to add a stored procedure to the database in order to be able to add reservations through the rentARoom method from /services/RoomService (which is the one in use when making a reservation from the website). In mySQL workbench, add it with the following query (remember to change the databse and user names):

```
DELIMITER $$
USE `yourNewlyCreatedDatabaseName`$$
CREATE DEFINER=`yourAdminUser`@`localhost` PROCEDURE `insert_reservation`(_UserId INT, _RoomId INT, _StartDate DATETIME, _EndDate DATETIME)
BEGIN
INSERT INTO Reservations
SET UserId = _UserId, RoomId = _RoomID,  StartDate = _StartDate, EndDate = _EndDate;
END$$

DELIMITER ;
;
```

In this small project, I've decided to let each user have the possibility to book multiple rooms from multiple hotels, but as it is set up, it is only allowing one booking per specific room. Attempting to book thye same room for equal or different dates will not overwrite the booking and will not add a new booking either.

- Users with a User role can browse the entire website apart from seeing the users page. They can filter their search in each page and they can see a list of all reservations they have. They will not be able to see or use the add and delete buttons in each page, but they will be able to make reservations and/or give a rating to a hotel.

- Users with an Admin role can perform all the exact same actions a User can, plus they can add and delete hotels/rooms/users (Admin users can't be deleted, unless they are deleted manually from the database).

- Guest users have limited access to the website. They can view the hotels and rooms pages, they can view hotel ratings through thew details button, but can't rent a room.

## Dependencies/frameworks/languages in use

For routing and HTTP requests:

- Express: ( a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications)

For managing/styling the frontend:

- EJS: (a templating engine for javascript)
- Bootstrap: (a respnsive website and mobile first CSS framework)

Middlewares for parsing/handling errors and more:

- cookie-parser (a middleware that parses cookies attached to the client request object)
- body-parser (an npm module used to process data sent in an HTTP request body.
  It provides four express middleware for parsing JSON, Text, URL-encoded, and raw data sets over an HTTP request body.)
- morgan (a middleware to log HTTP requests and errors)
- debug (Express uses the debug module internally to log information about route matches, middleware functions that are in use, application mode, and the flow of the request-response cycle. debug is like an augmented version of console.)
- http-errors (generating errors for node.js applications)
- fs and path (file system module and path modules, used to acces/read/write files and paths)

For login, seessions, authentication and database management:

- express-session (an HTTP server-side framework used to create and manage a session middleware.)
- express-session-json (a JSON file session storage for ExpressJS.)
- passport (an authentication middleware for Node.js.)
- passport-local ( a local username and password authentication strategy for Passport.)
- crypto (Crypto is a module in Node. js which deals with an algorithm that performs data encryption and decryption.)
- sqlite3 (a relational database for node.js)
- connect-sqlite3 (a sqlite3 session store)
- mysql2 (a mysql client for node.js with focus on performance, based upon the popular mysql package)
  . sequelize (an easy-to-use and promise-based Node.js ORM tool for MySQL (and many other))
- dotenv (for loading of environment variables stored in a.env file)

# How the app works

1 - the first process of this app is to create tables in a given database. This happens thanks to sequelize and through the models files where each file exports a defined table and its relationships.
Each exported table is processed and added to the database thanks the models/index.js file that also exports the database, all models are then synced from the app.js file.

2 - express router is used to handle all get/post/delete requests: - In routes/auth.js all signup and login requests are handled.
The login authentication is processed through passports localStrategy, which also uses an asynchronous method from /services/userService.js to find the user that is attempting to login. - In routes/authMiddleware.js authorization methods are exported. Those are used to check for example if a user has a User role or an Admin role, or even if a person using the webapp is user at all. - In hotel.js/index.js/reservations.js/rooms.js/users.js from the /routes folder, handles and renders(with data read from the db) all the http request.
They also often use methods from files within /services and also have operators conditions set with the Op from sequelize.

3 - in the /views folder, there are .ejs files that are being rendered with the http requests.
Files from the /views/partials folder are included in each .ejs file to avoid code repetition.
All requests that are sent from the clients' side work through asynchronous methods from /public/javascript/managing.js.
Such file also holds methods enabling the filtering of the search bars.

4 - styling is either set through /public/stylesheets/style.css or by bootstrap code added in the tags within .ejs files.

## Support

For any issues and queries regarding the application please contact the developer at:
baldithomas@hotmail.it

## Authors

Thomas Baldi
