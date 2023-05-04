const axios = require('axios').default;
const cheerio = require('cheerio').default;
const { baseUrl } = require('../../helpers/data.json');
const { err, err404 } = require('../../error');

module.exports = () => {
    try {
        return new Promise((resolve, reject) => {
            axios.get(`${baseUrl}`).then((resp) => {
                if (resp.status === 200) {
                    const data = resp.data;
                    const $ = cheerio.load(data);
                    let hasil = [];

                    $('.listupd article.stylesix').each(function (a, b) {
                        const genre = [];
                        $(this).find('.bsx').find('.inf').find('ul').find('li').eq(4).find('a').each(function (c, d) {
                            genre[c] = $(this).text().trim()
                        });

                        hasil[a] = {
                            judul: $(this).find('.bsx').find('.inf').find('ul').find('li').eq(3).find('a').text().trim(),
                            episode: $(this).find('.bsx').find('.thumb').find('a').find('.bt').find('span').text().trim(),
                            status: $(this).find('.bsx').find('.inf').find('ul').find('li').eq(0).text().trim().replace('Status: ', ''),
                            type: $(this).find('.bsx').find('.typez').text().trim(),
                            score: $(this).find('.bsx').find('.upscore').find('span').eq(1).text().trim(),
                            update: $(this).find('.bsx').find('.inf').find('ul').find('li').eq(2).text().trim().replace('Rilis pada: ', ''),
                            genres: genre,
                            thumb: $(this).find('.bsx').find('.thumb').find('a').find('img').attr('src').slice(0, $(this).find('.bsx').find('.thumb').find('a').find('img').attr('src').length - 6),
                            url: $(this).find('.bsx').find('.inf').find('h2').find('a').attr('href')
                        }
                    })

                    resolve({
                        message: 'Sukses!',
                        error: false,
                        data: hasil
                    })
                }
            }).catch(er => err404(resolve, reject))
        })
    } catch (error) {
        return err();
    }
}