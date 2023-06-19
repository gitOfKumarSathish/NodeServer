const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.get('/data', (req, res) => {
  // Read the output.json file
  const output = require('./jsonformatter.json');

  // Extract the data array from the output object
  const dataArray = output.data[1].data;

  // Get the limit from the URL parameter, or set a default value
  const from = parseInt(req.query.from) || 0;
  const to = parseInt(req.query.to) || 1000;

  // Create a new limitedData array with the desired size
  const limitedData = dataArray.slice(from, to);

  // Send the limitedData as the response
  res.json({ data: limitedData });
});

app.get('/annotation', (req, res) => {
  // Read the output.json file
  const output = require('./jsonformatter.json');

  // Extract the data array from the output object
  const ann = output.data.filter(x => x.channel === 'annot');
  // Send the limitedData as the response
  res.json({ data: ann });
});

app.get('/volume', (req, res) => {
  // Read the output.json file
  const output = require('./jsonformatter.json');

  // Extract the data array from the output object
  const volume = output.data.filter(x => x.channel === 'volume');
  // Send the limitedData as the response
  res.json({ data: volume });
});

app.get('/', (req, res) => {
  // Read the output.json file
  const output = require('./jsonformatter.json');

  // Send the limitedData as the response
  res.json({ data: output.data });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
