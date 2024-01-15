const express = require('express');
const cors = require('cors');
// const mysql = require('mysql');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


const booksData = require('./json/books.json');
const catalogueData = require('./json/catalogue.json');
const categoryData = require('./json/category.json');


const listData = require('./json/mediaList.json');
const seriesData = require('./json/series.json');
const categoriesData = require('./json/categories.json');
const episodesData = require('./json/episodes.json');
const sliderData = require('./json/slider.json');
const activeData = require('./json/seasonActiveList.json');
const mediaData = require('./json/getMedia.json');
const musicSeriesData = require('./json/musicSeries.json');
const musicSingleData = require('./json/musicSingle.json');
const recentData = require('./json/recent.json');

app.get('/books', (req, res) => {
  res.json(booksData);
});

app.get('/catalogue', (req, res) => {
  res.json(catalogueData);
});

app.get('/category', (req, res) => {
  res.json(categoryData);
});

// Endpoint for searching books by title
app.get('/books/search', (req, res) => {
  const queryTitle = req.query.title;

  if (!queryTitle) {
    return res.status(400).json({ error: 'Title query parameter is required' });
  }

  const matchingBooks = booksData.filter(book => book.title.toLowerCase().includes(queryTitle.toLowerCase()));

  res.json(matchingBooks);
});

app.get('/', (req, res) => {
  res.send('Welcome to the Audio Content Platform API');
});

app.post('/data/:userToken', (req, res) => {
  const { userToken } = req.params;
  const data = req.body;

  if (!recentData[userToken]) {
    recentData[userToken] = [];
  }

  recentData[userToken].push(data);
  res.status(201).json({ message: 'Data added successfully' });
});

// Get User Data endpoint with user token in the URL
app.get('/data/:userToken', (req, res) => {
  const { userToken } = req.params;
  const userSpecificData = recentData[userToken] || [];

  res.status(200).json(userSpecificData);
});


app.get('/mediaList', (req, res) => {
  const { preference } = req.query;

  if (preference) {
    const categoryStories = listData.filter(story => story.preference === preference);
    res.json(categoryStories);
  } else {
    res.json(listData);
  }
});

app.get('/search', (req, res) => {
  const query = req.query.q;

  if (query) {
    const filteredMedia = listData.reduce((acc, category) => {
      const filteredCategoryMedia = category.media.filter(item =>
        item.mediaTitle.toLowerCase().includes(query.toLowerCase())
      );
      if (filteredCategoryMedia.length > 0) {
        acc.push(...filteredCategoryMedia);
      }
      return acc;
    }, []);

    res.json(filteredMedia);
  } else {
    const mediaData = data.map(category => category.media);
    const allMedia = [].concat(...mediaData);
    res.json(allMedia);
  }
});


app.get('/media/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const mediaCategory = listData.find(category => category.id === id);

  if (!mediaCategory) {
    return res.status(404).json({ error: 'Category not found' });
  }

  res.json(mediaCategory.media);
});

app.get('/musicSeries', (req, res) => {
  const { audioTitle, id } = req.query;

  // Find the data object that matches the given audioTitle and id
  const matchedData = musicSeriesData.find(item => item.audioTitle === audioTitle && item.id === parseInt(id));

  if (matchedData) {
    res.json(matchedData);
  } else {
    res.status(404).json({ error: "Data not found" });
  }
});


app.post('/stories', (req, res) => {
  const newStory = req.body;
  if (!newStory.mediaTitle || !newStory.mediaDescription) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  listData.push(newStory);
  res.status(201).json({ message: 'Story created', data: newStory });
});


app.get('/series', (req, res) => {
  res.send(seriesData);
});

app.get('/slider', (req, res) => {
  res.send(sliderData);
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


app.get('/slider', (req, res) => {
  res.send(sliderData);
});

app.post('/slider', (req, res) => {
  const newSlider = req.body;
  sliderData.push(newSlider);
  res.status(201).json({ message: 'Slider created', data: newSlider });
});

app.get('/seasonActiveList', (req, res) => {
  const meadiaId = req.query.id; // Get the seasonId parameter from the request query

  // Filter episodes with the specified seasonId
  const filteredEpisodes = activeData.filter(episode => episode.id === parseInt(meadiaId));

  res.json(filteredEpisodes);
});


app.get('/musicSingle', (req, res) => {
  const musicId = req.query.id; // Get the musicId parameter from the request query

  // Filter episodes with the specified musicId
  const filteredEpisodes = musicSingleData.filter(episode => episode.id === parseInt(musicId));

  if (filteredEpisodes.length === 1) {
    // If only one episode matches the musicId, send that single episode
    res.json(filteredEpisodes[0]);
  } else {
    // If multiple episodes match the musicId or none match, send the filtered array
    res.json(filteredEpisodes);
  }
});


app.get('/mediaData', (req, res) => {
  const meadiaId = req.query.id; // Get the seasonId parameter from the request query

  // Filter episodes with the specified seasonId
  const filteredEpisodes = mediaData.filter(episode => episode.id === parseInt(meadiaId));

  res.send(filteredEpisodes);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
