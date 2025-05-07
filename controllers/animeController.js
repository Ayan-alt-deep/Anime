const animeData = require("../animeData");

exports.listAnime = (req, res) => {
  const animeNames = Object.values(animeData).map((a) => a.title);
  const message = `🎌 Anime Available:\n\n${animeNames.map((n, i) => `${i + 1}. ${n}`).join("\n")}`;
  res.json({ message });
};

exports.listSeasons = (req, res) => {
  const anime = req.params.anime;
  if (!animeData[anime]) return res.status(404).json({ error: "Anime not found" });
  res.json({ seasons: animeData[anime].seasons });
};

exports.listEpisodes = (req, res) => {
  const { anime, seasonId } = req.params;
  const target = animeData[anime];
  if (!target) return res.status(404).json({ error: "Anime not found" });

  const season = target.seasons.find((s) => s.id === seasonId);
  if (!season) return res.status(404).json({ error: "Season not found" });

  res.json({ episodes: season.episodes });
};

exports.addEpisode = (req, res) => {
  const { anime, season, videoUrl, addedBy } = req.body;
  if (!animeData[anime]) {
    animeData[anime] = {
      title: anime,
      seasons: []
    };
  }

  let targetSeason = animeData[anime].seasons.find((s) => s.id === season);
  if (!targetSeason) {
    targetSeason = { id: season, title: season, episodes: [] };
    animeData[anime].seasons.push(targetSeason);
  }

  const newEpisode = {
    id: `ep${targetSeason.episodes.length + 1}`,
    title: `Episode ${targetSeason.episodes.length + 1}`,
    videoUrl,
    thumbnail: "https://i.imgur.com/nt7KJfi.jpeg"
  };

  targetSeason.episodes.push(newEpisode);
  res.json({ message: `✅ Added: ${newEpisode.title}` });
};
