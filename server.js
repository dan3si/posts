const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const server = express();
const port = 5000;

server.use(express.static(__dirname + '/frontend'));

server.post('/data', bodyParser.text(), (req, res) => {
  let data = JSON.parse(fs.readFileSync(`${__dirname}/api/data.json`));
  const { title, description, image } = JSON.parse(req.body);

  data = [
    {
      title,
      description,
      image,
    },
    ...data,
  ];

  fs.writeFileSync(`${__dirname}/api/data.json`, JSON.stringify(data));
  res.send('ok');
});

server.get('/data', (req, res) => {
  res.send(fs.readFileSync(`${__dirname}/api/data.json`));
});

server.listen(port, () => console.log(`Server is running on port ${port}`));
