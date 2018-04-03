// Node.js notation for importing packages
const express = require('express');
const port = process.argv[2] || 9000;

// Spin up a server
const app = express();

// Serve static files from the main directory
app.use(express.static(__dirname + '/build/bundled'));


//  ____________________________________
// |                                    |
// |       Setting up Page Routes       |
// |____________________________________|
//

app.get('/dist/*', function(req, res) {
  res.sendFile(req.url + '.js', { root: __dirname });
});

app.get('*', function(req, res) {
  res.sendFile(req.url, { root: __dirname });
});

// Tell the app to listen for requests on port 3000
app.listen(port, function () {
  console.log('em-todo demo server http://localhost:9000/');
});