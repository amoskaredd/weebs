const express = require('express');
const cors = require('cors');
const routes = require('./routes/index.js');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use("/api", routes);

app.use("/", (req, res) => {
  res.json({
    host: req.protocol + "s://" + req.get("host"),
    message:
      "Please read the documentation at https://github.com/"
  });
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

//exports.Homepage = require('./api/homepage');
//exports.Search = require('./api/search');
//exports.GenreSearch = require('./api/genreSearch');
//exports.Popular = require('./api/popular');
//exports.Season = require('./api/musim');
//exports.Movie = require('./api/movie');