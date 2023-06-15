const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/data", (req, res) => {
  // Get the limit from the URL parameter, or set a default value
  const limit = parseInt(req.query.limit) || 1000;

  // Read the output.json file
  let output = require("./output.json");
  //sliced only three data ---- annot,wf,plc
  output.data = output.data.slice(0, 3); //[ 'annot', 'wf', 'plc' ]

  // Extract the data array from the output object
  const wf = output.data[1].data;

  // Extract the data array from the output object
  const plc = output.data[2].data;

  // Create a new limitedData array with the desired size
  const wflimit = wf.slice(0, limit);
  // Create a new limitedData array with the desired size
  const plclimit = plc.slice(0, limit);

  output.data[1].data = wflimit;
  output.data[2].data = plclimit;

  // Send the limitedData as the response
  res.json({ data: output.data });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
