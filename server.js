const path = require('path');
const webpack = require('webpack');
const express = require('express');
const config = require('./webpack.config.js');

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  historyApiFallback: true,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/static', express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, (err) => {
  if (err) {
    return console.error(err);
  }

  console.log('Listening at http://localhost:3000/');
});
