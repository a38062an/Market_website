## Cristian Preda @ 1st Feb 2024
Database commit:
- created first iteration of database schema
- set up database migration for the database
- added 2 more node packages for server side: db-migrate, db-migrate-pg
- be sure to run `npm install` after pulling this commit on the server side
- be sure to have the unihive database and user in postgres
- run the following command to install the tables in the database: `db-migrate up`
- run the following command to delete the tables from the database: `db-migrate down`
- alternate command to delete the tables from the database: `db-migrate reset`

## Cristian Preda @ 2nd Feb 2024
RESTFUL API commit:
- make sure to run these commands after pulling this commit on the server side: `npm install`, `db-migrate down`, `db-migrate up`.
- renamed index.js to app.js. To run the server, use the following command: `nodemon app.js`
- added the first iteration of the RESTFUL API
- to send a request to the server, use the following URL: `http://localhost:5000/api/route/`, where route is the name of the route e.g `http://localhost:5000/api/users/`
- use Postman to send requests to the server and test the API. The server is not yet connected to the frontend
- added skeleton for the following route: messages
- some minimal database changes. Includes: changing some foreign key references between report and review tables. Changing the type of money attributes from integer to decimal(2.dp).