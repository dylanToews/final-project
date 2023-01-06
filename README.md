To set up db: 


psql
SET ROLE labber;
CREATE DATABASE finals; 
\q
npm run db:reset

------------------

to start server:

cd server 
nodemon

(server should start on port 8080)


-------------------

to start client:

cd client 
npm start 

(client should start on port 3000)


