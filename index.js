const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/data', (req, res) => {
  // Read the output.json file
  const output = require('./output.json');

  // Extract the data array from the output object
  const dataArray = output.data[1].data;

  // Get the limit from the URL parameter, or set a default value
  const limit = parseInt(req.query.limit) || 1000;

  // Create a new limitedData array with the desired size
  const limitedData = dataArray.slice(0, limit);

  // Send the limitedData as the response
  res.json({ data: limitedData });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
