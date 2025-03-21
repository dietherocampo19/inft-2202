const express = require('express');
const app = express();
const port = 5000;

app.use(express.static('public')); // Serve static files from the 'public' directory

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});