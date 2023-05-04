const axios = require('axios').default;
const cheerio = require('cheerio').default;
const { baseUrl } = require('../../helpers/data.json');
const { err, err404 } = require('../../error');

module.exports = (query) => {
    try {
        if(!query) throw new Error('Mohon masukkan query!');
        return new Promise((resolve, reject) => {
            const q = query.trim().split(/ +/g);

            axios.get(`${baseUrl}/?s=${q.join('+')}`).then(async resp => {
                if (resp.status !== 200) return err();
                const data = resp.data;
                const $ = cheerio.load(data);
                let hasil = [];
                let url = [];

                $('.listupd article.bs').each(function (a, b) {
                    if ($(this).length === 0) return err404(q);
                    url[a] = $(this).find('.bsx').find('a').attr('href')

                })

                let random = url[Math.floor(Math.random() * (url.length - 1))];
                axios.get(`${random}`).then(resp2 => {
                    if (resp2.status !== 200) return err();
                    const data2 = resp2.data;
                    const $2 = cheerio.load(data2);

                    $2(`.postbody`).each(function (c, d) {
                        if ($2(this).children().find('.bixbox').eq(1).find('.ninfo').find('.info-content').find('.spe').find('span').length < 9) resolve(err404(resolve, reject, query));

                        const genres = [];
                        $2(this).children().find('.bixbox').eq(1).find('.ninfo').find('.info-content').find('.genxed').find('a').each(function (e, f) {
                            genres[e] = $2(this).text().trim()
                        })

                        const obj = new Object({
                            judul: $2(this).children().find('.bixbox').eq(1).find('.entry-title').text().trim(),
                            status: $2(this).children().find('.bixbox').eq(1).find('.ninfo').find('.info-content').find('span').eq(0).text().trim().replace('Status: ', ''),
                            studio: $2(this).children().find('.bixbox').eq(1).find('.ninfo').find('.info-content').find('span').eq(1).text().trim().replace('Studio: ', ''),
                            tahun: $2(this).children().find('.bixbox').eq(1).find('.ninfo').find('.info-content').find('span').eq(2).text().trim().replace('Dirilis pada tahun: ', ''),
                            durasi: $2(this).children().find('.bixbox').eq(1).find('.ninfo').find('.info-content').find('span').eq(3).text().trim().replace('Durasi: ', ''),
                            musim: $2(this).children().find('.bixbox').eq(1).find('.ninfo').find('.info-content').find('span').eq(4).text().trim().replace('Season: ', ''),
                            tipe: $2(this).children().find('.bixbox').eq(1).find('.ninfo').find('.info-content').find('span').eq(5).text().trim().replace('Tipe: ', ''),
                            jumlahEps: $2(this).children().find('.bixbox').eq(3).find('.lastend').find('.inepcx').eq(1).find('a').find('span').eq(1).text().trim().replace('Episode ', ''),
                            dirilis: $2(this).children().find('.bixbox').eq(1).find('.ninfo').find('.info-content').find('span').eq(7).text().trim().replace('Dirilis pada: ', ''),
                            pembaruanTerakhir: $2(this).children().find('.bixbox').eq(1).find('.ninfo').find('.info-content').find('span').eq(8).text().trim().replace('Diperbarui pada: ', ''),
                            genres: genres,
                            rating: $2(this).children().find('.bixbox').eq(1).find('.thumbook').find('.rt').find('.rating').text().trim().replace('Rating ', ''),
                            sinopsis: $2(this).children().find('.bixbox').eq(2).find('.entry-content').text() != ''
                                ? $2(this).children().find('.bixbox').eq(2).find('.entry-content').text()
                                : '-',
                            thumb: $2(this).children().find('.bixbox').eq(1).find('.thumbook').find('.thumb').find('img').attr('src'),
                            url: random
                        })

                        hasil.push(obj);

                        resolve({
                            message: 'Sukses!',
                            error: false,
                            data: hasil
                        })
                    })
                })
            }).catch(er => err404(resolve, reject, query))
        })
    } catch (error) {
        return err();
    }
}