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

app.get('/nodenote/stories', (req, res) => {
  res.send(storyData); 
});

app.get('/nodenote/audio', (req, res) => {
  res.send(audioData);
});

app.post('/nodenote/audio', (req, res) => {
  try {
    const newAudio = req.body;
    
    // Here, you can choose how you want to handle the newAudio data
    // For example, you can store it in a variable, process it, or simply respond with it
    console.log('Received new audio data:', newAudio);
    
    res.status(201).json({ message: 'Audio data added successfully', data: newAudio });
  } catch (error) {
    console.error('Error adding audio data:', error);
    res.status(500).json({ error: 'An error occurred while adding audio data' });
  }
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
