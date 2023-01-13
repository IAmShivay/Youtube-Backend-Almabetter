# Youtube-Backend-Almabetter

This project utilizes NodeJS, Express, MongoDB Atlas, and Mongoose to create a backend system. By utilizing specific routes in the URL, users have the ability to retrieve the number of subscribers, and access individual subscribers by their unique ID.

## Features

- Fetch all subscribers from remotely hoisted database
- Fetch specific data from database via a route like all subscribers , name and subscribers, get the name of the subscribers via unique ID 

1. First **install npm dependencies** of **express** and **mongoose** using `npm install -A` command.
2. **Create database in your local computer** using `node src/createDatabase.js` command.
3. **Start the backend server** using `npm start` or `node index.js` command. 
3. **For checking test cases ** using `npm run tests`.

## HTTP request methods used in the project
1. GET [http://localhost:3000/subscribers](http://localhost:3000/subscribers) to get array of subscribers.

2. GET [http://localhost:3000/subscribers/names](http://localhost:3000/subscribers/names) to get array of subscribers with only name and subscribedChannel fields.

3. GET [http://localhost:3000/subscribers/:id](http://localhost:3000/subscribers/:id) to get a subscriber by its unique id.
