const express = require('express');
const cors = require('cors');
const app = express(); // Using "app" for the Express app instance

app.use(cors());

const PORT = process.env.PORT || 3000;

// Importing the sample story data from storiesapi.json
const storyData = require('./json/storiesapi.json'); // Use "storyData" for the imported JSON data

// Defining a route to get all stories
app.get('/nodenote/stories', (req, res) => {
  res.send(storyData); // Using "storyData" to send the JSON response
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
