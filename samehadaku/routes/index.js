const express = require('express');
const {
  allAnime,
  allAnimeMovie,
  allBatch,
  allGenres,
  animeSchedule,
  detailAnime,
  detailBatch,
  home,
  ongoingAnime,
  searchAnime,
  showEpisode,
  showGenre,
  showProducer,
  showSeason,
  showStudio,
} = require('../controllers/anime.js')

const router = express.Router();

router.get("/home", home);

router.get("/anime", allAnime);
router.get("/anime/page/:page", allAnime);
router.get("/detail", detailAnime); //query url

router.get("/episode", showEpisode); //query url

router.get("/ongoing", ongoingAnime);
router.get("/ongoing/page/:page", ongoingAnime);

router.get("/schedule", animeSchedule);

router.get("/genres", allGenres);
router.get("/genres/:id", showGenre);
router.get("/genres/:id/page/:page", showGenre);

router.get("/allbatch", allBatch);
router.get("/batch/page/:page", allBatch);
router.get("/batch", detailBatch); //query url

router.get("/movie", allAnimeMovie);
router.get("/movie/page/:page", allAnimeMovie);

router.get("/search", searchAnime); //query query

router.get("/studio", showStudio);
router.get("/studio/:id/page/:page", showStudio);

router.get("/producer", showProducer);
router.get("/producer/:id/page/:page", showProducer);

router.get("/season", showSeason);
router.get("/season/:id/page/:page", showSeason);

/*
router.get("*", (req, res) => {
  res.status(404).send({
    message:
      "Please read the documentation at https://github.com/Hanivan/restAPI-Samehadaku",
  });
});
*/

module.exports = router;
