const express = require("express");
const subscribersSchema = require("./models/subscribers"); //importing subscriber schema
const { ObjectId } = require("mongodb");

const app = express();

// Get route to retrieve all subscriber names
app.get("/subscribers/names", async (req, res) => {
  try {
    // Retrieve all subscribers and exclude the __v field, which is MongoDB's internal version field
    const subscribers = await subscribersSchema.find().select("name -_id");
    // If no subscribers were found, return a 404 status code with a message
    if (!subscribers) {
      res.status(404).json({ message: "No subscribers found." });
    } else {
      // Otherwise, return a 200 status code with the subscribers' names
      res.status(200).json(subscribers);
    }
  } catch (error) {
    // If an error occurred while retrieving the subscribers, return a 500 status code with a message
    res
      .status(500)
      .json({ message: "An error occurred while retrieving subscribers." });
  }
});

//Get route to retrieve all subscriber names and names only
app.get("/subscribers", (req, res) => {
  // Retrieve all subscribers and only the 'name' field
  subscribersSchema.find({}, "name", (err, subscribers) => {
    if (err) {
      //If error occurs, return a 500 status code with error message
      res.status(500).json({ error: "Error retrieving subscriber names" });
    } else {
      // otherwise return a 200 status code with the subscriber names
      res.status(200).json(subscribers.map((s) => s.name));
    }
  });
});

// Get route to retrieve a specific subscriber by ID
app.get("/subscribers/:id", (req, res) => {
  // Check if the provided ID is valid
  if (ObjectId.isValid(req.params.id)) {
    // Retrieve the subscriber with the provided ID
    subscribersSchema.findById(req.params.id, (err, subscriber) => {
      if (err) {
        // If an error occurs, return a 500 status code with a message
        res.status(500).json({
          error: `Error in fetching data with id ${req.params.id}`,
        });
      } else {
        // Check if a subscriber was found
        if (subscriber) {
          // If a subscriber was found, return a 200 status code with the subscriber
          res.status(200).json(subscriber);
        } else {
          // If a subscriber was not found, return a 404 status code with a message
          res.status(404).json({ message: "Subscriber not found." });
        }
      }
    });
  } else {
    // If the provided ID is not valid, return a 400 status code with a message
    res.status(400).json({ error: "Invalid subscriber ID." });
  }
});

module.exports = app;

module.exports = app;
