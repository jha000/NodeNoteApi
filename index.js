const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

const storyData = require('./json/stories.json');
const seriesData = require('./json/series.json');
const categoriesData = require('./json/categories.json');
const episodesData = require('./json/episodes.json');
const sliderData = require('./json/slider.json');
const tokenData = require('./json/tokenplan.json');

app.get('/', (req, res) => {
  res.send('Welcome to the Audio Content Platform API');
});

app.get('/stories', (req, res) => {
  const { preference } = req.query;

  if (preference) {
    const categoryStories = storyData.filter(story => story.preference === preference);
    res.json(categoryStories);
  } else {
    res.json(storyData);
  }
});


app.post('/stories', (req, res) => {
  const newStory = req.body;
  if (!newStory.mediaTitle || !newStory.mediaDescription) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  storyData.push(newStory);
  res.status(201).json({ message: 'Story created', data: newStory });
});


app.get('/series', (req, res) => {
  res.send(seriesData);
});

app.post('/audio', (req, res) => {
  const newAudio = req.body;
  if (!newAudio.mediaUrl || !newAudio.audioTitle) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  seriesData.push(newAudio);
  res.status(201).json({ message: 'Audio created', data: newAudio });
});


app.get('/categories', (req, res) => {
  res.send(categoriesData);
});

app.post('/categories', (req, res) => {
  const newCategories = req.body;
  if (!newCategories.thumbnailUrl || !newCategories.covermetaImageUrl) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  categoriesData.push(newCategories);
  res.status(201).json({ message: 'Categories created', data: newCategories });
});

app.get('/episodes', (req, res) => {
  const seasonId = req.query.seasonId; // Get the seasonId parameter from the request query

  // Filter episodes with the specified seasonId
  const filteredEpisodes = episodesData.filter(episode => episode.seasonId === parseInt(seasonId));

  res.json(filteredEpisodes); // Send the filtered episodes as JSON response
});

app.post('/episodes', (req, res) => {
  const newEpisodes = req.body;
  if (!newEpisodes.mediaUrl || !newEpisodes.audioTitle) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  episodesData.push(newEpisodes);
  res.status(201).json({ message: 'Episodes created', data: newEpisodes });
});

app.get('/slider', (req, res) => {
  res.send(sliderData);
});

app.post('/slider', (req, res) => {
  const newSlider = req.body;
  sliderData.push(newSlider);
  res.status(201).json({ message: 'Slider created', data: newSlider });
});

app.get('/tokenplan', (req, res) => {
  res.send(tokenData);
});

app.post('/tokenplan', (req, res) => {
  const newToken = req.body;
  tokenData.push(newToken);
  res.status(201).json({ message: 'Token created', data: newToken });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});