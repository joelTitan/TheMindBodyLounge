const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public'), {
  extensions: ['html'],
  setHeaders: (res, file) => {
    if (/\.(css|js)$/.test(file)) res.setHeader('Cache-Control', 'no-cache');
  }
}));

app.listen(PORT, () => {
  console.log(`The Mind Body Lounge listening on port ${PORT}`);
});
