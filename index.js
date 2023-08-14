const express = require('express');
const cors = require('cors');
const app = express(); 

app.use(cors());

const PORT = process.env.PORT || 3000;

const storyData = require('./json/stories.json'); 
const audioData = require('./json/audio.json'); 
const categoriesData = require('./json/categories.json'); 
const episodesData = require('./json/episodes.json'); 
const sliderData = require('./json/slider.json'); 
const tokenData = require('./json/tokenplan.json'); 

app.get('/', (req, res) => {
  res.send('Welcome to the Audio Content Platform API');
});

app.get('/nodenote/stories', (req, res) => {
  res.send(storyData); 
});

app.get('/nodenote/audio', (req, res) => {
  res.send(audioData);
});

app.get('/nodenote/categories', (req, res) => {
  res.send(categoriesData); 
});

app.get('/nodenote/episodes', (req, res) => {
  res.send(episodesData); 
});

app.get('/nodenote/slider', (req, res) => {
  res.send(sliderData); 
});

app.get('/nodenote/tokenplan', (req, res) => {
  res.send(tokenData); 
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
