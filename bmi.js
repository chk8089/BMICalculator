const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'bmi.html'));
});

app.post('/calculate-bmi', (req, res) => {
  try {
    console.log(req.body);
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height) / 100;
    const bmi = weight / (height * height);

    res.json({ bmi: bmi.toFixed(1) });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred on the server.");
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
