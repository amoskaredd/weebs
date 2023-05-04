const router = require("express").Router()
const route = router
const Services = require("../controller/services")


route.get("/", (req, res) => {
    res.send({
        endpoint: {
            getOngoingAnime: "/ongoing/:page",
            getCompletedAnime: "/completed/:page",
            getAnimeSearch: "/search/:q",
            getAnimeList: "/anime-list",
            getAnimeDetail: "/detail",
            getAnimeEpisode: "/episode",
            getBatchLink: "/batch/:endpoint",
            getGenreList: "/genres",
            getGenrePage: "/genres/:genre/:page"
        }
    })
})


// Get Ongoing Anime -Done-
router.get("/ongoing/page/:page", Services.getOngoing)
// Get Completed Anime -Done-
router.get("/completed/page/:page", Services.getCompleted)
// Get Search Anime -Done-
router.get("/search", Services.getSearch) //query query
// Get Anime List -Done-
router.get("/anime", Services.getAnimeList)
// Get Anime Detail -Done-  
route.get("/detail", Services.getAnimeDetail) //query url
// Get Anime Episode -Done-
router.get("/episode", Services.getAnimeEpisode) //query url
// Get Batch Link -Done-
router.get("/batch", Services.getBatchLink) //query url
// Get Genre List -Done-
router.get("/genres", Services.getGenreList) 
// Get Genre Page -Done-
router.get("/genres/:genre/:page", Services.getGenrePage)

module.exports = route