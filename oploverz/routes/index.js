const express = require('express');
const router = express.Router();
const {
  latest,
  latest_update,
  searchOld,
  search,
  detail,
  download,
  popular_today
} = require('../api/OploverzController')

router.get("/home", latest);
router.get("/ongoing", latest_update);
router.get("/popular", popular_today);
router.get("/search", searchOld);
router.get("/detail", detail);
router.get("/episode", download);

module.exports = router;