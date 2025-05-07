const express = require("express");
const router = express.Router();
const {
  listAnime,
  listSeasons,
  listEpisodes,
  addEpisode
} = require("../controllers/animeController");

router.get("/list", listAnime);
router.get("/:anime/seasons", listSeasons);
router.get("/:anime/seasons/:seasonId/episodes", listEpisodes);
router.post("/add", addEpisode);

module.exports = router;
