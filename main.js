const express = require('express');
const cors = require('cors');
const app = express();

const routeAnibatch = require("./anibatch/routes/index.js")
const routeSamehadaku = require("./samehadaku/routes/index.js")
const routeOtakudesu = require("./otakudesu/routes/index.js")
const routeOploverz = require("./oploverz/routes/index.js")

app.use(cors());
app.set('json spaces', 2)

app.get('/', (req, res) => {
  let baseUrl = `https://${req.get('host')}`
  res.json({
    baseURL: baseUrl,
    runtime: new Date(process.uptime() * 1000).toTimeString().split(' ')[0],
    endpoint: {
      anibatch: {
        search: `${baseUrl}/anibatch/search?query=spy`,
        download: `${baseUrl}/anibatch/download?url=https://anibatch.anibatch.moe/spy-x-family/`
      },
      samehadaku: {
        home: `${baseUrl}/samehadaku/home`,
        ongoing: `${baseUrl}/samehadaku/ongoing/page/1`,
        search: `${baseUrl}/samehadaku/search?query=bleach`,
        anime_detail: `${baseUrl}/samehadaku/detail?url=https://samehadaku.win/anime/bleach-sennen-kessen-hen/`,
        anime_episode: `${baseUrl}/samehadaku/episode?url=https://samehadaku.win/bleach-sennen-kessen-hen-episode-1/`,
        list_anime: `${baseUrl}/samehadaku/anime/page/1`,
        list_movie: `${baseUrl}/samehadaku/movie/page/1`,
        list_batch: `${baseUrl}/samehadaku/batch/page/1`,
        detail_batch: `${baseUrl}/samehadaku/batch?url=https://samehadaku.win/batch/bleach-sennen-kessen-hen-episode-1-13-batch/`
      },
      oploverz: {
        home: `${baseUrl}/oploverz/home`,
        ongoing: `${baseUrl}/oploverz/ongoing`,
        popular: `${baseUrl}/oploverz/popular`,
        search: `${baseUrl}/oploverz/search?query=bleach`,
        anime_detail: `${baseUrl}/oploverz/detail?url=https://15.235.11.45/anime/bleach/`,
        anime_episode: `${baseUrl}/oploverz/episode?url=https://15.235.11.45/bleach-episode-379-subtitle-indonesia/`,
      },
      otakudesu: {
        ongoing: `${baseUrl}/otakudesu/ongoing/page/1`,
        search: `${baseUrl}/otakudesu/search?query=bleach`,
        completed: `${baseUrl}/otakudesu/completed/page/1`,
        anime_detail: `${baseUrl}/otakudesu/detail?url=https://otakudesu.bid/anime/blch-kessen-hen-sub-indo/`,
        anime_episode: `${baseUrl}/otakudesu/episode?url=https://otakudesu.bid/episode/blc-skh-episode-1-sub-indo/`,
        detail_batch: `${baseUrl}/otakudesu/batch?url=https://otakudesu.bid/batch/cm-batch-sub-indo/`,
      }
    }
  })
})
app.use("/anibatch", routeAnibatch);
app.use("/samehadaku", routeSamehadaku);
app.use("/otakudesu", routeOtakudesu);
app.use("/oploverz", routeOploverz);

app.get("*", (req, res) => {
  res.status(404).send({
    message:
      `Please read the documentation at https://${req.get('host')}`,
  });
});

const port = process.env.port || 8000;

app.listen(port, () => {
  try {
    console.log(`Running on localhost:${port}`);
  } catch (error) {
    throw error;
  }
}); 
