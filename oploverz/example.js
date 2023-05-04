const api = require('oploverz-scraper');

(async () => {
    /*  --Tanpa Query--  */
    api.Homepage().then(res => {
        console.log(res);
    })

    /*  --Query Metode-- */
    const query = 'one piece'
    api.Search(query).then(res => {
        console.log(res);
    })
})()