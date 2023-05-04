const express = require('express');

const router = express.Router();

let {
  search,
  download
} = require('../api/anime')

router.get("/search", search); //query query
router.get("/download", download); //query url

module.exports = router;
