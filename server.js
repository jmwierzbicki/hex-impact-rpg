const express = require('express');
const path = require('path');

const app = express();

// Serve static files...
app.use(express.static(__dirname + '/dist/hex-impact-rpg/browser'));

// If no URL matches, Send all requests to index.html
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/hex-impact-rpg/browser/index.html'));
});

// default Heroku port or localhost
app.listen(process.env.PORT || 5000);
console.log('app listening on ', process.env.PORT || 5000)
